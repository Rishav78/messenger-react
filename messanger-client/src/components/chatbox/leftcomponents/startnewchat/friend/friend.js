import React from 'react';

function Friend(props) {
    return (
        <div tabIndex="-1" onClick={() => props.onChatSelect(props.data._id)}>
            <div className="card">
                <div className="dp">
                    <div style={{width: 49, height: 49}}>
                        <img src={'props.dp'} />
                    </div>
                </div>
                <div className="userinfomation">
                    <div className="basic">
                        <div className="name"> 
                            <span> {props.data.firstname+' '+props.data.lastname} </span>
                        </div>
                    </div>
                    <div className="status">
                        <div>
                            <span>{"Hey there i'm using whatsapp"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Friend;