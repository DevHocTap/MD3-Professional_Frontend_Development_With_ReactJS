export default function Chart({ index }: { index: number }) {
  const points = []
  for (let i = 0; i < 2000; i++) {
    points.push(
      <span key={i} className="point">
        {(Math.sin(i) * i).toFixed(4)}
      </span>,
    )
  }

  return (
    <div className="chart">
      <h3>Biểu đồ phức tạp #{index}</h3>
      <div className="points">{points}</div>
    </div>
  )
}
