import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import auth from './auth';
import './loginform.css';

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        let userInfo = {...this.state};
        auth.Login(userInfo, (res) => {
            res.authenticated ? this.props.history.push('/chatroom') : alert(res.err_msg);
        })
          
    }
    handlePhonenoChange = () => {
        return (e) => {
            const { value:phone } = e.target;
            this.setState({ phone });
        }
    }
    handlePasswordChange = () => {
        return (e) => {
            const { value:password } = e.target;
            this.setState({ password });
        }
    }
    render() {
        return (
            <form 
                className="loginform"
                onSubmit={this.handleFormSubmit}
                >
                <TextField 
                    label="Phone no" 
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: 12}}
                    onChange={this.handlePhonenoChange()}
                 />
                <TextField 
                    label="Password" 
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: 12 }}
                    onChange={this.handlePasswordChange()}
                 />
                <button>Submit</button>
            </form>
        );
    }
}