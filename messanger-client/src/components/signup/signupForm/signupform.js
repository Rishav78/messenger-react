import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import auth from './auth';
import './signupform.css';

export default class SignupForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            password: '',
            confirm: '',
        }
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const { firstname, lastname, phone, password, confirm } = this.state;
        console.log(password, confirm);
        if(!firstname || !lastname || !phone || !password || !confirm) return alert('empty field');
        if(password !== confirm) return alert('password not match');
        let userInfo = {...this.state};
        auth.Signup(userInfo, (res) => {
            if(!res.success) return alert(res.err_msg);
            this.props.history.push('/');
        });
    }
    handleFirstnameChange = () => {
        return (e) => {
            const { value:firstname } = e.target;
            this.setState({ firstname });
        }
    }
    handleLastnameChange = () => {
        return (e) => {
            const { value:lastname } = e.target;
            this.setState({ lastname });
        }
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
    handleConfirmChange = () => {
        return (e) => {
            const { value:confirm } = e.target;
            this.setState({ confirm });
        }
    }
    render() {
        return (
            <form 
                className="loginform"
                onSubmit={this.handleFormSubmit}
                >
                <TextField 
                    label="Firstname" 
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: 12}}
                    onChange={this.handleFirstnameChange()}
                 />
                <TextField 
                    label="Lastname" 
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: 12 }}
                    onChange={this.handleLastnameChange()}
                 />
                 <TextField 
                    label="Phone no" 
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: 12 }}
                    onChange={this.handlePhonenoChange()}
                 />
                 <TextField 
                    label="Password" 
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: 12 }}
                    onChange={this.handlePasswordChange()}
                 />
                 <TextField 
                    label="Confirm Password" 
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: 12 }}
                    onChange={this.handleConfirmChange()}
                 />
                <button>Submit</button>
            </form>
        );
    }
}