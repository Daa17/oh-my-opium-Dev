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
        {/* <MobileView >
          <div className='mobile-text'>Oh My Opium does not support mobile devices yet. 
          <br/> <br/> Please use desktop version.</div>
        </MobileView> */}
        <AppRouts />
      </div>
    </AlertProvider>
  );
}

export default App;
