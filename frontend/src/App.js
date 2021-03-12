import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {BrowserRouter , Switch, Route, useParams} from 'react-router-dom';
import login from './pages/login';
import editTree from './pages/editTree';
import newTree from './pages/newTree';
import signup from './pages/signup';
import trees from './pages/trees';
import viewTree from './pages/viewTree';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={login}></Route>
        <Route path="/editTree" component={editTree}></Route>
        <Route path="/newTree/:userEmail" component={newTree}></Route>
        <Route path="/signup" component={signup}></Route>
        <Route path="/trees/:userEmail" component={trees}></Route>
        <Route path="/view/:nomeUnico" component={viewTree}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
