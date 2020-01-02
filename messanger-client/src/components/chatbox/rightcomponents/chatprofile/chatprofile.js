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

    function msginfo() {
        const { _id:sender } = user, status = 0, createdAt = new Date();
        return { sender, status, createdAt, message };
    }
    

    function sendMessage(e) {
        const { io } = props;
        if(e.keyCode !== 13) return;

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

    async function getuserinfo() {
        const url = 'http://localhost:8000/user';
        const user = await fetchWrapper(url);
        onChangeUser(user);
    }

    useEffect(() => {

        getuserinfo();

    }, []);

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
                        onKeyDown={sendMessage}
                        />
                </span>
            </div>
        </div>
    )
}

export default Chatpofile;