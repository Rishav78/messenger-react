import React, { useState} from 'react';
import Header from './header/header';
import Searchbar from '../searchbar/searchbar';
import Chat from './chat/chat';

function getname(chat) {
   return chat.chattype ? chat.chatname : (chat.receiver[0].firstname + ' ' + chat.receiver[0].lastname)
}

function OngoingChats(props) {
    const [search, onSearchChange] = useState('');
    const chats = props.chats.length && props.chats.filter(e => !search || getname(e).match(new RegExp(search, "i")))
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
                            data={{ chat, _id:chats._id }}
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