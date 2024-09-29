import { z } from 'zod'

export const EmployeeUpdateBodyType = z.object({
  name: z.string().min(1, 'Tên không được để trống'),
  position: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
})
