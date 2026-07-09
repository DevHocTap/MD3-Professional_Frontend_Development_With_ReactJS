import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './App.css'

interface FormValues {
  courseCode: string
  studentCount: number
  scores: number[]
}

const schema = yup.object({
  courseCode: yup
    .string()
    .required('Vui lòng nhập mã môn học')
    .matches(/^[A-Z0-9]+$/, 'Mã môn học phải viết in hoa (A-Z, 0-9)'),
  studentCount: yup
    .number()
    .typeError('Sĩ số phải là số')
    .required('Vui lòng nhập sĩ số')
    .moreThan(0, 'Sĩ số không hợp lệ'),
  scores: yup
    .array()
    .of(
      yup
        .number()
        .typeError('Điểm phải là số')
        .required('Nhập điểm')
        .min(0, 'Điểm phải từ 0.0 đến 10.0')
        .max(10, 'Điểm phải từ 0.0 đến 10.0'),
    )
    .default([]),
})

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as never,
    defaultValues: { courseCode: '', studentCount: 0, scores: [] },
    shouldUnregister: true,
  })

  const count = Number(watch('studentCount')) || 0
  const valid = count > 0

  const onSubmit = (data: FormValues) => {
    alert('Đã vào điểm:\n' + JSON.stringify(data, null, 2))
  }

  return (
    <div className="page">
      <h1>Kiosk Quản lý Chấm điểm</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Mã môn học (in hoa)
          <input {...register('courseCode')} />
        </label>
        {errors.courseCode && (
          <p className="error">{errors.courseCode.message}</p>
        )}

        <label>
          Sĩ số (số sinh viên dự thi)
          <input type="number" {...register('studentCount')} />
        </label>
        {errors.studentCount && (
          <p className="error">{errors.studentCount.message}</p>
        )}

        {!valid ? (
          <p className="warn">
            Sĩ số không hợp lệ - mảng nhập điểm đang bị khóa.
          </p>
        ) : (
          <div className="scores">
            <h3>Nhập điểm ({count} sinh viên)</h3>
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="score-row">
                <label>Sinh viên {i + 1}</label>
                <input
                  type="number"
                  step="0.1"
                  {...register(`scores.${i}`)}
                />
                {errors.scores?.[i] && (
                  <p className="error">{errors.scores[i]?.message}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <button type="submit" disabled={!valid}>
          Lưu điểm
        </button>
      </form>
    </div>
  )
}
