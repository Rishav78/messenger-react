import React, {useState, useEffect} from 'react';

function Header(props) {

    const [useronline, onChangeUserOnline] = useState(false);
    const [usertyping, onChangeUserTyping] = useState(false);
    const [sendername, onChangeSenderName] = useState('');


    function userStatus(data) {
        if(props.data.chattype) return onChangeUserOnline(false);
        if(props.data.receiver[0]._id !== data._id) return;
        onChangeUserOnline(data.status);
    }

    function userTyping(data) {
        const {sender} = data;
        if(data._id !== props.data._id) return;
        if(props.data.chattype) onChangeSenderName(sender.firstname);
        onChangeUserTyping(data.status);
    }

    useEffect(() => {

        const { io } = props;
        io.on('user-status', userStatus);
        io.on('user-typing', userTyping);
        if(!props.data.chattype) {
            io.emit('user-status', { _id: props.data.receiver[0]._id }, function(data) {
                const { status } = data;
                onChangeUserOnline(status);
            });
        }

        return () => {

            io.off('user-typing', usertyping)
            io.off('user-status', userStatus)
        };

    },[props]);



    useEffect(() => {

        onChangeUserTyping(false);
        onChangeSenderName('');

    },[props]);


    return (
        <header className="header"  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', marginRight: 20}}>
                    <img alt="user" style={{ width: '100%', height: '100%'}} src={`http://localhost:8000/profilepicture/?id=${props.data.chattype ? props.data.imageid : props.data.receiver[0].imageid}`} />
                </div>
            </div>
            <div>
                <div>
                    <div style={{ fontSize: 17, color: '#333' }}>
                        <span>{props.data.chattype ? props.data.chatname : (props.data.receiver[0].firstname + ' ' + props.data.receiver[0].lastname)}</span>
                    </div>
                    { props.data.chattype ? 
                        usertyping ? 
                            <div style={{ color: '#5cb85c', fontSize: 14}}>
                                <span>{sendername}&nbsp;</span>
                                <span>is typing...</span>
                            </div>:
                            <div style={{marginTop: 4, fontSize: 14, color: '#9d9d9d'}}>
                                <span>You, {props.data.receiver.map( e => e.firstname).join(', ')}</span>
                            </div> : 
                            <div style={{ fontSize: 14}}>
                                {usertyping ?
                                <span style={{ color: '#5cb85c'}}>typing...</span> :
                                    useronline ?  
                                    <span style={{color: '#333'}}>online</span> :
                                    null
                        }
                        </div>
                    }
                </div>
            </div>
            <div>

            </div>
        </header>
    );
}

export default Header;


// status and typing events


// { props.data.chattype ? 
//     usertyping === 1 ? 
//         <div>
//             <span>{sendername}&nbsp;</span>
//             <span>typing...</span>
//         </div>:
//         <div style={{marginTop: 4, fontSize: 14, color: '#9d9d9d'}}>
//             <span>{props.data.chatmembers.map( e => e.firstname).join(', ')}</span>
//         </div> : 
//         <div style={{ fontSize: 14}}>
//             {usertyping === 1 ?
//             <span style={{ color: '#5cb85c'}}>typing...</span> :
//                 useronline === 1 ?  
//                 <span style={{color: '#333'}}>online</span> :
//                 null
//     }
//     </div>
// }