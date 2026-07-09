import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './App.css'

interface FormValues {
  fullName: string
  status: 'employed' | 'seeking'
  currentCompany: string
}

const schema = yup.object({
  fullName: yup.string().required('Vui lòng nhập họ tên'),
  status: yup
    .string()
    .oneOf(['employed', 'seeking'])
    .required('Vui lòng chọn trạng thái'),
  currentCompany: yup.string().when('status', {
    is: 'employed',
    then: (s) => s.required('Vui lòng nhập công ty hiện tại'),
    otherwise: (s) => s.notRequired(),
  }),
})

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as never,
    defaultValues: { fullName: '', status: 'seeking', currentCompany: '' },
  })

  const status = watch('status')

  const onSubmit = (data: FormValues) => {
    alert('Nộp hồ sơ thành công:\n' + JSON.stringify(data, null, 2))
  }

  return (
    <div className="page">
      <h1>Hồ sơ ứng viên</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Họ tên
          <input {...register('fullName')} />
        </label>
        {errors.fullName && <p className="error">{errors.fullName.message}</p>}

        <label>
          Trạng thái việc làm
          <select {...register('status')}>
            <option value="seeking">Đang tìm việc</option>
            <option value="employed">Đã có việc</option>
          </select>
        </label>

        {status === 'employed' && (
          <>
            <label>
              Công ty hiện tại
              <input {...register('currentCompany')} />
            </label>
            {errors.currentCompany && (
              <p className="error">{errors.currentCompany.message}</p>
            )}
          </>
        )}

        <button type="submit">Nộp hồ sơ</button>
      </form>
    </div>
  )
}
