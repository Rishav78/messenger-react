import React, {Component} from 'react';
import './login.css';
import LoginForm from './loginForm/loginform';

export default class Login extends Component{
    render(){
        return(
            <div className="logincontainer">
                 <LoginForm
                    history={this.props.history}
                 ></LoginForm>
            </div>
        );
    }
}