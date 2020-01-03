import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Header(props) {
    return (
        <header style={{ height: 108, boxSizing: 'border-box', paddingLeft: 20, paddingRight: 20, display: 'flex', alignItems: 'flex-end', backgroundColor: '#00bfa5' }}>
            <div style={{ display: 'flex', flexDirection: 'row', height: 59, alignItems: 'center', width: '100%'}}>
                <div 
                    style={{ marginRight: 20, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    onClick={props.onBack}
                >
                    <ArrowBackIcon
                        style={{ color: 'white' }}
                    />
                </div>
                <div style={{ flex: 1, color: 'white' }}>
                    <span style={{ fontSize: 20 }}> {props.tittle} </span>
                </div>
            </div>
        </header>
    );
}

export default Header;