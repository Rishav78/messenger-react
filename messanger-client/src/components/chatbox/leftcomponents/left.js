import React, { useState } from 'react';
import OngoingChats from './ongoingchats/ongonigchats';
import Addfriends from './addfriends/addfiends';
import Startnewchat from './startnewchat/startnewchat';
import Profie from './profile/profile';

function goToOngoingChat(props, cb) {
    return function(chatno, _id) {
        props.onChatSelect(chatno, _id);
        cb(0);
    }
}

function Left(props) {
    const [component, changeComponent] = useState(0);
    return(
        <Startnewchat
            io={props.io}
            onChatSelect={goToOngoingChat(props, changeComponent)}
            changeComponent={changeComponent}
        />         

    )
}

export default Left;


/*

            */