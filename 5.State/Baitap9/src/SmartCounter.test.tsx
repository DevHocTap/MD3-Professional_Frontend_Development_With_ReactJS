import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import SmartCounter from './SmartCounter'
import { makeStore } from './store'

function renderCounter() {
  return render(
    <Provider store={makeStore()}>
      <SmartCounter />
    </Provider>,
  )
}

describe('SmartCounter (TDD - test viết trước khi có Component)', () => {
  it('Test 1: hiển thị ban đầu là 0', () => {
    renderCounter()

    expect(screen.getByTestId('value')).toHaveTextContent('0')
  })

  it('Test 2: bấm Tăng thì giá trị lên 1', () => {
    renderCounter()

    fireEvent.click(screen.getByRole('button', { name: 'Tăng' }))

    expect(screen.getByTestId('value')).toHaveTextContent('1')
  })

  it('Test 3 (bẫy dữ liệu): đang 0 bấm Giảm thì vẫn là 0, không được phép âm', () => {
    renderCounter()

    fireEvent.click(screen.getByRole('button', { name: 'Giảm' }))

    expect(screen.getByTestId('value')).toHaveTextContent('0')
  })
})
