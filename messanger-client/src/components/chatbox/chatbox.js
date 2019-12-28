import React, { useEffect, useState } from 'react';
import SocketIO from 'socket.io-client';
import Left from './leftcomponents/left';
import Right from './rightcomponents/right';
import styles from './chatboxstyle.js';

const io = SocketIO('http://localhost:8000');

async function authentication(props, io) {
    const Token = localStorage.getItem('Token1');
    if(!Token) return props.history.push('/');
    const res = await fetch(`http://localhost:8000/validtoken/?Token=${Token}`);
    const data = await res.json();
    const { authenticated } = data;
    if(!authenticated) return props.history.push('/');
    io.emit('new-connection', { Token });
}

function getmessages(_id, cb, props) {
    const Token = localStorage.getItem('Token1');
    if(!Token) return props.history.push('/');
    io.emit('get-messages', { _id, Token }, (data) => {
        cb(data.message.messages);
    })
}

function getChatInformation(props, io, Ccb, Mcb) {
    return function(_id) {
        const Token = localStorage.getItem('Token1');
        if(!Token) return props.history.push('/');
        io.emit('get-chat-information', { Token, _id }, (data) => {
            const { authenticated, success, ...rest} = data;
            const { chatmembers } = rest.chat;
            rest.chat.sender = data._id;
            rest.chat.receiver = chatmembers.filter( e => e._id != data._id);
            Ccb(rest);
            getmessages(_id, Mcb, props);
        })
    }
}

function Chatbox(props) {
    const [selectedChat, onChatSelect] = useState(null);
    const [messages, onChangeMessage] = useState([]);
    useEffect(() => {
        authentication(props,io);
    },[])

    return (
        <div style={styles.container}>
            <div className="left" style={styles.left}>
                <Left 
                    io={io}
                    onChatSelect={getChatInformation(props, io, onChatSelect, onChangeMessage)}
                />
            </div>
            <div className="right" style={styles.right}>
                <Right
                    chat={selectedChat}
                    messages={messages}
                    onChangeMessages={onChangeMessage}
                    io={io}
                />
            </div>
        </div>
    )
}

export default Chatbox;