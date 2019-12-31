import React, { useState } from 'react';
import Header from './header/header';
import Messages from './messages/messages';

function sendMessage(props, message, cb) {
    return function(e) {
        const { io } = props;
        if(e.keyCode !== 13) return;
        const Token = localStorage.getItem('Token1');
        if(!Token) return;
        const { receiver, _id } = props.chat;
        io.emit('send-message',{ _id, receiver, message, Token },(data) => {
            const newMessages = [...props.messages, data.msg];
            props.onChangeMessages(newMessages);
            props.updateLastMessages({_id, msg: data.msg});
            cb('')
        });
    }
}

function Chatpofile(props) {

    const [message, onchange] = useState('');

    return ( 
        <div style={{ display:'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <div>
                <Header
                    data={props.chat}
                ></Header>
            </div>
            <div style={{ flex: 1, overflow: 'scroll' }}>
                <Messages 
                    io={props.io}
                    messages={props.messages}
                />
            </div>
            <div>
                <span>
                    <input type="text" 
                        value={message} 
                        onChange={(e) => onchange(e.target.value)} 
                        onKeyDown={sendMessage(props, message, onchange)}
                        />
                </span>
            </div>
        </div>
    )
}

export default Chatpofile;