import { useState, useMemo, useCallback } from "react";
import { MOCK_STUDENTS } from "../data/mockData";

export default function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const [isMarked, setIsMarked] = useState(false);

  const filteredStudents = useMemo(() => {
    console.log("🔴 CẢNH BÁO: Đang thực thi vòng lặp lọc 5.000 học viên...");
    const start = performance.now();

    const result = MOCK_STUDENTS.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const end = performance.now();
    console.log(`⏱️ Thời gian lọc: ${(end - start).toFixed(2)} ms`);
    return result;
  }, [searchTerm]);

  const handleStudentAction = useCallback((id: number) => {
    console.log(`Đã thực hiện thao tác với học viên ID: ${id}`);
  }, []);

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h2>Bảng Điều Khiển Quản Trị (5.000 Học viên)</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tìm kiếm học viên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "300px", marginRight: "10px" }}
        />
        <span style={{ color: "gray" }}>
          Tìm thấy: {filteredStudents.length} kết quả
        </span>
      </div>

      <div
        style={{
          padding: "15px",
          backgroundColor: isMarked ? "#d4edda" : "#f8f9fa",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <strong>Tiêu đề bảng:</strong>
        <button
          onClick={() => setIsMarked(!isMarked)}
          style={{ marginLeft: "15px", padding: "5px 15px", cursor: "pointer" }}
        >
          {isMarked ? "✅ Đã kiểm tra" : "❌ Chưa kiểm tra"}
        </button>
      </div>

      <ul
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        {filteredStudents.slice(0, 100).map((student) => (
          <li
            key={student.id}
            style={{
              padding: "8px 0",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {student.name} - Điểm: {student.grade}
            </span>
            <button
              onClick={() => handleStudentAction(student.id)}
              style={{ padding: "4px 8px", cursor: "pointer" }}
            >
              Thao tác
            </button>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>
      </p>
    </div>
  );
}
