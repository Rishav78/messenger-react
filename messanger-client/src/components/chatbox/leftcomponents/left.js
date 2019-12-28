import React, { useState, useEffect } from 'react';
import OngoingChats from './ongoingchats/ongonigchats';
import Addfriends from './addfriends/addfiends';
import Startnewchat from './startnewchat/startnewchat';

function goToOngoingChat(props, cb) {
    return function(data) {
        props.onChatSelect(data);
        cb(0);
    }
}

function Left(props) {
    const [component, changeComponent] = useState(0);
    return(
        component == 0 ?
        <OngoingChats 
            io={props.io}
            onChatSelect={props.onChatSelect}
            changeComponent={changeComponent}
        /> : component == 1 ? 
        <Startnewchat
            io={props.io}
            onChatSelect={goToOngoingChat(props, changeComponent)}
        /> : <Addfriends
                io={props.io}
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
        
        
        */