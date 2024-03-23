import './App.css';
import ReactDOM from "react-dom/client";
import ListeCandidats from "./pages/ListeCandidats";
import ListeOffres from "./pages/ListeOffres";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './navbar/navbar'; // Utilisez NavBar au lieu de navBar

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
        <Route path="/" element={<Home />} />

          <Route path="/ListeCandidats" element={<ListeCandidats />}>
          </Route>
          <Route path="/ListeOffres" element={<ListeOffres />}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
