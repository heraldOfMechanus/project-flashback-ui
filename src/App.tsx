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
import ThreadCommentComponent from './components/ThreadCommentComponent';
import ThreadComment from './components/ThreadCommentComponent';
import { Thread } from './dtos/Thread';
import TriviaQuestionPage from "./components/TriviaQuestionPage";
import {Card} from "./dtos/Card";
import LeaderboardComponent from "./components/LeaderboardComponent";


function App() {

  document.body.style.backgroundColor = 'lightgrey';
  const [authUser, setAuthUser] = useState(undefined as Principal | undefined);
  const [User] = useState(undefined as RegisterUserRequest | undefined);
  const [currentTopic, setCurrentTopic] = useState(undefined as Subforum | undefined);
  const [currentThread, setCurrentThread] = useState(undefined as Thread | undefined);
  const [currentSet, setCurrentSet] = useState(undefined as TriviaSet | undefined);
  const [currentCard, setCurrentCard] = useState(undefined as  Card | undefined);
  // This is for cheesy auto-updating
  const [value, setValue] = useState(0);
  
  return (
    <>
    <BrowserRouter>
      <SideBarComponent currentUser = {authUser} setCurrentUser={setAuthUser} />

      
      <Switch>
        <Route exact path="/" render={() => <LandingPageComponent />} />
        <Route path="/login" render={() => <LoginComponent currentUser={authUser} setCurrentUser={setAuthUser} /> }/>
        <Route path="/register" render={() => <RegisterComponent currentUser={User} /> }/>
        <Route path="/add-trivia-set" render={() => <AddTriviaCardSetComponent /> } />

        <Route path ="/trivia-admin" render={() => <TriviaAdminComponent currentSet={currentSet} setCurrentSet={setCurrentSet} currentCard={currentCard} setCurrentCard={setCurrentCard} currentUser={authUser} setCurrentUser={setAuthUser}/>} />
        <Route exact path = "/forum" render ={()=> <ForumTopicListComponent currentTopic={currentTopic} setCurrentTopic={setCurrentTopic} />}/>
        <Route exact path = "/forum/*" render ={() => <ForumComponent currentTopic={currentTopic} setCurrentTopic={setCurrentTopic} currentUser={authUser} setCurrentUser={setAuthUser} currentThread={currentThread} setCurrentThread={setCurrentThread} value={value} setValue={setValue} />}/>
        <Route exact path = "/threads/*" render = {()=> <ThreadCommentComponent currentUser={authUser} setCurrentUser={setAuthUser} currentThread={currentThread} setCurrentThread={setCurrentThread} />}/>
        <Route exact path="/trivia" render={() => <TriviaPage currentUser={authUser} setCurrentUser={setAuthUser} currentSet={currentSet} setCurrentSet={setCurrentSet}/>} />
        <Route path="/dashboard" render={() => <DashboardComponent currentUser={authUser} setCurrentUser={setAuthUser} />} />
        <Route path="/trivia-question" render={() => <TriviaQuestionPage currentSet={currentSet} setCurrentSet={setCurrentSet} currentCard={currentCard} setCurrentCard={setCurrentCard} currentUser={authUser} setCurrentUser={setAuthUser}/>} />
        <Route path="/leaderboards"  render={() => <LeaderboardComponent />} />


      </Switch>

    </BrowserRouter>
    </>
  );
}

export default App;