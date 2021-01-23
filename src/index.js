import React from 'react';
import {render} from 'react-dom';
import App from './app';
import {GlobalStyles} from './global-styles'
import 'normalize.css'
import {firebase} from './firebase'
import {FirebaseContext} from './context/firebase'


render(<>
        <FirebaseContext.Provider value = {{firebase}}>
                <GlobalStyles/>
                <App />
        </FirebaseContext.Provider>
        </>
        , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

