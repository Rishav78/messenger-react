import React, { useState, useEffect } from 'react';
import Header from './header/header';
import Messages from './messages/messages';

function Chatpofile(props) {
    return ( 
        <div style={{ display:'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <div>
                <Header
                    data={props.chat}
                ></Header>
            </div>
            <div style={{ flex: 1 }}>
                <Messages 
                    chat={props.chat}
                    io={props.io}
                />
            </div>
        </div>
    )
}

export default Chatpofile;