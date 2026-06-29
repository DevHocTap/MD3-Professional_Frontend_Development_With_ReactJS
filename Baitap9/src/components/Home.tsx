import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Trang chủ (Public)</h1>
      <p>Ai cũng có thể xem trang này.</p>
      <Link to="/phong-hoc-ao">
        Thử truy cập Phòng Học Ảo (Sẽ bị chặn nếu chưa Login)
      </Link>
    </div>
  );
}
