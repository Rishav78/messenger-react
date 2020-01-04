import React, { useState, useEffect } from 'react';
import Header from './header/header';
import Messages from './messages/messages';

async function fetchWrapper(url) {
    const Token = localStorage.getItem('Token1');
    const res = await fetch(url ,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    });
    const data = await res.json();
    return data;
}

function Chatpofile(props) {

    const [message, onchange] = useState('');
    const [user, onChangeUser] = useState({});
    const [typingStatus, onChangeTypingStatus] = useState(false);

    function msginfo() {
        const { _id:sender } = user, status = false, createdAt = new Date();
        return { sender, status, createdAt, message };
    }
    

    function sendMessage(e) {
        const { io } = props;
        if(e.keyCode !== 13) return;

        onChangeTypingStatus(false);
        const Token = localStorage.getItem('Token1');

        const { receiver, _id } = props.chat;

        const tempmsg = msginfo();
        const tempmessages = [...props.messages, tempmsg];
        props.onChangeMessages(tempmessages);

        io.emit('send-message',{ _id, receiver, message, Token },(data) => {
            tempmessages.pop();
            const { msg } = data;
            const newMessages = [...tempmessages, msg];
            props.onChangeMessages(newMessages);
            onchange('');
        });
    }

    function typing(e) {
        const { value } = e.target;
        console.log(value);
        if(!value) onChangeTypingStatus(false);
        else onChangeTypingStatus(true);
        onchange(value);
    }

    async function getuserinfo() {
        const url = 'http://localhost:8000/user';
        const user = await fetchWrapper(url);
        onChangeUser(user);
    }

    useEffect(() => {

        getuserinfo();

    }, []);

    useEffect(() => {
        
        const { io, chat } = props;
        io.emit('typing', {status: typingStatus, chat, user});

        return () => io.removeAllListeners('typing');

    }, [typingStatus]);

    return ( 
        <div style={{ display:'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <div>
                <Header
                    io={props.io}
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
                        onChange={typing} 
                        onKeyDown={sendMessage}
                        />
                </span>
            </div>
        </div>
    )
}

export default Chatpofile;