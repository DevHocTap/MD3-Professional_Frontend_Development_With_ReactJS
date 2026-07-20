import { Provider } from 'react-redux'
import WeatherWidget from './WeatherWidget'
import { store } from './store'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Bài 5 - Cô lập môi trường mạng bằng Mocking</h1>
        <WeatherWidget />
      </div>
    </Provider>
  )
}

export default App
