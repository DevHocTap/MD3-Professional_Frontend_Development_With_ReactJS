import FormikForm from './components/FormikForm'
import RHFForm from './components/RHFForm'
import './App.css'

export default function App() {
  return (
    <div className="page">
      <h1>Controlled vs Uncontrolled</h1>
      <p>
        Mở Console, gõ 10 ký tự liên tiếp vào 1 ô của mỗi form và đếm số dòng
        log "Rendered ...".
      </p>
      <div className="grid">
        <FormikForm />
        <RHFForm />
      </div>
    </div>
  )
}
