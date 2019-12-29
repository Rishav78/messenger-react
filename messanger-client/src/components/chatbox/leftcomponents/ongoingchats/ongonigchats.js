import React, {useEffect, useState} from 'react';
import Header from './header/header';
import Searchbar from '../searchbar/searchbar';
import Chat from './chat/chat';

function getname(chat) {
   return chat.chattype ? chat.chatname : (chat.receiver[0].firstname + ' ' + chat.receiver[0].lastname)
}

function OngoingChats(props) {
    const [search, onSearchChange] = useState('');
    const chats = props.chats && props.chats.chats.filter(e => !search || getname(e).match(new RegExp(search, "i")))
    console.log(chats)
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
                    chats ? chats.map((chat, i) => 
                        <Chat 
                            key={i}
                            data={{ chat, _id:chats._id }}
                            onclick={ () => props.onChatSelect(i)}
                            selectedchat={props.selectedchat === i}
                        />) : null
                }
            </div>
        </div>
    );
}

export default OngoingChats;