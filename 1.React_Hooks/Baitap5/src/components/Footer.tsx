import { useTheme } from "../context/ThemeContext";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer style={{ padding: "20px", borderTop: "1px solid #ccc" }}>
      <p>Footer - Đang áp dụng chế độ : {theme}</p>
    </footer>
  );
};
export default Footer;
