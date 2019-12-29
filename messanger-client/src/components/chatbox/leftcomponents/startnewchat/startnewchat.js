import React, { useEffect, useState } from 'react';
import Friend from './friend/friend';
import Searchbar from '../searchbar/searchbar';
import Header from '../Header/header';

function getname(friend) {
    return friend.firstname+' '+friend.lastname;
}

function getfriends(props, cb) {
    const { io } = props;
    const Token = localStorage.getItem('Token1');
    io.emit('get-friends', { Token }, data => {
        const { friends } = data;
        cb(friends);
    });
}

function createChatRoom(props) {
    return function(_id) {
        props.onChatSelect(null, _id);
    }
}

function Startnewchat(props) {
    const [friends, onChangeFriends] = useState([]);
    const [search, onChangeSearch] = useState('');
    useEffect(() => {
        getfriends(props, onChangeFriends);
    },[])
    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column'}}>
            <div>
                <Header
                    tittle="New Chat"
                    onBack={props.changeComponent}
                    />
            </div>
            <div>
                <Searchbar
                    placeholder="Search here..."
                    onchange={onChangeSearch} />
            </div>
            <div style={{flex: 1, overflow: 'scroll'}}>
                <div>
                {
                    friends.filter(e => !search || getname(e).match(new RegExp(search, "i"))).map((friend, i) => 
                        <Friend 
                            key={i}
                            data={friend}
                            onChatSelect={createChatRoom(props)}
                        />)
                }
                </div>
            </div>
        </div>
    );
}

export default Startnewchat;