import React, { useState, useEffect } from 'react';
import { default as UUID } from 'node-uuid';
import Header from './header/header';
import Messages from './messages/messages';

function pushMessageToStack(messages, message, onChangeMessage, sender) {
    const refid = UUID.v1(), createdAt = new Date(), status = 0;
    const messageinfo ={ refid, createdAt, sender, message, status };
    const newmessages = [...messages, messageinfo];
    onChangeMessage(newmessages);
    return messageinfo;
}

function sendMessage(io, chat, messages, message, onChangeMessage, user, updateLastMessage) {
    return function(e) {
        if(e.keyCode !== 13) return;
        const Token = localStorage.getItem('Token1');
        const { receiver, _id } = chat;
        const messageinfo = pushMessageToStack(messages, message, onChangeMessage, user);
        updateLastMessage({ _id, msg: messageinfo })
        io.emit('send-message',{ _id, receiver, message, Token, refid: messageinfo.refid },(data) => {
            messageinfo.status = 1;
            onChangeMessage([...messages, messageinfo]);
            updateLastMessage({ _id, msg: messageinfo })
        });
        return io.removeAllListeners('send-message');
    }
}

function setTyping(onChangeTyping, onChangeMessage) {
    return function(e) {
        if (e.keyCode === 13) {
            onChangeTyping(0);
            onChangeMessage('');
        } 
        else if (e.target.value) {
            onChangeTyping(1);
        } 
        else {
            onChangeTyping(0);
        }
    }
}

function logedUserInformation(io, setUserInfo) {
    const Token = localStorage.getItem('Token1');
    io.emit('loged-user-information', { Token }, data => {
        setUserInfo(data.user);
    });
}

function getmessages(io, _id, cb) {
    const Token = localStorage.getItem('Token1');
    io.emit('get-messages', { _id, Token }, (data) => {
        console.log(data.message.messages)
        cb(data.message.messages);
    })
}

// function emittyping(io, status, _id, sender, receiver) {
//     const Token = localStorage.getItem('Token1');
//     io.emit('typing', { Token, status, _id, sender, receiver });
// }

function Chatpofile(props) {

    const [message, onchange] = useState('');
    const [typing, onChangeTyping] = useState(0);
    const [messages, onChangeMessage] = useState([]);
    const [user, setUserInfo] = useState(null);


    useEffect(() => {
        const { io } = props;
        logedUserInformation(io, setUserInfo);
    },[]);

    useEffect(() => {
        const { io, chat } = props;
        const { _id } = chat;
        getmessages(io, _id, onChangeMessage);

        io.on('new-message', (data) => {
            if(chat._id === data._id) {
                console.log(data);
                const newMessages = [...messages, data.msg];
                onChangeMessage(newMessages);
            }
        });

        return () => io.removeAllListeners('new-message');

    }, [props]);

    // useEffect(() => {
    //     emittyping(props.io, typing, props.chat._id, props.chat.sender, props.chat.receiver);
    // },[typing]);

    return ( 
        <div style={{ display:'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <div>
                <Header
                    data={props.chat}
                    io={props.io}
                ></Header>
            </div>
            <div style={{ flex: 1, overflow: 'scroll' }}>
                <Messages 
                    io={props.io}
                    messages={messages}
                />
            </div>
            <div>
                <span>
                    <input type="text" 
                        value={message} 
                        onChange={(e) => onchange(e.target.value)} 
                        onKeyDown={sendMessage(props.io, props.chat, messages, message, onChangeMessage, user, props.updateLastMessage)}
                        onKeyUp={setTyping(onChangeTyping, onchange)}
                        />
                </span>
            </div>
        </div>
    )
}

export default Chatpofile;