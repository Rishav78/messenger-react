import React, { useEffect, useState } from 'react';
import Friend from './friend/friend';
import Searchbar from '../searchbar/searchbar';

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
        const { io } = props;
        const Token = localStorage.getItem('Token1');
        io.emit('create-private-chat-room', { Token, _id }, data => {
            props.onChatSelect(data.chat._id);
        });
    }
}

function Startnewchat(props) {
    const [friends, onChangeFriends] = useState([]);
    useEffect(() => {
        getfriends(props, onChangeFriends);
    },[])
    return (
        <div>
            <div>
                <Searchbar
                    placeholder="Search here..."
                    onchange={(e) => console.log(e)} />
            </div>
            <div>
                {
                    friends.map((friend, i) => 
                        <Friend 
                            key={i}
                            data={friend}
                            onChatSelect={createChatRoom(props)}
                        />)
                }
            </div>
        </div>
    );
}

export default Startnewchat;