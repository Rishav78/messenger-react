import React, { useEffect, useState } from 'react';
import SocketIO from 'socket.io-client';
import Left from './leftcomponents/left';
import Right from './rightcomponents/right';
import styles from './chatboxstyle.js';

const io = SocketIO('http://localhost:8000');


async function fetchWrapper(url, method = 'GET', body) {
    const Token = localStorage.getItem('Token1');
    const res = await fetch(url ,{
        method,
        body,
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    });
    const data = await res.json();
    return data;
}

async function getmessages(_id, cb) {
    const url = `http://localhost:8000/messages?id=${_id}`;
    const { messages } = await fetchWrapper(url);
    cb(messages);
}

async function getChats(cb) {
    const url = `http://localhost:8000/chat`;
    const data = await fetchWrapper(url);
    const { _id } = data;
    const { chats:activeChats } = data;
    const chats = activeChats.map( e => {
        const { chatmembers, ...rest} = e;
        rest.sender = _id;
        rest.receiver = chatmembers.filter( usr => usr._id !== _id);
        return rest;
    });
    cb(chats);
}

function createChatRoom(_id, chats, setchats, changemessages, onchatselect){
    const Token = localStorage.getItem('Token1');
    io.emit('create-private-chat-room', { Token, _id }, data => {
        const { chat, _id:id } = data;
        const { chatmembers, ...rest } = chat;
        rest.sender = id;
        rest.receiver = chatmembers.filter( usr => usr._id !== id);
        chats = [rest, ...chats];
        setchats(chats);
        onchatselect(0);
        changemessages([])
    });
}

function selectChatAndGetMessages(props, onchatselect, chats, changemessages, setchats) {
    return async function(chatno, _id) {
        if(chatno === null) {
            const url = `http://localhost:8000/chat/exist/?id=${_id}`
            const { chat } = await fetchWrapper(url);
            if(!chat) {
                return createChatRoom(_id, chats, setchats, changemessages, onchatselect);
            }
            for(let i=0;i<chats.length;i++) {
                if(chats[i]._id === chat._id){
                    selectChatAndGetMessages(props,onchatselect, chats, changemessages, setchats)(i);
                    break;
                }
            }
        } else {
            onchatselect(chatno);
            const { _id } = chats[chatno];
            getmessages(_id, changemessages, props);
        }
    }
}


function Chatbox(props) {
    const [selectedChat, onChatSelect] = useState(null);
    const [messages, onChangeMessage] = useState([]);
    const [chats, setChats] = useState([]);
    const [user, onChangeUser] = useState({});

    async function getuserinfo() {
        const url = 'http://localhost:8000/user';
        const user = await fetchWrapper(url);
        onChangeUser(user);
    }

    function updateMessageInformation(data) {
        const { msg } = data;
        const newMessage = messages.map( e => {
            if(msg._id === e._id) return msg;
            return e;
        });
        onChangeMessage(newMessage);
    }

    function updateLastMessages(data) {
        const newchats = chats.map(e => {
            if(data._id === e._id) e.messages = [data.msg];
            return e;
        });
        setChats(newchats);
    }
    

    function newMessage(data) {
        const {msg} = data;
        const Token = localStorage.getItem('Token1');
        io.emit('message-delivered', { user, msg, Token });
        if(selectedChat!==null && chats[selectedChat]._id === data._id) {
            const newMessages = [...messages, msg];
            onChangeMessage(newMessages);
        } else {
            updateLastMessages(data);
        }
    }

    function createGroup({members, chatname}) {
        const Token = localStorage.getItem('Token1');
        io.emit('create-group', { Token, members, chatname }, data => {
            const { chat, _id:id } = data;
            const { chatmembers, ...rest } = chat;
            rest.sender = id;
            rest.receiver = chatmembers.filter( usr => usr._id !== id);
            const newchats = [rest, ...chats];
            setChats(newchats);
            onChatSelect(0);
            onChangeMessage([])
        });
    }

    useEffect(() => {
        
        getChats(setChats);

    },[props])

    useEffect(() => {

        io.on('update-message-information', updateMessageInformation);

        console.log(messages)

        if(messages.length !== 0) {
            const newchats = [...chats];
            newchats[selectedChat].messages = [messages[messages.length - 1]];
            console.log(newchats[selectedChat]);
            setChats(newchats);
        }

        return () => io.off('update-message-information', updateMessageInformation);

    }, [messages]);
   
    useEffect(() => {
        io.on('new-message', newMessage)

        return () => io.off('new-message', newMessage);
    }, [chats, messages]);

    useState(() => {
        const Token = localStorage.getItem('Token1');
        io.emit('new-connection', { Token });
        getuserinfo();

    },[]);

    return (
        <div style={styles.container}>
            <div className="left" style={styles.left}>
                <Left 
                    io={io}
                    chats={chats}
                    selectedchat={selectedChat}
                    createGroup={createGroup}
                    onChatSelect={selectChatAndGetMessages(props, onChatSelect, chats, onChangeMessage, setChats)}
                />
            </div>
            <div className="right" style={styles.right}>
                <Right
                    chat={selectedChat !== null ? chats[selectedChat] : null}
                    messages={messages}
                    onChangeMessages={onChangeMessage}
                    io={io}
                />
            </div>
        </div>
    )
}

export default Chatbox;