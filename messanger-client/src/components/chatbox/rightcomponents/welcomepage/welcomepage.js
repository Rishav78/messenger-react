import React, {Component} from 'react';
import Content from './content/content';
import './welcomepage.css';

export default function WelcomePage(){
    return(
        <div className="welcomePageContainer">
            <Content></Content>
        </div>
    );
}