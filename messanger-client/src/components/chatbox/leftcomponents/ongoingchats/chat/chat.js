import React from 'react';
import './chatstyle.css';

function getTimePeriod(t) {
    const time = new Date(t), current = new Date();
    const difference = (current.getTime() - time.getTime())/(1000*3600*24);
    return difference > 1 ? `${time.getDay()}/${time.getMonth()}` : `${time.getHours() > 12 ? time.getHours()-12 : time.getHours()}:${time.getMinutes()}`;
}

function Chat(props) {
    return (
        <div tabIndex="-1" onClick={props.onclick}>
            <div className="card" style={{backgroundColor: props.selectedchat ? '#ebebeb':null}}>
                <div className="dp">
                    <div style={{width: 49, height: 49}}>
                        <img src={'props.dp'} />
                    </div>
                </div>
                <div className="chatinfomation">
                    <div className="basic">
                        <div className="name"> 
                            <span> {props.data.chat.chattype ? props.data.chat.chatname : (props.data.chat.receiver[0].firstname + ' ' + props.data.chat.receiver[0].lastname)} </span>
                        </div>
                        <div className="activity" style={{marginRight: 18}}>
                            <span> {getTimePeriod(props.data.chat.updatedAt)} </span>
                        </div>
                    </div>
                    <div className="msgAndStatus">
                        <div className="lastmessage" style={{ marginTop: 4}}>
                            { props.data.chat.messages.length>0 ? (props.data.chat.chattype ? 
                                <React.Fragment>
                                    <span>{props.data.chat.messages.sender.firstname}</span>
                                    <span>: </span>
                                    <span>{props.data.chat.messages.message}</span>
                                </React.Fragment> :
                                <React.Fragment>
                                    <span style={{color: 'rgb(128, 134, 138)', fontSize: 14}}>{props.data.chat.messages[0].message}</span>
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