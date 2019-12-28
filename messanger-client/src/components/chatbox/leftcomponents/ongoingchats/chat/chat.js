import React from 'react';
import './chatstyle.css';

function Chat(props) {
    return (
        <div tabIndex="-1" onClick={() => props.onclick(props.data._id)}>
            <div className="card">
                <div className="dp">
                    <div style={{width: 49, height: 49}}>
                        <img src={'props.dp'} />
                    </div>
                </div>
                <div className="chatinfomation">
                    <div className="basic">
                        <div className="name"> 
                            <span> {props.chattype ? props.data.chatname : (props.data.receiver[0].firstname + ' ' + props.data.receiver[0].lastname)} </span>
                        </div>
                        <div className="activity">
                            <span> {props.data.updatedAt} </span>
                        </div>
                    </div>
                    <div className="msgAndStatus">
                        <div className="lastmessage">
                            <span></span>
                            <span>:&nbsp;</span>
                            <span></span>
                        </div>
                        <div className="chatstatus"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;