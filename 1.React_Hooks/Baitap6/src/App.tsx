import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialKeyword = searchParams.get("keyword") || "";
  const [searchTerm, setSearchTerm] = useState(initialKeyword);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const currentParams = new URLSearchParams(searchParams);

    if (value.trim() === "") {
      currentParams.delete("keyword");
    } else {
      currentParams.set("keyword", value);
    }

    setSearchParams(currentParams);
  };

  useEffect(() => {
    const currentKeyword = searchParams.get("keyword") || "";
    setSearchTerm(currentKeyword);
  }, [searchParams]);
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Nhập từ khóa tìm kiếm"
      />

      <div>
        {searchTerm ? (
          <p>
            Đang lọc kết quả cho từ khóa: <strong>{searchTerm}</strong>
          </p>
        ) : (
          <p>Hiện thị toàn bộ khóa học (Không có bộ lọc)</p>
        )}
      </div>
    </div>
  );
}
