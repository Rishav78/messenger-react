import React from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function Header(props) {
    return(
        <header className="header">
            <div style={{flex: 1}}>
                <div style={{width: 40, height: 40, cursor: 'pointer'}}>
                    <img src={'props.img'} style={{borderWidth: '50%', width: '100%', height: '100%'}} />
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