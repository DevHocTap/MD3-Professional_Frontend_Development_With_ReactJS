import { useTheme } from "../context/ThemeContext";

const MainContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <main style={{ padding: "40px", minHeight: "300px" }}>
      <p>
        Giao diện hiện tại: <strong>{theme.toUpperCase()}</strong>
      </p>
    </main>
  );
};

export default MainContent;
