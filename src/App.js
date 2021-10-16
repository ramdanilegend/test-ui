import Router from "./routes/index";
import { BrowserRouter } from "react-router-dom";
// import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
