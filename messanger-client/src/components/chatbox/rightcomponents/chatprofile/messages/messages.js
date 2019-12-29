import React from 'react';
import Message from './message/message';

function Messages(props) {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
            {
                props.messages.map( (e, i) => <Message key={i} data={e} />)
            }
        </div>
    );
}

export default Messages;