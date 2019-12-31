import React from 'react';
import WelcomePage from './welcomepage/welcomepage';
import Chatprofile from './chatprofile/chatprofile';

function Right(props) {
    return (
        props.chat ? <Chatprofile
            chat={props.chat}
            updateLastMessage={props.updateLastMessage}
            io={props.io}
        /> : <WelcomePage />
    );
}

export default Right;