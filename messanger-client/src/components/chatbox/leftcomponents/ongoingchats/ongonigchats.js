import React, {useEffect, useState} from 'react';
import Header from './header/header';
import Searchbar from '../searchbar/searchbar';
import Chat from './chat/chat';

function getChats(props, cb) {
    const { io } = props;
    const Token = localStorage.getItem('Token1');
    io.emit('get-ongoing-chats', { Token }, data => {
        const { activeChats, _id } = data.chats;
        const chats = activeChats.map( e => {
            const { chatmembers, ...rest} = e;
            rest.sender = _id;
            rest.receiver = chatmembers.filter( usr => usr._id != _id);
            return rest;
        });
        cb({chats, _id});
    });
}

function OngoingChats(props) {
    const [search, onSearchChange] = useState('');
    const [chats, setChats] = useState(null);
    useEffect(() => {
        getChats(props, setChats);
    },[])
    return (
        <div>
            <div>
                <Header
                    changeComponent={props.changeComponent}
                />
            </div>
            <div>
                <Searchbar 
                    onchange = {onSearchChange}
                    placeholer="Search here..."
                />
            </div>
            <div>
                {
                    chats ? chats.chats.map((chat, i) => 
                        <Chat 
                            key={i}
                            data={{ chat, _id:chats._id }}
                            onclick={ (_id) => props.onChatSelect(_id)}
                        />) : null
                }
            </div>
        </div>
    );
}

export default OngoingChats;