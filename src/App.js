import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./pages/Map";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
// import Memo from "./pages/Memo";
import { useEffect, useRef, useState } from "react";

function App() {
  const getData = async () => {
    const res = await fetch("http://127.0.0.1:8000/postcreate/").then((res) =>
      res.json()
    );
    console.log(res);

    const initData = res.map((it) => {
      return {
        title: it.title,
        content: it.content,
        emotion: it.emotion,
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (title, content, emotion) => {
    // const created_date = new Date().getTime();
    const newItem = {
      title,
      content,
      emotion,
      // created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            onCreate={onCreate}
            onEdit={onEdit}
            onDelete={onRemove}
            path="/"
            element={<Map />}
          ></Route>
          <Route path="/SignUp/*" element={<SignUp />}></Route>
          <Route path="/Login/*" element={<Login />}></Route>
          {/* <Route path="/Prac/*" element={<Prac />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
