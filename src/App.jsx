import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomBar from "./BottomBar";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BottomBar />}>
          <Route index element={<Page1 />} />
          <Route path="page1" element={<Page1 />} />
          <Route path="page2" element={<Page2 />} />
          <Route path="page3" element={<Page3 />} />
          <Route path="page4" element={<Page4 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
