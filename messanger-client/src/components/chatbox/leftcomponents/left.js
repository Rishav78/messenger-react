import React, { useState } from 'react';
import OngoingChats from './ongoingchats/ongonigchats';
import Addfriends from './addfriends/addfiends';
import Startnewchat from './startnewchat/startnewchat';
import Profie from './profile/profile';
import GroupChat from './groupchat/groupchat';

function goToOngoingChat(props, cb) {
    return function(chatno, _id) {
        props.onChatSelect(chatno, _id);
        cb(0);
    }
}

function Left(props) {
    const [component, changeComponent] = useState(0);
    return(
        component === 0 ?
        <OngoingChats 
            io={props.io}
            selectedchat={props.selectedchat}
            chats={props.chats}
            userlastmessage={props.userlastmessage}
            onChatSelect={props.onChatSelect}
            changeComponent={changeComponent}
        /> : component === 1 ? 
        <Startnewchat
            io={props.io}
            onChatSelect={goToOngoingChat(props, changeComponent)}
            changeComponent={changeComponent}
        /> : component === 2 ? 
        <Addfriends
                io={props.io}
                changeComponent={changeComponent}
            /> : component === 3 ?
        <Profie
            io={props.io}
            changeComponent={changeComponent}
        /> :
        <GroupChat 
            io={props.io}
            changeComponent={changeComponent}
        />

    )
}

export default Left;


/*
  

            */