import React, { useState } from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Principal } from './dtos/Principal';
import { SideBarComponent } from './components/SideBarComponent';
import LoginComponent from './components/LoginComponent';

function App() {

  const [authUser, setAuthUser] = useState(undefined as Principal | undefined);
  return (
    <>
    <BrowserRouter>
      <SideBarComponent currentUser = {authUser} setCurrentUser={setAuthUser} />
      <Switch>
        <Route path="/login" render={() => <LoginComponent currentUser={authUser} setCurrentUser={setAuthUser} /> } />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;