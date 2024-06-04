import { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardDetail from "./components/CardDetail.jsx";
import ListLocationByFilter from "./components/ListLocationByFilter.jsx";
import { ThemeContext } from "./context/index.js";

function App() {
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        const data = await response.json();
        setDataSource(data);
      } catch (error) {
        console.error("Error data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ThemeContext.Provider value={dataSource}>
      <Router>
        <Routes>
          <Route exact path="/" element={<ListLocationByFilter />} />
          <Route path="/detail/:id" element={<CardDetail />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
