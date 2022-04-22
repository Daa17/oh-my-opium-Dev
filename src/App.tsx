import { positions, Provider as AlertProvider } from "react-alert";
import { AlertTemplate } from "./Components/AlertTemplate/AlertTemplate";
import { AppRouts } from "./routes";
import "./App.css";

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
      <div className="App">
        <AppRouts />
      </div>
    </AlertProvider>
  );
}

export default App;
