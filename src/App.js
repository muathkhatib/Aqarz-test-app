import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataViewr, Error404 } from "./view";

const App = () => {
  useEffect(() => {}, []);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<DataViewr />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
