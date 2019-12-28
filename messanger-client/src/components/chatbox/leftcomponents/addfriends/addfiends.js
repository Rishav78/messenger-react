import React, { useState, useEffect } from 'react';
import Searchbar from '../searchbar/searchbar';
import Availableuser from './availableusers/availableusers';

async function getusers(props, cb) {
    const { io } = props;
    const Token = localStorage.getItem('Token1');
    if(!Token) return props.history.push('/');
    io.emit('search-new-friend', { Token }, ({authenticated, users}) => {
        if(!authenticated) return props.history.push('/');
        cb(users)
    })
}

function add(props, users, cb) {
    return  async function(_id) {
        const { io } = props;
        const Token = localStorage.getItem('Token1');
        if(!Token) return props.history.push('/');
        io.emit('add-new-friend', { Token, _id }, ({ success }) => {
            if(!success) return alert('failed');
            const newusers = users.filter(user => user._id !== _id);
            cb(newusers);
        });
    }
}

function Addfriends(props) {
    const [search, onChangeSearch] = useState('');
    const [users, onChangeUsers] = useState([]);

    useEffect(() => {
        getusers(props, onChangeUsers);
    },[])

    return (
        <div>
            <div>
                <Searchbar
                    placeholder="search here..."
                    onchange={onChangeSearch} />
            </div>
            <div>
                <div>
                    { users.map((user, i) => 
                        <Availableuser
                            key={i}
                            data={user}
                            onAdd={add(props, users, onChangeUsers)}
                        /> )
                    }
                </div>
            </div>
        </div>
    );
}

export default Addfriends;