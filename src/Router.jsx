import { createBrowserRouter } from 'react-router-dom';
import Canvas from './pages/canvas';
import App from './App';
import ChartJs from './pages/chartjs';
import D3js from './pages/d3js';
import Map from './pages/map';
import AreaChart from './pages/chartjs/AreaChart';
import BarChart from './pages/chartjs/BarChart';
import BubbleChart from './pages/chartjs/BubbleChart';
import LineChart from './pages/chartjs/LineChart';
import Ex1 from './pages/d3js/01';
import DoughnutPieChart from './pages/chartjs/DoughnutChart';
import MBTI from './pages/chartjs/MBTI';
import MixedChart from './pages/chartjs/MixedChart';
import Olympic from './pages/chartjs/Olympic';
import PieChart from './pages/chartjs/PieChart';
import PolarAreaChart from './pages/chartjs/PolarAreaChart';
import RadarChart from './pages/chartjs/RadarChart';
import ScatterChart from './pages/chartjs/ScatterChart';
import FillRect from './pages/canvas/FillRect';
import BeginPath from './pages/canvas/BeginPath';
import Triangle from './pages/canvas/Triangle';
import Sin from './pages/canvas/Sin';
import SunriseSunset from './pages/canvas/SunriseSunset';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'canvas',
        element: <Canvas />,
        children: [
          {
            path: 'FillRect',
            element: <FillRect />,
          },
          {
            path: 'BeginPath',
            element: <BeginPath />,
          },
          {
            path: 'Triangle',
            element: <Triangle />,
          },
          {
            path: 'Sin',
            element: <Sin />,
          },
          {
            path: 'Sunrise_Sunset',
            element: <SunriseSunset />,
          },
        ],
      },
      {
        path: 'chartjs',
        element: <ChartJs />,
        children: [
          {
            path: 'areachart',
            element: <AreaChart />,
          },
          {
            path: 'barchart',
            element: <BarChart />,
          },
          {
            path: 'bubblechart',
            element: <BubbleChart />,
          },
          {
            path: 'doughnutpiechart',
            element: <DoughnutPieChart />,
          },
          {
            path: 'linechart',
            element: <LineChart />,
          },
          {
            path: 'mbti',
            element: <MBTI />,
          },
          {
            path: 'mixedchart',
            element: <MixedChart />,
          },
          {
            path: 'olympic',
            element: <Olympic />,
          },
          {
            path: 'piechart',
            element: <PieChart />,
          },
          {
            path: 'polarareachart',
            element: <PolarAreaChart />,
          },
          {
            path: 'radarchart',
            element: <RadarChart />,
          },
          {
            path: 'scatterchart',
            element: <ScatterChart />,
          },
        ],
      },
      {
        path: 'd3js',
        element: <D3js />,
        children: [
          {
            path: 'ex1',
            element: <Ex1 />,
          },
        ],
      },
      {
        path: 'map',
        element: <Map />,
        // children: [{}],
      },
    ],
  },
]);

export default router;
