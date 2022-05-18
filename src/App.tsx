import { lazy, Suspense } from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import { AlertTemplate } from "./Components/AlertTemplate/AlertTemplate";

import "./App.css";

const AppRouts = lazy(() => import("./routes"));

const options = {
  timeout: 5000,
  position: positions.TOP_LEFT,
  containerStyle: {
    zIndex: 100,
  },
};
export type PositionType = {
  balance: number;
  address: string;
  endTime: number;
  children: React.ReactElement;
};

function App() {
  return (
    /* tslint:disable-next-line */
    <AlertProvider template={AlertTemplate} {...options}>
      <Suspense fallback={<div className="App">...Loading</div>}>
        <div className="App">
          <AppRouts />
        </div>
      </Suspense>
    </AlertProvider>
  );
}

export default App;
