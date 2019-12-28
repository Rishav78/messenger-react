import React, { useEffect, useState } from 'react';
import Message from './message/message';


function sendMessage(props, message) {
    return function(e) {
        const { io } = props;
        if(e.keyCode !== 13) return;
        const Token = localStorage.getItem('Token1');
        io.emit('send-message',{...props.chat, message, Token},(data) => {
            console.log(data);
        });
    }
}

function Messages(props) {
    const [message, onchange] = useState('');

    props.io.on('new-message', (data) => {
        console.log(data);
    })

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
            <div style={{flex: 1}}>
               
            </div>
            <div>
                <span>
                    <input type="text" 
                        value={message} 
                        onChange={(e) => onchange(e.target.value)} 
                        onKeyDown={sendMessage(props, message)}
                        />
                </span>
            </div>
        </div>
    );
}

export default Messages;