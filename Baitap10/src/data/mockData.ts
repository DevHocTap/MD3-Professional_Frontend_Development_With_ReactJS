export type Student = {
  id: number;
  name: string;
  grade: number;
};

export const MOCK_STUDENTS: Student[] = Array.from(
  { length: 5000 },
  (_, index) => ({
    id: index + 1,
    name: `Học viên thứ ${index + 1}`,
    grade: Math.floor(Math.random() * 10) + 1,
  }),
);
