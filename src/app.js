import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/home'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Browse from './pages/browse'
import * as ROUTES from './constants/routes' 
import {IsUserRedirect, ProtectedRoute} from './helpers/routes'
import useAuthListener from './hooks/use-auth-listener'


export default function App() {
    const user = useAuthListener()
    
  return (
    <Router>
        <Switch>
                <IsUserRedirect user = {user} 
                                  loggedInPath = {ROUTES.BROWSE}
                                  path = {ROUTES.SIGN_IN}
                                  exact>

                        <Signin/>
                                  
              </IsUserRedirect>

              <IsUserRedirect user = {user} 
                                  loggedInPath = {ROUTES.BROWSE}
                                  path = {ROUTES.SIGN_UP}
                                  exact>

                        <Signup/>
                                  
              </IsUserRedirect>
            


              <ProtectedRoute user = {user} path = {ROUTES.BROWSE} exact>

                  <Browse/>

              </ProtectedRoute>

              <IsUserRedirect     user = {user} 
                                  loggedInPath = {ROUTES.BROWSE}
                                  path = {ROUTES.HOME}
                                  exact>
                        
                  <Home/>
                                  
              </IsUserRedirect>
        </Switch>
      
      
   </Router>
  );
}


