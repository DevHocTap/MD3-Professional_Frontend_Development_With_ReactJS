import { useForm } from 'react-hook-form'

const FIELDS = ['f1', 'f2', 'f3', 'f4', 'f5'] as const

export default function RHFForm() {
  console.log('Rendered RHFForm')

  const { register } = useForm()

  return (
    <div className="card">
      <h2>React Hook Form (Uncontrolled)</h2>
      <form>
        {FIELDS.map((name) => (
          <input key={name} {...register(name)} placeholder={name} />
        ))}
      </form>
    </div>
  )
}
