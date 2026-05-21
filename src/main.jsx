import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Global styles
import "./index.css";

// Page-specific styles — all in one place (DRY)
import "./styles/navbar_footer.css";
import "./styles/home.css";
import "./styles/about.css";
import "./styles/features.css";
import "./styles/pricing.css";
import "./styles/docs.css";
import "./styles/contact.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
