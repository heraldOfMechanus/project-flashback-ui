import React, { useState } from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Principal } from './dtos/Principal';
import { SideBarComponent } from './components/SideBarComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from "./components/RegisterComponent";
import LandingPageComponent from './components/LandingPageComponent';
import {RegisterUserRequest} from "./dtos/register-user-request";
<<<<<<< HEAD
import FloatingActionButtonZoom from "./components/AdminDashboardComponent";
=======
import TriviaAdminComponent from './components/TriviaCardsAdminComponent';
>>>>>>> cf7185e6276a84396c3c540821d8f46f10fdb827



function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined);
  const [User] = useState(undefined as RegisterUserRequest | undefined);
  return (
    <>
    <BrowserRouter>
      <SideBarComponent currentUser = {authUser} setCurrentUser={setAuthUser} />
      
      <Switch>
        <Route exact path="/" render={() => <LandingPageComponent /> }/>
        <Route path="/login" render={() => <LoginComponent currentUser={authUser} setCurrentUser={setAuthUser} /> }/>

        <Route path="/register" render={() => <RegisterComponent currentUser={User} /> }/>
<<<<<<< HEAD
        <Route path="/admin-dashboard" render={() => <FloatingActionButtonZoom/>} />
=======

        <Route path ="/admintrivia" render={() => <TriviaAdminComponent />}/>
        
>>>>>>> cf7185e6276a84396c3c540821d8f46f10fdb827



      </Switch>

    </BrowserRouter>
    </>
  );
}

export default App;