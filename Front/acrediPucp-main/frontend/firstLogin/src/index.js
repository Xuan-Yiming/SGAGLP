import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import { store } from "./Redux/store";

import { addDatosAdmin } from "./Redux/AdministradorSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <GoogleOAuthProvider clientId="540582687952-u3o00kdm3dclkeaii1ddrbrpjcgljrcf.apps.googleusercontent.com">
        <CookiesProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </CookiesProvider>
    </GoogleOAuthProvider>

);

