import React from "react";
import { useTheme } from "../context/ThemeContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
      <button onClick={toggleTheme}>
        Chuyển giao diện {theme === "light" ? "Ban đêm" : "Ban ngày"}
      </button>
    </header>
  );
};

export default Header;
