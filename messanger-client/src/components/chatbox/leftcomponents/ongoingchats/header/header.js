import React, {useState, useEffect} from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

async function fetchWrapper(url) {
    const Token = localStorage.getItem('Token1');
    const res = await fetch(url ,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    });
    const data = await res.json();
    return data;
}

async function getUserInformation(io, onImageChange) {
    const url = 'http://localhost:8000/user';
    const { imageid } = await fetchWrapper(url);
    onImageChange(imageid);
}

function Header(props) {
    const [image, onImageChange]  = useState('#');
    useEffect(() => {
        const { io } = props;
        getUserInformation(io, onImageChange);
    },[props])

    return(
        <header className="header">
            <div style={{flex: 1}}>
                <div style={{width: 40, height: 40, cursor: 'pointer', borderRadius: '50%', overflow: 'hidden'}}
                    onClick={() => props.changeComponent(3)}
                >
                    <img alt="user" src={`http://localhost:8000/profilepicture/?id=${image}`} style={{borderWidth: '50%', width: '100%', height: '100%'}} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', paddingRight: 12}}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                    <ChatIcon
                        onClick={() => props.changeComponent(1)}
                        style={{ color: '#80868a', padding: 8, marginLeft: 8}}
                    />
                    <PersonAddIcon
                        onClick={() => props.changeComponent(2)}
                        style={{ fontSize: 28, color: '#80868a', padding: 8, marginLeft: 8}}
                    />
                    <MoreVertIcon
                        onClick={() => alert('under construction')}
                        style={{ fontSize: 28, color: '#80868a', padding: 8, marginLeft: 8}}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;