import React from 'react';

function Message(props) {
    return (
        <div>
            <span> {props.data.message} </span>
        </div>
    )
}

export default Message;