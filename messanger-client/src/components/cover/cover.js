import React from 'react';
import './cover.css';

function Cover(props){
    return(
        <div style={{position: 'relative', width: '100%', height: '100vh'}}>
            <div className="app-wrapper">
                {props.children}
            </div>
        </div>
    );
}

export default Cover;