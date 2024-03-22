import './App.css';
import ReactDOM from "react-dom/client";
import ListeCandidats from "./ListeCandidats";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './navbar'; // Utilisez NavBar au lieu de navBar

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
        <Route path="/" element={<Home />} />

          <Route path="/ListeCandidats" element={<ListeCandidats />}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
