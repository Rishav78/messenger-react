import React from 'react';
import WelcomePage from './welcomepage/welcomepage';
import Chatprofile from './chatprofile/chatprofile';

function Right(props) {
    return (
        props.chat ? <Chatprofile
            chat={props.chat}
            io={props.io}
            messages={props.messages}
            onChangeMessages={props.onChangeMessages}
        /> : <WelcomePage />
    );
}

export default Right;

/*<WelcomePage />*/