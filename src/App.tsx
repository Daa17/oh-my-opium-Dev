import { positions, Provider as AlertProvider } from "react-alert";
import { BrowserView } from "react-device-detect";
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
};

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div className="App">
        {/* <MobileView >
          <div className='mobile-text'>Oh My Opium does not support mobile devices yet. 
          <br/> <br/> Please use desktop version.</div>
        </MobileView> */}
        <BrowserView>
          <AppRouts />
        </BrowserView>
      </div>
    </AlertProvider>
  );
}

export default App;
