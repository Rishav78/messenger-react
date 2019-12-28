import React, { useState, useEffect, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { render } from '@testing-library/react';



class ProtectedRoute extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
        }
    }

    authentication = async () => {
        const Token = localStorage.getItem('Token1');
        console.log(this.props)
        if(!Token) return this.props.history.push('/');
        const res = await fetch(`http://localhost:8000/validtoken/?Token=${Token}`);
        const data = await res.json();
        const { authenticated } = data;
        if(!authenticated) return this.props.history.push('/');
    }

    async componentDidMount() {
        await this.authentication();
    }

    render(){
        const { component:Components, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={(props) => <Components {...props} />} 
            />
        )
    }
}

export default ProtectedRoute;