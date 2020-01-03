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

    function createGroup(chatname) {
        props.createGroup({members, chatname});
        props.changeComponent(0)
    }

    return (
        members.length>0 && component===1 ?
        <NewGroup
            changeComponent={onChangeComponent}
            onDone={createGroup}
        /> :
        <GroupParticipants
            changeComponent={props.changeComponent}
            onDone={onDone}
        />
    );
}

export default GroupChat;