// ****************** Navbar.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React from "react";
    import { Link } from "react-router-dom";
    import { useAuth } from "../context/AuthContext"; // Import useAuth
    import "bootstrap/dist/css/bootstrap.min.css";
// ----------------------------------------------------------------------------------------------------------------------------

// Navbar Component Definition.
const Navbar = function Navbar()
{
    const { user, logout } = useAuth(); // Access user and logout function

// Navbar Container and Brand Link
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* Uses a nav element with Bootstrap classes for styling  */}
          <div className="container"> {/* Wraps the navbar content inside a Bootstrap container for alignment. */}
            <Link className="navbar-brand" to="/">MyApp</Link> {/* Includes a brand link (MyApp) that redirects users to the home page (/). */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav"> {/* Defines the collapsible menu with collapse navbar-collapse. */}
              <ul className="navbar-nav ms-auto"> {/* Uses ms-auto to align links to the right. */}
                {/* Always show these links */}
                <li className="nav-item">
                  <Link className="nav-link" to="/claimverification">Claim Verification</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/influencerlist">Influencer List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/influencerdetail">Influencer Detail</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/researchconfig">Research Config</Link>
                </li>
                {/* ✅ NEW: Added Search Influencer Link */}
                <li className="nav-item">
                  <Link className="nav-link" to="/searchinfluencer">Search Influencer</Link>
                </li>

                {/* Show the login/signup/logout links conditionally */}
                {user ? (
                  <>
                    <li className="nav-item">
                      <span className="nav-link">{`Welcome, ${user.firstName}`}</span> {/* Displays a welcome message using user.firstName. */}
                    </li>
                    <li className="nav-item">
                      <button className="nav-link btn btn-link" onClick={logout}>Logout</button> {/* Provides a Logout button that calls logout() when clicked. */}
                    </li>
                  </>
                ) : (
                  <>  {/* Conditional Rendering: User Not Logged In. */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">Sign Up</Link> {/* Shows a Sign Up link leading to /signup. */}
                    </li>
                  </>
                )}
                {/* The component correctly closes all elements (ul, div, nav). */}
              </ul>
            </div>
          </div>
        </nav>
    );
};

export default Navbar; // Export necessary modules.
