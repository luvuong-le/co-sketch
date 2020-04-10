import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import GlobalStyle from "@components/style/GlobalStyle";
import Navbar from "@components/layout/Navbar";
import Header from "@components/layout/Header";
import Title from "@components/heading/Title";
import Landing from "@components/layout/Landing";
import Login from "@components/auth/Login";
import TileHeading from '@components/heading/TileHeading';
import WebSocketClient from "@components/providers/WebSocketClient";

new WebSocketClient(process.env.REACT_APP_WEBSOCKET_URL);

function App() {
  return (
    <Router>
      <div className="app">
        <GlobalStyle />
        <Navbar />
        <Header>
          <Title>
            <Link to="/">
              <TileHeading title="Co-Sketch" />
            </Link>
          </Title>
        </Header>
        <Switch>
          <Route exact path="/" component={ Landing } />
          <Route exact path="/login" component={ Login } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;