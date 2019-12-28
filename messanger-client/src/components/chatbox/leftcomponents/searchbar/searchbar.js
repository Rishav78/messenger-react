import React, {Component} from 'react';
import MaterialIcon from 'material-icons-react';
import './searchbar.css'
export default class Searchbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
        };
    }

    handleInputFocus = (e) => {
        this.setState({isFocus: !this.state.isFocus});
        document.querySelector('.searchBackIcon i').classList.add('rotate');
        setTimeout(async () => {
            document.querySelector('.searchBackIcon i').classList.contains('rotate') && 
            document.querySelector('.searchBackIcon i').classList.remove('rotate');
        }, 500);
    }

    render() {
        return (
            <div className={ this.state.isFocus ? "searchBarContainer Inputfocus": "searchBarContainer"}>
                <div className="inputFiled">
                    <div className="searchBackIcon"
                        onClick={() => document.querySelector('.input > input').focus()}
                    >
                        <MaterialIcon
                            icon={"search"}
                            
                        /> 
                    </div>
                    <div className="input">
                        <input 
                            type="text"
                            onChange={(e) => this.props.onchange(e.target.value)}
                            placeholder={this.props.placeholder}
                            onFocus={this.handleInputFocus}
                            onBlur={this.handleInputFocus}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

