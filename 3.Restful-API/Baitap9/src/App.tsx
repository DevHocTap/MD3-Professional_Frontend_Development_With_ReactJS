import { useForm, useFieldArray } from 'react-hook-form'
import './App.css'

interface FormValues {
  items: { name: string; price: number }[]
}

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { items: [{ name: '', price: 0 }] },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const onSubmit = (data: FormValues) => {
    alert('Kế hoạch chi tiêu:\n' + JSON.stringify(data, null, 2))
  }

  return (
    <div className="page">
      <h1>Lập kế hoạch chi tiêu</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="row">
            <div className="field">
              <input
                placeholder="Tên món đồ"
                {...register(`items.${index}.name`, {
                  required: 'Nhập tên món đồ',
                })}
              />
              {errors.items?.[index]?.name && (
                <p className="error">{errors.items[index]?.name?.message}</p>
              )}
            </div>
            <div className="field">
              <input
                type="number"
                placeholder="Giá tiền"
                {...register(`items.${index}.price`, {
                  valueAsNumber: true,
                  required: 'Nhập giá',
                  min: { value: 0, message: 'Giá không âm' },
                })}
              />
              {errors.items?.[index]?.price && (
                <p className="error">{errors.items[index]?.price?.message}</p>
              )}
            </div>
            <button type="button" onClick={() => remove(index)}>
              Xóa
            </button>
          </div>
        ))}

        <div className="actions">
          <button
            type="button"
            onClick={() => append({ name: '', price: 0 })}
            disabled={fields.length >= 10}
          >
            Thêm món đồ
          </button>
          <button type="submit" disabled={fields.length === 0}>
            Lưu kế hoạch
          </button>
        </div>

        {fields.length === 0 && (
          <p className="error">Cần ít nhất 1 món đồ mới lưu được.</p>
        )}
      </form>
    </div>
  )
}
