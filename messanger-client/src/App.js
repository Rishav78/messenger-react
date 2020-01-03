import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Cover from './components/cover/cover';
import Chatbox from './components/chatbox/chatbox';
import ProtectedRoute from './components/protected/protected'

function LoginRoute({component:Component, ...rest}) {
  const [authenticated, setAuthenticated] = useState(false);

  async function authentication(cb) {
    const Token = localStorage.getItem('Token1');
    const res = await fetch(`http://localhost:8000/validtoken/?token=${Token}`, {
        method: 'GET',
    });
    const { authenticated } = await res.json();
    cb(authenticated);
  }
  

  useEffect(() => {
    authentication(setAuthenticated);
  })
  return (
    <Route
        {...rest}
        render={(props) => 
            !authenticated ? <Component {...props} /> : <Redirect to="/chatroom" />
        } 
    />
  )
}

function App() {
  return (
    <Cover>
      <Router>
        <Switch>
          <LoginRoute exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute path="/chatroom" component={Chatbox} />
        </Switch>
      </Router>
    </Cover>
  );
}

export default App;
