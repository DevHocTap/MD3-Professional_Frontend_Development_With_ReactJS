import { useFormik } from 'formik'

const FIELDS = ['f1', 'f2', 'f3', 'f4', 'f5'] as const

export default function FormikForm() {
  console.log('Rendered FormikForm')

  const formik = useFormik({
    initialValues: { f1: '', f2: '', f3: '', f4: '', f5: '' },
    onSubmit: () => {},
  })

  return (
    <div className="card">
      <h2>Formik (Controlled)</h2>
      <form>
        {FIELDS.map((name) => (
          <input
            key={name}
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            placeholder={name}
          />
        ))}
      </form>
    </div>
  )
}
