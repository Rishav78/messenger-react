import React, {useState, useEffect} from 'react';

function Header(props) {

    // const [useronline, onChangeUserOnline] = useState(0);
    // const [usertyping, onChangeUserTyping] = useState(0);
    // const [sendername, onChangeSenderName] = useState('');

    // useEffect(() => {
    //     onChangeUserOnline(0);
    //     onChangeUserTyping(0);
    //     onChangeSenderName('');
    // },[props])


    // function userStatus(data) {
    //     if(props.data.chattype === true) return onChangeUserOnline(0);
    //     if(props.data.receiver[0]._id !== data._id) return console.log(props.data.receiver[0]._id, data._id);
    //     onChangeUserOnline(data.status);
    // }

    // function userTyping(data) {
    //     console.log(data._id, props.data._id)
    //     if(data._id !== props.data._id) return;
    //     const sender = props.data.receiver.filter( e => e._id === data.sender);
    //     if(props.data.chattype === 1) onChangeSenderName(sender.firstname+' '+sender.lastname);
    //     onChangeUserTyping(data.status);
    // }

    // useEffect(() => {
    //     props.io.on('user-status', userStatus);
    //     props.io.on('user-typing', userTyping);
    // },[])


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