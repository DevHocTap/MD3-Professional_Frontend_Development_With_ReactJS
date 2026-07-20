import Chart from './Chart'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Title</h1>
      {Array.from({ length: 10 }, (_, i) => (
        <Chart key={i} index={i + 1} />
      ))}
    </div>
  )
}
