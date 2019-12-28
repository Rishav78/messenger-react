import React, { Component } from 'react'
import './textfiled.css'

export default class TextField extends Component{

    handleInputFocus = (e) => {
        let title = e.target.parentElement;
        if(title.classList.contains('empty')){
            title.classList.remove('empty');
        }
        title.classList.add('focus');
    }

    handleInputBlur = (e) => {
        let value = e.target.value;
        let title = e.target.parentElement;
        if(!value){
            title.classList.remove('focus');
            title.classList.add('empty');
        }
    }

    render(){
        return(
            <div 
                className="textfield empty"
                
                >
                <div className="title">
                    <span>
                        {this.props.title}
                    </span>
                </div>
                <input
                    type={this.props.secure ? "password" : "text"}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    value = {this.props.value}
                    onChange = {this.props.onchange}
                    required={this.props.require}
                />
            </div>
        );
    }
}