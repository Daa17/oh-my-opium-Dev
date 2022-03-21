import { positions, Provider as AlertProvider } from "react-alert";
import { BrowserView } from "react-device-detect";

import "./App.css";
import Header from "./Components/Header";
import MainTabs from "./Components/MainTabs";

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
};
const AlertTemplate = ({ options, message, close }: any) => (
  <div
    style={{
      margin: 20,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "20rem",
      height: "4rem",
      backgroundColor: options.type === "error" ? "#F6029C" : "#2ECD94",
      color: "#0A0A1E",
      padding: "1rem",
    }}
  >
    {message}
  </div>
);

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div className="App">
        <BrowserView>
          <Header />
          <MainTabs />
        </BrowserView>
      </div>
    </AlertProvider>
  );
}

export default App;
