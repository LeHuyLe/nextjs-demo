'use client'
import { useAppContext } from '@/app/app-provider'
import ButtonLogout from '@/components/button-logout'
import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'

export default function Header() {
  const { user } = useAppContext()

  return (
    <header className="bg-gray-100 p-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
      
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-6">
            {user ? (
              <>
                <li>
                  <Link href="/me" className="text-blue-600 hover:underline">
                    Xin chào <strong>{user.name}</strong>
                  </Link>
                </li>
                <li>
                  <ButtonLogout />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-blue-600 hover:underline">
                    Đăng ký
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
