import { useCountdown } from "../hooks/useCountdown";

export default function FlashSale() {
  const { timeLeft, isActive, start, pause, reset } = useCountdown(10);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        width: "300px",
      }}
    >
      <h2>Sự kiện Flash Sale</h2>
      <h1 style={{ color: timeLeft === 0 ? "red" : "black" }}>
        {timeLeft} giây
      </h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={start} disabled={isActive || timeLeft === 0}>
          Bắt đầu
        </button>
        <button onClick={pause} disabled={!isActive}>
          Tạm dừng
        </button>
        <button onClick={reset}>Làm mới</button>
      </div>

      {timeLeft === 0 && (
        <p style={{ color: "red", fontWeight: "bold" }}>Đã hết thời gian!</p>
      )}
    </div>
  );
}
