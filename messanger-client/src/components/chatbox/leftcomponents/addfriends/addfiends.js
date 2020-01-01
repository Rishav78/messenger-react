import React, { useState, useEffect } from 'react';
import Searchbar from '../searchbar/searchbar';
import Availableuser from './availableusers/availableusers';
import Header from '../Header/header';

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

async function getusers(cb) {
    const url = 'http://localhost:8000/friends/searchnew';
    const { users } = await fetchWrapper(url);
    cb(users);
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

function getname(user) {
    return user.firstname+' '+user.lastname;
}

function Addfriends(props) {
    const [search, onChangeSearch] = useState('');
    const [users, onChangeUsers] = useState([]);

    useEffect(() => {
        getusers(onChangeUsers);
    },[props])

    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column'}}>
            <div>
                <Header 
                    tittle="Add Friend"
                    onBack={props.changeComponent}
                />
            </div>
            <div>
                <Searchbar
                    placeholder="search here..."
                    onchange={onChangeSearch} />
            </div>
            <div style={{flex: 1, overflow: 'scroll'}}>
                <div>
                    { users.filter(e => !search || getname(e).match(new RegExp(search, "i"))).map((user, i) => 
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