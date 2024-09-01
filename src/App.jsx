import "./App.css";
import { Outlet } from "react-router-dom";
import Lnb from "./components/Lnb";
import { getRoutes } from "./utils/getRoutes";

function App() {
  const routes = getRoutes();

  return (
    <>
      <div>
        <Lnb routes={routes} />
        <Outlet />
      </div>
    </>
  );
}

export default App;
