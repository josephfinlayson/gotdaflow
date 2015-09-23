import React from 'react';
import { Router, Route } from 'react-router';
import App from './components/app.component';

window.React = React;

React.render(
  <Router>
    <Route path="/" component={App} />
  </Router>
  , document.getElementById( 'content' )
);
