import React, { useEffect, useState } from 'react';
import SocketIO from 'socket.io-client';
import Left from './leftcomponents/left';
import Right from './rightcomponents/right';
import styles from './chatboxstyle.js';

const io = SocketIO('http://localhost:8000');

async function authentication(props) {
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

function getChats(cb) {
    const Token = localStorage.getItem('Token1');
    io.emit('get-ongoing-chats', { Token }, data => {
        const { _id } = data;
        const { activeChats } = data.chats;
        const chats = activeChats.map( e => {
            const { chatmembers, ...rest} = e;
            rest.sender = _id;
            rest.receiver = chatmembers.filter( usr => usr._id !== _id);
            return rest;
        });
        cb({chats, _id});
    });
}

function createChatRoom(_id, chats, setchats, changemessages, onchatselect){
    const Token = localStorage.getItem('Token1');
    io.emit('create-private-chat-room', { Token, _id }, data => {
        const { chat, _id:id } = data;
            const { chatmembers, ...rest } = chat;
            rest.sender = id;
            rest.receiver = chatmembers.filter( usr => usr._id !== id);
            chats.chats = [...chats.chats, rest];
            setchats(chats);
            onchatselect(chats.chats.length-1);
            changemessages([])
    });
}

function chatAlreadyGoingon(_id, chats, setchats, changemessages, onchatselect, props) {
    const Token = localStorage.getItem('Token1');
    io.emit('chat-already-going-on', { _id, Token }, (data) => {
        const { chat } = data;
        if(!chat) return createChatRoom(_id, chats, setchats, changemessages, onchatselect);
        for(let i=0;i<chats.chats.length;i++) {
            if(chats.chats[i]._id === chat._id){
                selectChatAndGetMessages(props,onchatselect, chats, changemessages, setchats)(i);
                break;
            }
        }
    })
}

function selectChatAndGetMessages(props, onchatselect, chats, changemessages, setchats) {
    return function(chatno, _id) {
        if(chatno === null) {
            chatAlreadyGoingon( _id, chats, setchats, changemessages, onchatselect, props);
        } else {
            onchatselect(chatno);
            const { _id } = chats.chats[chatno];
            getmessages(_id, changemessages, props);
        }
    }
}

function Chatbox(props) {
    const [selectedChat, onChatSelect] = useState(null);
    const [messages, onChangeMessage] = useState([]);
    const [chats, setChats] = useState(null);
    useEffect(() => {
        authentication(props);
        getChats(setChats);
    },[props])
    io.on('new-message', (data) => {
        if(selectedChat!==null && chats.chats[selectedChat]._id === data._id) {
            const newMessages = [...messages, data.msg];
            onChangeMessage(newMessages);
        }
    })

    return (
        <div style={styles.container}>
            <div className="left" style={styles.left}>
                <Left 
                    io={io}
                    chats={chats}
                    selectedchat={selectedChat}
                    onChatSelect={selectChatAndGetMessages(props, onChatSelect, chats, onChangeMessage, setChats)}
                />
            </div>
            <div className="right" style={styles.right}>
                <Right
                    chat={selectedChat !== null ? chats.chats[selectedChat] : null}
                    messages={messages}
                    onChangeMessages={onChangeMessage}
                    io={io}
                />
            </div>
        </div>
    )
}

export default Chatbox;