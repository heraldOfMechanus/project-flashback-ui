import React, { useState } from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Principal } from './dtos/Principal';
import { SideBarComponent } from './components/SideBarComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from "./components/RegisterComponent";
import LandingPageComponent from './components/LandingPageComponent';
import {RegisterUserRequest} from "./dtos/register-user-request";
import {TriviaSet} from "./dtos/TriviaSet";
import AddTriviaCardSetComponent from './components/AddTriviaCardSetComponent';
import TriviaAdminComponent from './components/TriviaCardsAdminComponent';
import ForumTopicListComponent from './components/ForumTopicListComponent';
import TriviaPage from './components/TriviaPage';
import ForumComponent from './components/ForumComponent';
import DashboardComponent from './components/DashboardPageComponent';
import { Subforum } from './dtos/Subforum';


function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined);
  const [User] = useState(undefined as RegisterUserRequest | undefined);
  const [currentTopic, setCurrentTopic] = useState(undefined as Subforum | undefined);
  const [currentSet, setCurrentSet] = useState(undefined as TriviaSet | undefined);
  
  return (
    <>
    <BrowserRouter>
      <SideBarComponent currentUser = {authUser} setCurrentUser={setAuthUser} />
      
      <Switch>
        <Route exact path="/" render={() => <LandingPageComponent />} />
        <Route path="/login" render={() => <LoginComponent currentUser={authUser} setCurrentUser={setAuthUser} /> }/>
        <Route path="/register" render={() => <RegisterComponent currentUser={User} /> }/>
        <Route path="/add-trivia-set" render={() => <AddTriviaCardSetComponent /> } />

        <Route path ="/admintrivia" render={() => <TriviaAdminComponent />}/>
        <Route exact path = "/forum" render ={()=> <ForumTopicListComponent currentTopic={currentTopic} setCurrentTopic={setCurrentTopic} />}/>
        <Route exact path = "/forum/*" render ={() => <ForumComponent currentTopic={currentTopic} setCurrentTopic={setCurrentTopic} />}/>
        <Route exact path="/trivia" render={() => <TriviaPage currentUser={authUser} setCurrentUser={setAuthUser} currentSet={currentSet} setCurrentSet={setCurrentSet}/>} />
        <Route path="/dashboard" render={() => <DashboardComponent currentUser={authUser} setCurrentUser={setAuthUser} />} />


      </Switch>

    </BrowserRouter>
    </>
  );
}

export default App;