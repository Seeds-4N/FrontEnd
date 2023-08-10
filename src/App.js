import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./pages/Map";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />}></Route>
          <Route path="/SignUp/*" element={<SignUp />}></Route>
          <Route path="/Login/*" element={<Login />}></Route>
          {/* <Route path="/Prac/*" element={<Prac />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
