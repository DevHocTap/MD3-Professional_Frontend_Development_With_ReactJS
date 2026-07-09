import { useNavigate, useLocation } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/phong-hoc-ao";

  const handleLogin = () => {
    onLogin();

    navigate(from, { replace: true });
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        maxWidth: "300px",
        margin: "20px auto",
      }}
    >
      <h2>Đăng nhập hệ thống</h2>
      <p style={{ color: "gray", fontSize: "14px" }}>
        Bạn cần đăng nhập để xem nội dung độc quyền.
      </p>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Xác thực & Đăng nhập
      </button>
    </div>
  );
}
