import { useNavigate } from "react-router-dom";

export default function VirtualClassroom({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#eef8ff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#0056b3" }}>🎓 Chào mừng đến Phòng Học Ảo</h1>
      <p>Đây là nội dung độc quyền. Chúc mừng bạn đã vượt qua lớp bảo mật!</p>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Đăng xuất
      </button>
    </div>
  );
}
