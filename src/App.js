
import React from 'react';
import ReactDOM from 'react-dom';
import ListeCandidats from './ListeCandidats';
import ListeOffres from './ListeOffres';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar/HorizontalNavbar'; // Utilisez NavBar au lieu de navBar


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/ListeOffres" element={<ListeOffres />} />
          <Route path="/ListeCandidats/:offre" element={<ListeCandidats />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
