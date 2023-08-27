import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

import {
	createBrowserRouter,
	RouterProvider, Link, 
  } from "react-router-dom";


const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize();
msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });


const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Hello Browser Router <Link to="/sub/folder">Sub folder</Link></div>,
	},
	{
		path: "/sub/folder/",
		element: <div>Hello Sub Folder <Link to="/">Home</Link></div>,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
		<App>
			<RouterProvider router={router} />
		</App>
        </MsalProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
