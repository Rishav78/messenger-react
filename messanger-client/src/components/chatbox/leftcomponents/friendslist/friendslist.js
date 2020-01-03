import React, { useState, useEffect } from 'react';
import Friend from './friend/friend';

async function fetchWrapper(url, method = 'GET', body) {
    const Token = localStorage.getItem('Token1');
    const res = await fetch(url ,{
        method,
        body,
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    });
    const data = await res.json();
    return data;
}



function Friendslist(props) {

    const [friends, onChangeFriends] = useState([]);

    async function getfriends() {
        const url = 'http://localhost:8000/friends';
        const { friends } = await fetchWrapper(url);
        onChangeFriends(friends);
    }

    useEffect(() => {

        getfriends();

    })

    return (
        <div>
            {
                friends.filter(e => !props.filter || props.filter(e)).map((friend, i) => 
                    <Friend 
                        key={i}
                        data={friend}
                        onclick={() => props.onSelect(friend)}
                    />)
            }
        </div>
    );
}

export default Friendslist;