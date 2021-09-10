import React, { useState } from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Principal } from './dtos/Principal';
import { SideBarComponent } from './components/SideBarComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from "./components/RegisterComponent";
import LandingPageComponent from './components/LandingPageComponent';
import {RegisterUserRequest} from "./dtos/register-user-request";
import FloatingActionButtonZoom from "./components/AdminDashboardComponent";
import AddTriviaCardSetComponent from './components/AddTriviaCardSetComponent';
import {AddTriviaCardSetRequest} from "./dtos/add-trivia-card-set-request";
import TriviaAdminComponent from './components/TriviaCardsAdminComponent';
import ForumTopicListComponent from './components/ForumTopicListComponent';
import TriviaPage from './components/TriviaPage';
import ForumComponent from './components/ForumComponent';

function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined);
  const [User] = useState(undefined as RegisterUserRequest | undefined);
  const [currentTopic, setCurrentTopic] = useState(undefined as string | undefined);
  return (
    <>
    <BrowserRouter>
      <SideBarComponent currentUser = {authUser} setCurrentUser={setAuthUser} />
      
      <Switch>
        <Route exact path="/" render={() => <LandingPageComponent />} />
        <Route path="/login" render={() => <LoginComponent currentUser={authUser} setCurrentUser={setAuthUser} /> }/>
        <Route path="/register" render={() => <RegisterComponent currentUser={User} /> }/>
        <Route path="/admin-dashboard" render={() => <FloatingActionButtonZoom/>} />
        <Route path="/add-trivia-set" render={() => <AddTriviaCardSetComponent /> } />

        <Route path ="/admintrivia" render={() => <TriviaAdminComponent />}/>
        <Route exact path = "/forum" render ={()=> <ForumTopicListComponent currentTopic={currentTopic} setCurrentTopic={setCurrentTopic} />}/>
        /*routes: java, databases, webservices, spring, react, misc */
        <Route path = "/forum/*" render ={() => <ForumComponent currentTopic={currentTopic} setCurrentTopic={setCurrentTopic} />}/>
        <Route path="/trivia" render={() => <TriviaPage />} />
      </Switch>

    </BrowserRouter>
    </>
  );
}

export default App;