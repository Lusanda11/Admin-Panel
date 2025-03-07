// ****************** AuthContext.js *********************

// Imports necessary React functions.
import React, { createContext, useContext, useState } from "react";

// Imports necessary React functions.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    createContext – Creates a new context for authentication.
    useContext – Allows components to access context values.
    useState – Manages user authentication state.
\* -------------------------------------------------------------------------------------------------------------------------- */

// Creating the Context.
const AuthContext = createContext(); // Initializes the AuthContext, which will be used to share authentication data across components.


// Defining the AuthProvider Component.
// ----------------------------------------------------------------------------------------------------------------------------
    export const AuthProvider = ({ children }) =>
    {
        // Creates the AuthProvider component, which will wrap the application and provide authentication-related values.
        const [user, setUser] = useState(() =>
        {
            // Managing User State (Persistent Authentication).
            return JSON.parse(localStorage.getItem("user")) || null;
        });

        const login = (userData) =>
        {
            // Login Function.
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
        };

        const logout = () =>
        {
            // Logout Function.
            setUser(null);
            localStorage.removeItem("user");
        };

        // Providing Context Values
        return (
            <AuthContext.Provider value={{ user, login, logout }}> {/* Wraps the children components with AuthContext.Provider. */}
              {children}
              {/* Provides user, login, and logout as context values for consumption in the app. */}
            </AuthContext.Provider>
        );
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Custom Hook for Context Access.
export const useAuth = () => useContext(AuthContext); // Creates a helper function useAuth() to easily access authentication values without manually using useContext(AuthContext).
