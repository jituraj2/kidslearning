import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css"; // Ensure you have a styles file for global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Ensure this matches an element in `public/index.html`
);
