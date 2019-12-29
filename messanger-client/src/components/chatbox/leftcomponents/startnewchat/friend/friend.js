import React from 'react';

function Friend(props) {
    console.log(props.data)
    return (
        <div tabIndex="-1" onClick={() => props.onChatSelect(props.data._id)}>
            <div className="card">
                <div className="dp">
                    <div style={{width: 49, height: 49, borderRadius: '50%', overflow: 'hidden'}}>
                        <img style={{width: '100%', height: '100%'}} src={`http://localhost:8000/profilepicture/?id=${props.data.imageid}`} />
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