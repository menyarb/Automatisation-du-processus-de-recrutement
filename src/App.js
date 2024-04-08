import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import ListeOffres from './pages/Offres/list_offers';
import AddOffres from './pages/Offres/Add_offers';
import DetailOffres from './pages/Offres/detail_Offer ';
import EditOffres from './pages/Offres/Edit_offers';
import AddCondidat from './pages/Candidats/AddCandidats';

import ListeCondidat from './pages/Candidats/ListeCandidats';
import HomeAdmin from './Home';
import Home from './pages/Login/index';
import Login from './pages/Login/signIn_candidat';
import LoginEnt from './pages/Login/signIn_entreprise';
import Signup from './pages/Login/signup_candidat';
import SignupEnt from './pages/Login/signup_entreprise';
import MenuNavbar from './pages/NavBar/Navbar';
import MenuNavbarAddCandidat from './pages/NavBar/NavbarCondidat';
import ListeOffresCondidat from './pages/Offres/list_offers_condidat';
import DetailOffresCondidat from './pages/Offres/detail_Offer _condidat';
import RecruitmentProcess from './pages/process/process_steps';
import RecruitmentProcessCondidat from './pages/process/process_candidate';
import EditProcess from './pages/process/edit_process';
import EditProcessCandidate from './pages/process/edit_process_candidate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Affichage de MenuNavbar sauf sur les pages de connexion et de création de compte */}
        <Routes>
          <Route
            path="/home"
            element={
              <RouteHandler>
                <HomeAdmin />
              </RouteHandler>
            }
          />
                <Route
            path="/"
            element={
              <RouteHandler excludeNavbar >
                <Home />
              </RouteHandler>
            }
          />    
          <Route
            path="/signin/candidate"
            element={
              <RouteHandler excludeNavbar>
                <Login />
              </RouteHandler>
            }
          />
          <Route
            path="/signin/company"
            element={
              <RouteHandler excludeNavbar>
                <LoginEnt />
              </RouteHandler>
            }
          />
          <Route
            path="/signup/candidate"
            element={
              <RouteHandler excludeNavbar>
                <Signup />
              </RouteHandler>
            }
          />
           <Route
            path="/signup/company"
            element={
              <RouteHandler excludeNavbar>
                <SignupEnt />
              </RouteHandler>
            }
          />
          
          <Route
            path="/company/AddOffres"
            element={
              <RouteHandler>
                <AddOffres />
              </RouteHandler>
            }
          />
          <Route
            path="/company/ListeOffres"
            element={
              <RouteHandler>
                <ListeOffres />
              </RouteHandler>
            }
          />
          <Route
            path="/company/EditOffres"
            element={
              <RouteHandler>
                <EditOffres />
              </RouteHandler>
            }
          />
          <Route
            path="/company/DetailOffres"
            element={
              <RouteHandler>
                <DetailOffres />
              </RouteHandler>
            }
          />
              <Route
            path="/candidate/AddCondidat"
            element={
              <RouteHandler>
                <AddCondidat />
              </RouteHandler>
            }
          />
           <Route
            path="/candidate/ListeOffres"
            element={
              <RouteHandler>
                <ListeOffresCondidat />
              </RouteHandler>
            }
          />
           <Route
            path="/candidate/DetailOffres"
            element={
              <RouteHandler>
                <DetailOffresCondidat />
              </RouteHandler>
            }
          />
          <Route
            path="/company/ListeCondidat"
            element={
              <RouteHandler>
                <ListeCondidat />
              </RouteHandler>
            }
          />
          <Route
            path="/company/RecruitmentProcess"
            element={
              <RouteHandler>
                <RecruitmentProcess />
              </RouteHandler>
            }
          />
             <Route
            path="/company/RecruitmentProcessCandidate"
            element={
              <RouteHandler>
                <RecruitmentProcessCondidat />
              </RouteHandler>
            }
          />
            <Route
            path="/company/EditProcess"
            element={
              <RouteHandler>
                <EditProcess />
              </RouteHandler>
            }
          />
                      <Route
            path="/company/EditProcessCandidate"
            element={
              <RouteHandler>
                <EditProcessCandidate />
              </RouteHandler>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Un composant pour gérer l'affichage de MenuNavbar
function RouteHandler({ children, excludeNavbar }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/Login';
  const isSignupPage = location.pathname === '/Signup';

  return (
    <>
    {/* Affichage du bon Navbar en fonction de la page */}
    {!(isLoginPage || isSignupPage) && !excludeNavbar && (
      // Vérifiez si c'est la page AddCandidat pour afficher le bon navbar
      location.pathname === '/candidate/AddCondidat' ? <MenuNavbarAddCandidat /> : <MenuNavbar />
     
    )}
    {children}
  </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
export default App;
