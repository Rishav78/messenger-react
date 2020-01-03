import React, { useState, useEffect, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { render } from '@testing-library/react';



class ProtectedRoute extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            isLoading: true,
        }
    }

    authentication = async () => {
        const Token = localStorage.getItem('Token1');
        const res = await fetch(`http://localhost:8000/validtoken/?token=${Token}`, {
            method: 'GET',
        });
        const { authenticated } = await res.json();
        await this.setState({ authenticated });
        await this.setState({ isLoading: false});
    }

    componentDidMount() {
        this.authentication();
    }

    render(){
        const { component:Components, ...rest } = this.props;
        return (
            this.state.isLoading ? <div></div> :
            this.state.authenticated ? <Route {...rest} render={(props) => <Components {...props} />} /> : 
            <Redirect to="/" />
        )
    }
}

export default ProtectedRoute;