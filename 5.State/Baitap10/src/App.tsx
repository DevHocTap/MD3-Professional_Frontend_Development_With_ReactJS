import { EMPLOYEES, getActiveEmployees } from './employees'
import './App.css'

function App() {
  const activeEmployees = getActiveEmployees(EMPLOYEES)

  return (
    <div className="app">
      <h1>Danh bạ nhân viên</h1>
      <p>Ứng dụng demo CI/CD Pipeline: Git → Test → Build → Deploy (Vercel)</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {activeEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
