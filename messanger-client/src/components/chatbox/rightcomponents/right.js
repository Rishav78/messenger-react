import React, {useEffect} from 'react';
import WelcomePage from './welcomepage/welcomepage';
import Chatprofile from './chatprofile/chatprofile';

function Right(props) {
    useEffect(() => console.log(props))
    return (
        props.chat ? <Chatprofile
            chat={props.chat}
            io={props.io}
        /> : <WelcomePage />
    );
}

export default Right;

/*<WelcomePage />*/