import { useForm } from 'react-hook-form'
import './App.css'

interface FormValues {
  title: string
  content: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    alert('Đã lưu bài viết:\n' + JSON.stringify(data, null, 2))
  }

  return (
    <div className="page">
      <h1>Soạn bài viết Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Tiêu đề
          <input
            {...register('title', { required: 'Vui lòng nhập tiêu đề' })}
          />
        </label>
        {errors.title && <p className="error">{errors.title.message}</p>}

        <label>
          Nội dung
          <textarea
            rows={10}
            {...register('content', {
              required: 'Vui lòng nhập nội dung',
              minLength: {
                value: 50,
                message: 'Nội dung bài viết tối thiểu 50 ký tự',
              },
            })}
          />
        </label>
        {errors.content && <p className="error">{errors.content.message}</p>}

        <button type="submit">Đăng bài</button>
      </form>
    </div>
  )
}
