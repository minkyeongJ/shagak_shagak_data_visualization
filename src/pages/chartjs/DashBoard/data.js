// 월별 지출 데이터
const monthlyExpenses = [
  { month: "1월", amount: 2500 },
  { month: "2월", amount: 2300 },
  { month: "3월", amount: 2700 },
  { month: "4월", amount: 2400 },
  { month: "5월", amount: 2600 },
  { month: "6월", amount: 2800 },
  { month: "7월", amount: 3000 },
  { month: "8월", amount: 2900 },
  { month: "9월", amount: 2700 },
  { month: "10월", amount: 2500 },
  { month: "11월", amount: 2400 },
  { month: "12월", amount: 3200 },
];

// 카테고리별 지출 데이터
const categoryExpenses = [
  { category: "식비", amount: 8000 },
  { category: "주거비", amount: 12000 },
  { category: "교통비", amount: 3000 },
  { category: "의료비", amount: 2000 },
  { category: "교육비", amount: 5000 },
  { category: "여가비", amount: 4000 },
  { category: "기타", amount: 2000 },
];

// 주간 지출 추이 데이터
const weeklyExpenses = [
  { day: "월", amount: 50 },
  { day: "화", amount: 80 },
  { day: "수", amount: 120 },
  { day: "목", amount: 70 },
  { day: "금", amount: 150 },
  { day: "토", amount: 200 },
  { day: "일", amount: 100 },
];

// 연간 수입 대비 지출 데이터
const yearlyIncomeVsExpense = [
  { year: 2019, income: 50000, expense: 45000 },
  { year: 2020, income: 52000, expense: 48000 },
  { year: 2021, income: 55000, expense: 50000 },
  { year: 2022, income: 58000, expense: 53000 },
  { year: 2023, income: 60000, expense: 55000 },
];

export {
  monthlyExpenses,
  categoryExpenses,
  weeklyExpenses,
  yearlyIncomeVsExpense,
};
