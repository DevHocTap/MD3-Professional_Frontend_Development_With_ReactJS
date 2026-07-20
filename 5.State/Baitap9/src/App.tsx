import { Provider } from 'react-redux'
import SmartCounter from './SmartCounter'
import { store } from './store'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Bài 9 - Smart Counter (TDD + Redux Toolkit)</h1>
        <SmartCounter />
      </div>
    </Provider>
  )
}

export default App
