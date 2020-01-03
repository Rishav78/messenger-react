import React, { useState } from 'react';
import GroupParticipants from './groupparticipants/groupparticipants';
import NewGroup from './newgroup/newgroup';

function GroupChat(props) {
    const [members, onChangeMembers] = useState([]);
    const [component, onChangeComponent] = useState(0);

    function onDone(selected) {
        const members = selected.map( e => e._id );
        onChangeMembers(members);
        onChangeComponent(1);
    }

    return (
        members.length>0 && component===1 ?
        <NewGroup
            changeComponent={onChangeComponent}
        /> :
        <GroupParticipants
            changeComponent={props.changeComponent}
            onDone={onDone}
        />
    );
}

export default GroupChat;