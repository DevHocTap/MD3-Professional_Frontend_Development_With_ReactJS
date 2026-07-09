import { useFormik } from 'formik'
import * as Yup from 'yup'
import './App.css'

const validationSchema = Yup.object({
  fullName: Yup.string().required('Vui lòng nhập họ tên'),
  cccd: Yup.string()
    .required('Vui lòng nhập CCCD')
    .matches(/^\d{12}$/, 'CCCD phải là chuỗi đúng 12 chữ số'),
  income: Yup.number()
    .typeError('Thu nhập phải là số (không nhập chữ)')
    .required('Vui lòng nhập thu nhập')
    .moreThan(5000000, 'Thu nhập phải lớn hơn 5.000.000'),
})

export default function App() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      cccd: '',
      income: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert('Mở thẻ thành công:\n' + JSON.stringify(values, null, 2))
    },
  })

  return (
    <div className="page">
      <h1>Mở thẻ tín dụng</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Họ tên
          <input
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="error">{formik.errors.fullName}</p>
        )}

        <label>
          Căn cước công dân (CCCD)
          <input
            name="cccd"
            value={formik.values.cccd}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.cccd && formik.errors.cccd && (
          <p className="error">{formik.errors.cccd}</p>
        )}

        <label>
          Thu nhập hàng tháng
          <input
            name="income"
            value={formik.values.income}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.income && formik.errors.income && (
          <p className="error">{formik.errors.income}</p>
        )}

        <button type="submit">Đăng ký</button>
      </form>
    </div>
  )
}
