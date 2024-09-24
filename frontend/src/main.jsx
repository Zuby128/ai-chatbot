import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style/index.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      richColors
      position="top-center"
      closeButton={true}
      invert={true}
    />
  </StrictMode>
);
