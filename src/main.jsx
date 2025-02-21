import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from './reducers/reducers';
import App from './App.jsx';
import './index.css';
import MobileDetector from './components/MobileDetector';
import InitializationService from './services/InitializationService';
import { Box } from '@mui/system';
import Dash from './CMS/Dash.jsx';
import Setup from './Setup/Setup.jsx';

const checkDatabase = () => {
  return import.meta.env.VITE_REACTOR_DB_EXISTS === 'true';  
};

const store = createStore(rootReducer);

const root = document.getElementById('root');
const rootElement = ReactDOM.createRoot(root);

const RootComponent = () => {
  const [isDbExist, setIsDbExist] = useState(null);

  useEffect(() => {
    const initialize = () => {
      const dbExists = checkDatabase(); 
      setIsDbExist(dbExists); 
    };
    initialize();
  }, []); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="Home" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <>
                <MobileDetector />
                <Setup />
              </>
            )}
          </Provider>
        } />
        <Route path="/Auth" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="Auth" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="/profile" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="Profile" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="/blog" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="Blog" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="/gallery" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="Gallery" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="/contact" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="Contact" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="/TermsOfService" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="TermsOfService" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="/PrivacyPolicy" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="PrivacyPolicy" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="/FAQ" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="FAQ" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="/blog/:postTitle" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="SingleBlogPage" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="*" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <App routeTo="NotFoundPage" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="/Dashboard" element={
          <Provider store={store}>
            {isDbExist ? (
              <>
                <Dash routeTo="Auth" />
                <MobileDetector />
                <InitializationService />
              </>
            ) : (
              <Setup />
            )}
          </Provider>
        } />
        <Route path="/Setup" element={
          <Provider store={store}>
            <Setup />
            <MobileDetector />
          </Provider>
        } />
      </Routes>
    </BrowserRouter>
  );
};

rootElement.render(<RootComponent />);
