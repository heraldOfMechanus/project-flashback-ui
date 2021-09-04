import React, { useState } from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Principal } from './dtos/Principal';
import { SideBarComponent } from './components/SideBarComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from "./components/RegisterComponent";
import {RegisterUserRequest} from "./dtos/register-user-request";
import {logout} from "./remote/auth-service";


function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined);
  const [User] = useState(undefined as RegisterUserRequest | undefined);
  return (
    <>
    <BrowserRouter>
      <SideBarComponent currentUser = {authUser} setCurrentUser={setAuthUser} />
      <Switch>
        <Route path="/login" render={() => <LoginComponent currentUser={authUser} setCurrentUser={setAuthUser} /> }/>
        <Route path="/register" render={() => <RegisterComponent currentUser={User} /> }/>



      </Switch>

    </BrowserRouter>
    </>
  );
}

export default App;