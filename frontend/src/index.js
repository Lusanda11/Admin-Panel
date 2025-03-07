// ****************** index.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React from "react"; // Importing React and ReactDOM.
    import ReactDOM from "react-dom/client";
    import "./index.css";
    import App from "./App";
    // import reportWebVitals from "./reportWebVitals";
// ----------------------------------------------------------------------------------------------------------------------------


// Creating a Root DOM Node and Rendering the App Component Inside.
// ----------------------------------------------------------------------------------------------------------------------------
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
// ----------------------------------------------------------------------------------------------------------------------------


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
