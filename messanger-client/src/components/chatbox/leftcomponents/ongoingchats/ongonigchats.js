import React, { useState, useEffect} from 'react';
import Header from './header/header';
import Searchbar from '../searchbar/searchbar';
import Chat from './chat/chat';

function getname(chat) {
   return chat.chattype ? chat.chatname : (chat.receiver[0].firstname + ' ' + chat.receiver[0].lastname)
}
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


function OngoingChats(props) {
    const [search, onSearchChange] = useState('');
    const [user, onChangeUser] = useState({});
    const chats = props.chats.length && props.chats.filter(e => !search || getname(e).match(new RegExp(search, "i")))

    async function getuserinfo() {
        const url = 'http://localhost:8000/user';
        const user = await fetchWrapper(url);
        onChangeUser(user);
    }

    useEffect(() => {

        getuserinfo();

    }, []);

    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column'}}>
            <div>
                <Header
                    changeComponent={props.changeComponent}
                    io={props.io}
                />
            </div>
            <div>
                <Searchbar 
                    onchange = {onSearchChange}
                    placeholer="Search here..."
                />
            </div>
            <div style={{flex: 1, overflow: 'scroll'}}>
                <div>
                {
                    chats ? chats.map((chat, i) => 
                        <Chat 
                            key={i}
                            io={props.io}
                            data={chat}
                            user={user}
                            onclick={ () => props.onChatSelect(i)}
                            selectedchat={props.selectedchat === i}
                            userlastmessage={props.userlastmessage}
                        />) : null
                }
                </div>
            </div>
        </div>
    );
}

export default OngoingChats;