import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from './pages/Map';
import SignUp from './pages/SignUp';

function App() {
  return (

    

    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Map />}></Route>
            <Route path="/SignUp/*" element={<SignUp />}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
