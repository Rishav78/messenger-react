import React from 'react';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import './groupchaticon.css';

function GroupChatIcon(props) {
    return (
        <div 
            onClick={props.onclick}
            id="gpiconWraper" 
            style={{ display: 'flex', flexDirection: 'row', height: 72, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px 10px'}}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, backgroundColor: '#128c7e', borderRadius: '50%'}}>
                    <span>
                        <GroupAddIcon
                            style={{ fontSize: 30, color: 'white' }} 
                        />
                    </span>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1}}>
                <div style={{ flex: 1 }}>
                    <span> New group </span>
                </div>
            </div>
        </div>
    )
}

export default GroupChatIcon;