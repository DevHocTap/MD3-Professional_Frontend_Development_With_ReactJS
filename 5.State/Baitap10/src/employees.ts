export interface Employee {
  id: number
  name: string
  phone: string
  active: boolean
}

export const EMPLOYEES: Employee[] = [
  { id: 1, name: 'Nguyen Van An', phone: '0901111111', active: true },
  { id: 2, name: 'Tran Thi Binh', phone: '0902222222', active: false },
  { id: 3, name: 'Le Van Chi', phone: '0903333333', active: true },
  { id: 4, name: 'Pham Thi Dung', phone: '0904444444', active: true },
]

export function getActiveEmployees(list: Employee[]): Employee[] {
  return list.filter((employee) => employee.active)
}
