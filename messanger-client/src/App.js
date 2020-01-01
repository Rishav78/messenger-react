import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Cover from './components/cover/cover';
import Chatbox from './components/chatbox/chatbox';
import ProtectedRoute from './components/protected/protected'

async function authentication(cb) {
  const Token = localStorage.getItem('Token1');
  if(!Token) return cb(false);
  const res = await fetch(`http://localhost:8000/validtoken`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${Token}`
    }
  });
  const data = await res.json();
  const { authenticated } = data;
  cb(authenticated);
}

function LoginRoute({component:Component, ...rest}) {
  const [authenticated, setAuthenticated] = useState(false);
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
          <Route path="/chatroom" component={Chatbox} />
        </Switch>
      </Router>
    </Cover>
  );
}

export default App;
