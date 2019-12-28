import React, {Component} from 'react';
import './signup.css';
import SignupForm from './signupForm/signupform';

export default class Signup extends Component{
    render(){
        return(
            <div className="logincontainer">
                 <SignupForm
                    history={this.props.history}
                 ></SignupForm>
            </div>
        );
    }
}