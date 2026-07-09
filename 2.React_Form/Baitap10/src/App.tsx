import InventoryList from './components/InventoryList'
import Sidebar from './components/Sidebar'
import { useUiStore } from './store/uiStore'
import './App.css'

export default function App() {
  const selectedId = useUiStore((s) => s.selectedId)

  return (
    <div className="page">
      <h1>Kiểm kê kho</h1>
      <div className="layout">
        <InventoryList />
        {selectedId !== null && <Sidebar key={selectedId} />}
      </div>
    </div>
  )
}
