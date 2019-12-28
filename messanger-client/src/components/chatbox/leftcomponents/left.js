import React, { useState, useEffect } from 'react';
import OngoingChats from './ongoingchats/ongonigchats';
import Addfriends from './addfriends/addfiends';
import Startnewchat from './startnewchat/startnewchat';

function Left(props) {
    const [chats, setchats] = useState(true);
    return(
        <OngoingChats 
            io={props.io}
            onChatSelect={props.onChatSelect}
        /> 
    )
}

export default Left;


/* <OngoingChats 
            io={props.io}
            onChatSelect={props.onChatSelect}
        /> */


        /*<Addfriends
            io={props.io}
        />
        <Startnewchat
            io={props.io}
            onChatSelect={props.onChatSelect}
        />
        
        */