import React from 'react';
import WelcomePage from './welcomepage/welcomepage';
import Chatprofile from './chatprofile/chatprofile';

function Right(props) {
    return (
        props.chat ? <Chatprofile
            chat={props.chat}
            messages={props.messages}
            onChangeMessages={props.onChangeMessages}
            io={props.io}
        /> : <WelcomePage />
    );
}

export default Right;