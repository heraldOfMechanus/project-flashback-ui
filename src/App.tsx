import React, { useState } from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Principal } from './dtos/Principal';
import { SideBarComponent } from './components/SideBarComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from "./components/RegisterComponent";
import LandingPageComponent from './components/LandingPageComponent';
import {RegisterUserRequest} from "./dtos/register-user-request";
import AddTriviaCardSetComponent from './components/AddTriviaCardSetComponent';
import {AddTriviaCardSetRequest} from "./dtos/add-trivia-card-set-request";
import FloatingActionButtonZoom from "./components/AdminDashboardComponent";
import TriviaAdminComponent from './components/TriviaCardsAdminComponent';



function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined);
  const [User] = useState(undefined as RegisterUserRequest | undefined);

  return (
    <>
    <BrowserRouter>
      <SideBarComponent currentUser = {authUser} setCurrentUser={setAuthUser} />
      
      <Switch>
        {/* <Route exact path="/" render={() => <LandingPageComponent /> }/> */}
        <Route path="/login" render={() => <LoginComponent currentUser={authUser} setCurrentUser={setAuthUser} /> }/>

        <Route path="/register" render={() => <RegisterComponent currentUser={User} /> }/>
        <Route path="/add-trivia-set" render={() => <AddTriviaCardSetComponent /> } />
        <Route path="/admin-dashboard" render={() => <FloatingActionButtonZoom/>} />

        <Route path ="/admintrivia" render={() => <TriviaAdminComponent />}/>
        
      </Switch>

    </BrowserRouter>
    </>
  );
}

export default App;