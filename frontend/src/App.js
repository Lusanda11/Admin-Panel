// ****************** App.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React from "react";
    import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Dependencies.
    import Navbar from "./components/Navbar"; // Importing Components & Pages.
    import SignUp from "./pages/SignUp";
    import Dashboard from "./components/Dashboard";
    import InfluencerList from "./components/InfluencerList";
    import InfluencerDetail from "./components/InfluencerDetail";
    import ClaimVerification from "./components/ClaimVerification";
    import ResearchConfig from "./components/ResearchConfig";
    import SearchInfluencer from "./components/SearchInfluencer";
    import AdminPanel from "./pages/AdminPanel";
    import Home from "./pages/Home";
    import "./styles/global.css"; // Importing Global Styles.
    import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
// ----------------------------------------------------------------------------------------------------------------------------


// Defining the App Component.
// ----------------------------------------------------------------------------------------------------------------------------
    const App = () =>
    {
        return (
            <AuthProvider>
              <Router> {/* Setting Up React Router */}
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} /> {/* Defining Routes */}
                  <Route path="/adminpanel" element={<AdminPanel />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/influencerlist" element={<InfluencerList />} />
                  <Route path="/influencerdetail" element={<InfluencerDetail />} />
                  <Route path="/claimverification" element={<ClaimVerification />} />
                  <Route path="/researchconfig" element={<ResearchConfig />} />
                  <Route path="/searchinfluencer" element={<SearchInfluencer />} />
                </Routes> {/* Closing Components & Exporting App */}
              </Router>
            </AuthProvider>
        );
    };
// ----------------------------------------------------------------------------------------------------------------------------


export default App; // Export necessary modules.
