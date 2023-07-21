import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InfoProvider } from './Contexts/InfoContext';
import { LangProvider } from './Contexts/LangContext';

ReactDOM.render(
  <React.StrictMode>
    <LangProvider>
      <InfoProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/pharmacistsmap" />} />
            <Route path="pharmacistsmap" element={<App />} />
          </Routes>
        </BrowserRouter>
      </InfoProvider>
    </LangProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

