import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { decrease, increase, reset } from './store/counterSlice'

export default function SmartCounter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="smart-counter">
      <span data-testid="value">{count}</span>
      <button onClick={() => dispatch(increase())}>Tăng</button>
      <button onClick={() => dispatch(decrease())}>Giảm</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  )
}
