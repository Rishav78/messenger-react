import React, { useEffect, useState } from 'react';
import Searchbar from '../searchbar/searchbar';
import Header from '../Header/header';
import GroupChatIcon from './groupchaticon/groupchaticon';
import Friendslist from '../friendslist/friendslist';

function getname(friend) {
    return friend.firstname+' '+friend.lastname;
}

function Startnewchat(props) {
    const [friends, onChangeFriends] = useState([]);
    const [search, onChangeSearch] = useState('');

    function createChatRoom(friend) {
        const { _id } = friend;
        props.onChatSelect(null, _id);
    }

    function filter(friend) {
        const searchCondition = !search || getname(friend).match(new RegExp(search, "i"));
        return searchCondition;
    }


    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column'}}>
            <div>
                <Header
                    tittle="New Chat"
                    onBack={() => props.changeComponent(0)}
                    />
            </div>
            <div>
                <Searchbar
                    placeholder="Search here..."
                    onchange={onChangeSearch} />
            </div>
            <div>
                <GroupChatIcon
                    onclick={() => props.changeComponent(4)}
                />
            </div>
            <div style={{flex: 1, overflow: 'scroll'}}>
                <Friendslist
                    filter={filter}
                    onSelect={createChatRoom} />
            </div>
        </div>
    );
}


export default Startnewchat;