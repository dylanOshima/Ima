import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Tasks from './components/Tasks';

const Hello = () => {
  return (
    <>
      <div className="header">
        <span className="logo">今</span>
        <span className="menu">menu</span>
      </div>
      <Tasks />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
