import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
const LazyApp = React.lazy(() => import('./App'));

import {
  HashRouter, // Switch from BrowserRouter to HashRouter
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <LazyApp />
    </HashRouter>
  </React.StrictMode>
);
