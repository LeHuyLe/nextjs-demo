'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { useToast } from '@/components/ui/use-toast'
import authApiRequest from '@/apiRequests/auth'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { useState } from 'react'
import { useAppContext } from '@/app/app-provider'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const { setUser } = useAppContext()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // Submit handler.
  async function onSubmit(values: LoginBodyType) {
    if (loading) return
    setLoading(true)
    try {
      const result = await authApiRequest.login(values)

      await authApiRequest.auth({
        sessionToken: result.payload.data.token,
        expiresAt: result.payload.data.expiresAt
      })
      toast({
        description: result.payload.message
      })
      setUser(result.payload.data.account)
      router.push('/')
      router.refresh()
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg p-2 mt-1"
                  type="email"
                  placeholder="Nhập email của bạn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg p-2 mt-1"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
