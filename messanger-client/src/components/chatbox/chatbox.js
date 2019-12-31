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

function createChatRoom(_id, chats, setchats, onchatselect){
    const Token = localStorage.getItem('Token1');
    io.emit('create-private-chat-room', { Token, _id }, data => {
        const { chat, _id:id } = data;
            const { chatmembers, ...rest } = chat;
            rest.sender = id;
            rest.receiver = chatmembers.filter( usr => usr._id !== id);
            chats.chats = [...chats.chats, rest];
            setchats(chats);
            onchatselect(chats.chats.length-1);
    });
}

function chatAlreadyGoingon(_id, chats, setchats, onchatselect, props) {
    const Token = localStorage.getItem('Token1');
    io.emit('chat-already-going-on', { _id, Token }, (data) => {
        const { chat } = data;
        if(!chat) return createChatRoom(_id, chats, setchats, onchatselect);
        for(let i=0;i<chats.chats.length;i++) {
            if(chats.chats[i]._id === chat._id){
                selectChatAndGetMessages(props,onchatselect, chats, setchats)(i);
                break;
            }
        }
    })
}

function selectChatAndGetMessages(props, onchatselect, chats, setchats) {
    return function(chatno, _id) {
        if(chatno === null) {
            chatAlreadyGoingon( _id, chats, setchats, onchatselect, props);
        } else {
            onchatselect(chatno);
            const { _id } = chats.chats[chatno];
        }
    }
}

function logedUserInformation(setUserInfo) {
    const Token = localStorage.getItem('Token1');
    io.emit('loged-user-information', { Token }, data => {
        setUserInfo(data.user);
    });
}

function updateLastMessage(chats, setChats) {
    return function(message) {
        const newchats = { _id: chats._id };
        newchats.chats = chats.chats.map(e => {
            if(e._id == message._id) e.messages = [message.msg];
            return e;
        });
        setChats(newchats);
    }
}

function Chatbox(props) {
    const [selectedChat, onChatSelect] = useState(null);
    const [chats, setChats] = useState(null);
    const [user, setUserInfo] = useState(null);
    const [userlastmessage, onChangeLastMessage] = useState(null);

    useEffect(() => {
        authentication(props);
        getChats(setChats);
    },[props])

    useEffect(() => {
        logedUserInformation(setUserInfo)
    },[]);

    return (
        <div style={styles.container}>
            <div className="left" style={styles.left}>
                <Left 
                    io={io}
                    chats={chats} 
                    userlastmessage={userlastmessage}
                    selectedchat={selectedChat}
                    onChatSelect={selectChatAndGetMessages(props, onChatSelect, chats, setChats)}
                />
            </div>
            <div className="right" style={styles.right}>
                <Right
                    chat={selectedChat !== null ? chats.chats[selectedChat] : null}
                    updateLastMessage={updateLastMessage(chats, setChats)}
                    io={io}
                />
            </div>
        </div>
    )
}

export default Chatbox;