import { Bar, Line, Doughnut, Bubble } from "react-chartjs-2";
import { read, utils } from "xlsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./style.css";
import ExpenseHeatmap from "./ExpenseHeatmap";
import { useCallback, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ModernDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    monthlyExpenses: [],
    categoryExpenses: [],
    weeklyExpenses: [],
    yearlyIncomeVsExpense: [],
  });

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const bstr = event.target.result;
      const wb = read(bstr, { type: "binary" });

      const data = {
        monthlyExpenses: utils.sheet_to_json(wb.Sheets["monthlyExpenses"]),
        categoryExpenses: utils.sheet_to_json(wb.Sheets["categoryExpenses"]),
        weeklyExpenses: utils.sheet_to_json(wb.Sheets["weeklyExpenses"]),
        yearlyIncomeVsExpense: utils.sheet_to_json(
          wb.Sheets["yearlyIncomeVsExpense"]
        ),
      };

      setDashboardData(data);
    };

    reader.readAsBinaryString(file);
  }, []);

  // 차트 데이터 생성 함수들...
  const createSalesFunnelData = useCallback(() => {
    return {
      labels: dashboardData.weeklyExpenses.map((item) => item.day),
      datasets: [
        {
          data: dashboardData.weeklyExpenses.map((item) => item.amount),
          backgroundColor: (context) => {
            return context.dataIndex === 3 ? "#4ade80" : "#e5e7eb";
          },
          borderRadius: 20,
        },
      ],
    };
  }, [dashboardData.weeklyExpenses]);

  const createMonthlyExpenseData = useCallback(() => {
    return {
      labels: dashboardData.monthlyExpenses.map((item) => item.month),
      datasets: [
        {
          label: "지출액",
          data: dashboardData.monthlyExpenses.map((item) => item.amount),
          borderColor: "#4ade80",
          backgroundColor: "rgba(74, 222, 128, 0.2)",
          tension: 0.4,
        },
      ],
    };
  }, [dashboardData.monthlyExpenses]);

  const createCategoryExpenseData = useCallback(() => {
    return {
      labels: dashboardData.categoryExpenses.map((item) => item.category),
      datasets: [
        {
          data: dashboardData.categoryExpenses.map((item) => item.amount),
          backgroundColor: [
            "#b1f9cb",
            "#5bef91",
            "#4ade80",
            "#2f8f53",
            "#1f5e36",
            "#0c2415",
          ],
        },
      ],
    };
  }, [dashboardData.categoryExpenses]);

  // 차트 데이터 및 옵션 (예시)
  const salesFunnelData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [150, 120, 100, 243, 180, 200],
        backgroundColor: (context) => {
          return context.dataIndex === 3 ? "#4ade80" : "#e5e7eb";
        },
        borderRadius: 20,
      },
    ],
  };

  const salesFunnelOptions = {
    plugins: { legend: { display: false } },
    scales: { y: { display: false }, x: { grid: { display: false } } },
  };

  // 이번달 지출 추이를 위한 라인 차트 데이터
  const monthlyExpenseData = {
    labels: ["1일", "5일", "10일", "15일", "20일", "25일", "30일"],
    datasets: [
      {
        label: "지출액",
        data: [300, 450, 320, 580, 410, 620, 400],
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.2)",
        tension: 0.4,
      },
      {
        label: "목표 금액",
        data: Array(7).fill(500), // 목표 금액을 500으로 가정
        borderColor: "#ef4444",
        borderDash: [5, 5], // 점선으로 표시
        borderWidth: 2,
        pointRadius: 0, // 데이터 포인트 숨기기
        fill: false,
      },
    ],
  };

  // 라인 차트 옵션
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            new Intl.NumberFormat("ko-KR", {
              style: "currency",
              currency: "KRW",
            }).format(value),
        },
      },
    },
  };

  const categoryExpenseData = {
    labels: ["식비", "주거비", "교통비", "문화생활", "의료비", "기타"],
    datasets: [
      {
        data: [300000, 500000, 100000, 150000, 80000, 70000],
        backgroundColor: [
          "#b1f9cb",
          "#5bef91",
          "#4ade80",
          "#2f8f53",
          "#1f5e36",
          "#0c2415",
        ],
        hoverBackgroundColor: [
          "#b1f9cb",
          "#5bef91",
          "#4ade80",
          "#2f8f53",
          "#1f5e36",
          "#0c2415",
        ],
      },
    ],
  };

  // 도넛 차트 옵션
  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
    },
  };

  // 친구들과의 지출 비교를 위한 가로 막대 그래프 데이터
  const friendComparisonData = {
    labels: ["나", "친구A", "친구B", "친구C", "친구D"],
    datasets: [
      {
        label: "이번 달 총 지출",
        data: [1200000, 1500000, 1100000, 1300000, 900000],
        backgroundColor: [
          "#4ade80", // 나의 데이터는 강조색으로
          "#9ca3af",
          "#9ca3af",
          "#9ca3af",
          "#9ca3af",
        ],
        borderColor: ["#2ebd67", "#8b97a8", "#8b97a8", "#8b97a8", "#8b97a8"],
        borderWidth: 1,
      },
    ],
  };

  // 가로 막대 그래프 옵션
  const horizontalBarOptions = {
    indexAxis: "y", // 이 옵션으로 가로 막대 그래프로 변경
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.x !== null) {
              label += new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
              }).format(context.parsed.x);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("ko-KR", {
              style: "currency",
              currency: "KRW",
              notation: "compact",
            }).format(value);
          },
        },
      },
    },
  };

  // 버블 차트를 위한 데이터
  const bubbleChartData = {
    datasets: [
      {
        label: "일별 지출",
        data: Array.from({ length: 31 }, (_, i) => ({
          x: i + 1,
          y: Math.floor(i / 7), // 주차
          r: Math.random() * 50 + 10, // 임의의 지출 금액 (실제 데이터로 대체 필요)
        })),
        backgroundColor: (context) => {
          const value = context.raw.r;
          const alpha = value / 60; // 최대값을 60으로 가정
          return `rgba(74, 222, 128, ${alpha})`;
        },
      },
    ],
  };

  const bubbleChartOptions = {
    scales: {
      x: {
        min: 0,
        max: 32,
        ticks: {
          stepSize: 1,
          callback: (value) => (value % 7 === 1 ? value : ""),
        },
        title: {
          display: true,
          text: "날짜",
        },
      },
      y: {
        min: -1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) =>
            ["", "1주차", "2주차", "3주차", "4주차", "5주차"][value + 1] || "",
        },
        title: {
          display: true,
          text: "주차",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const day = context.raw.x;
            const amount = context.raw.r * 1000; // 실제 금액으로 변환 (예시)
            return `${day}일: ${amount.toLocaleString()}원`;
          },
        },
      },
    },
  };

  // 지출 히트맵을 위한 데이터
  const expenseHeatmapData = [
    { day: 1, amount: 30000 },
    { day: 2, amount: 15000 },
    { day: 3, amount: 50000 },
    { day: 4, amount: 20000 },
    { day: 5, amount: 40000 },
    { day: 6, amount: 30000 },
    { day: 7, amount: 25000 },
    { day: 8, amount: 35000 },
    { day: 9, amount: 20000 },
    { day: 10, amount: 45000 },
    { day: 11, amount: 30000 },
    { day: 12, amount: 20000 },
    { day: 13, amount: 35000 },
    { day: 14, amount: 40000 },
    { day: 15, amount: 30000 },
    { day: 16, amount: 20000 },
    { day: 17, amount: 25000 },
    { day: 18, amount: 30000 },
    { day: 19, amount: 35000 },
    { day: 20, amount: 40000 },
    { day: 21, amount: 30000 },
    { day: 22, amount: 20000 },
    { day: 23, amount: 25000 },
    { day: 24, amount: 30000 },
    { day: 25, amount: 35000 },
    { day: 26, amount: 40000 },
    { day: 27, amount: 30000 },
    { day: 28, amount: 20000 },
    { day: 29, amount: 25000 },
    { day: 30, amount: 30000 },
    { day: 31, amount: 40000 },
  ];

  return (
    <div className="dashboard">
      <main className="main-content">
        <div className="file-upload-container">
          <h1>8월 소비 내역</h1>
          <label htmlFor="file-upload" className="file-upload-label">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="file-upload-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            엑셀 파일 업로드
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            accept=".xlsx, .xls"
            className="file-upload-input"
          />
        </div>
        <div className="summary-cards">
          <div className="card dark">
            <h3>이번달 사용 금액</h3>
            <p className="amount">₩2,635,000</p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
          <div className="card light">
            <h3>현금 사용 금액</h3>
            <p className="amount">₩395,000</p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
          <div className="card light">
            <h3>카드 사용 금액</h3>
            <p className="amount">₩1,580,000</p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
          <div className="card light">
            <h3>적금 지출 비용</h3>
            <p className="amount">₩263,500</p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
          <div className="card light">
            <h3>주식 투자 비용</h3>
            <p className="amount">₩131,750 </p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
          <div className="card light">
            <h3>고정 지출 비용</h3>
            <p className="amount">₩264,750</p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-card">
            <div className="chart-header">
              <h3>이번달 제일 돈이 많이 나간 곳</h3>
              {/* <p>Total view per month</p>
              <select>
                <option>Monthly</option>
              </select> */}
            </div>
            <Bar data={salesFunnelData} options={salesFunnelOptions} />
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>이번달 지출 추이</h3>
              <p>일자별 총 지출액</p>
            </div>
            <Line data={monthlyExpenseData} options={lineChartOptions} />
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>카테고리별 지출 분포</h3>
            </div>
            <Doughnut
              data={categoryExpenseData}
              options={doughnutChartOptions}
            />
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>친구들과 지출 비교</h3>
              <p>이번 달 총 지출액 비교</p>
            </div>
            <Bar data={friendComparisonData} options={horizontalBarOptions} />
          </div>
        </div>

        <div className="transactions-section">
          <h3>월간 지출 버블 차트</h3>
          <p>일별 지출 금액 시각화</p>

          {/* Add transaction list here */}
          <Bubble data={bubbleChartData} options={bubbleChartOptions} />
        </div>
        <div className="transactions-section">
          <h3>월간 지출 히트맵</h3>
          <p>일별 지출 금액 시각화</p>
          <ExpenseHeatmap data={expenseHeatmapData} />
        </div>
      </main>
    </div>
  );
};

export default ModernDashboard;
