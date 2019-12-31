import React, { useState, useEffect } from 'react';
import './chatstyle.css';

function getTimePeriod(t) {
    const time = new Date(t), current = new Date();
    const difference = (current.getTime() - time.getTime())/(1000*3600*24);
    return difference > 1 ? `${time.getDay()}/${time.getMonth()}` : `${time.getHours() > 12 ? time.getHours()-12 : time.getHours()}:${time.getMinutes()}`;
}

function Chat(props) {
    const [lastmessage, onChangeLastMessage] = useState({});
    const [lastupdate, onChangeLastUpdate] = useState('');

    props.io.on('new-message', (data) => {
        if(props.data.chat._id !== data._id) return;
        const { msg } = data;
        const message = {
            sender: msg.sender.firstname,
            message: msg.message
        };
        onChangeLastMessage(message);
        onChangeLastUpdate(getTimePeriod(msg.updatedAt))
    })

    useEffect(() => {
        if(props.data.chat.messages.length > 0) {
            const data = {
                sender: props.data.chat.messages[0].sender.firstname,
                message: props.data.chat.messages[0].message
            };
            onChangeLastMessage(data);
        }
        onChangeLastUpdate(getTimePeriod(props.data.chat.updatedAt))
    },[props])

    return (
        <div tabIndex="-1" onClick={props.onclick}>
            <div className="card" style={{backgroundColor: props.selectedchat ? '#ebebeb':null}}>
                <div className="dp">
                    <div style={{width: 49, height: 49, borderRadius: '50%', overflow: 'hidden'}}>
                        <img alt="user" style={{ width: '100%', height: '100%' }} src={`http://localhost:8000/profilepicture/?id=${props.data.chat.chattype ? props.data.chat.imageid : props.data.chat.receiver[0].imageid}`} />
                    </div>
                </div>
                <div className="chatinfomation">
                    <div className="basic">
                        <div className="name"> 
                            <span> {props.data.chat.chattype ? props.data.chat.chatname : (props.data.chat.receiver[0].firstname + ' ' + props.data.chat.receiver[0].lastname)} </span>
                        </div>
                        <div className="activity" style={{marginRight: 18}}>
                            <span> {lastupdate} </span>
                        </div>
                    </div>
                    <div className="msgAndStatus">
                        <div className="lastmessage" style={{ marginTop: 4}}>
                            { props.data.chat.messages.length>0 ? (props.data.chat.chattype ? 
                                <React.Fragment>
                                    <span>{lastmessage.sender}</span>
                                    <span>: </span>
                                    <span>{lastmessage.message}</span>
                                </React.Fragment> :
                                <React.Fragment>
                                    <span style={{color: 'rgb(128, 134, 138)', fontSize: 14}}>{lastmessage.message}</span>
                                </React.Fragment>
                            ) : null }
                        </div>
                        <div className="chatstatus"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;