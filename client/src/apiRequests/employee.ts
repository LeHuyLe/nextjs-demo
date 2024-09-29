import http from '@/lib/http'
import { EmployeeUpdateBodyType } from '@/schemaValidations/employee.schema'

const employeeApiRequest = {
  updateEmployee: (employeeId: number, body: typeof EmployeeUpdateBodyType) =>
    http.put(`employees/${employeeId}`, body),
}

export default employeeApiRequest
