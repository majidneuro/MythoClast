import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import App from './App';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import resources from "./utils/Language"
i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  resources
});

ReactDOM.render((
  <BrowserRouter>
  <React.StrictMode>
  <I18nextProvider i18n={i18next}>
    <App />
    </I18nextProvider>
  </React.StrictMode>
  </BrowserRouter>
), document.getElementById('root'));
