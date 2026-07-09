import { useState } from 'react'
import RevenueTab from './components/RevenueTab'
import StaffTab from './components/StaffTab'
import './App.css'

type Tab = 'revenue' | 'staff'

export default function App() {
  const [tab, setTab] = useState<Tab>('revenue')

  return (
    <div className="dashboard">
      <h1>Dashboard thống kê</h1>

      <div className="tabs">
        <button
          type="button"
          className={tab === 'revenue' ? 'active' : ''}
          onClick={() => setTab('revenue')}
        >
          Doanh thu
        </button>
        <button
          type="button"
          className={tab === 'staff' ? 'active' : ''}
          onClick={() => setTab('staff')}
        >
          Nhân sự
        </button>
      </div>

      {tab === 'revenue' ? <RevenueTab /> : <StaffTab />}
    </div>
  )
}
