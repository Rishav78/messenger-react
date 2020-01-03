import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ClearIcon from '@material-ui/icons/Clear';
import Header from '../../Header/header';
import Friendslist from '../../friendslist/friendslist';

function getname(friend) {
    const { firstname, lastname } = friend;
    return firstname + ' ' + lastname;
}

function GroupParticipants(props) {
    const [search, onChangeSearch] = useState('');
    const [selected, onChangeSelected] = useState([]);

    function filter(friend) {
        const { _id } = friend;
        const searchCondition = !search || getname(friend).match(new RegExp(search, "i"));
        const alreadySelected = selected.filter(e => (e._id === _id)).length === 0;
        return searchCondition && alreadySelected;
    }

    function onSelect(friend) {
        
        const newSelectedList = [...selected, friend];
        onChangeSelected(newSelectedList);
    }

    function onUnselect(friend) {
        const { _id } = friend;
        const newSelectedList = selected.filter(e => e._id !== _id);
        onChangeSelected(newSelectedList);
    }

    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column'}}>
            <div>
                <Header
                    tittle="Add group participants"
                    onBack={() => props.changeComponent(1)}
                    />
            </div>
            <div style={{padding: '25px 0px 25px 25px'}}>
                <div>
                    {
                        selected.map( e => 
                            <div>
                                <div style={{ display: 'inline-flex' , flexDirection: 'row', borderRadius: 16, backgroundColor: '#f6f6f6'}}>
                                    <div style={{ width: 26, height: 26,borderRadius: '50%', overflow: 'hidden', marginRight: 12}}>
                                        <img src={`http://localhost:8000/profilepicture/?id=${e.imageid}`} style={{ width: '100%', height: '100%' }} />
                                    </div>
                                    <div style={{ flex: 1}} >
                                        <div style={{ display: 'flex', alignItems: 'center', height: '100%'}}>
                                            <span style={{ fontSize: 14}}>{getname(e)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            onClick={() => onUnselect(e)} 
                                            style={{ display: 'flex', alignItems: 'center', height: '100%', cursor: 'pointer'}}>
                                            <span style={{ margin: '8px 8px 4px 8px'}}>
                                                <ClearIcon 
                                                    style={{ fontSize: 14}}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div>
                    <TextField 
                        fullWidth
                        onChange={(e) => onChangeSearch(e.target.value)}
                        label="Type friend name" />
                </div>
            </div>
            <div style={{flex: 1, overflow: 'scroll'}}>
                <Friendslist
                    onSelect={onSelect}
                    filter={filter}
                />
            </div>
            {
                selected.length>0 && 
                <span 
                    onClick={() => props.onDone(selected)}
                    style={{ paddingTop:28, paddingBottom: 32, textAlign:"center", backgroundColor: '#f3f4f4'}}>
                    <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: 46, height: 46, borderRadius: '50%', backgroundColor: '#5cb85c', boxShadow: '1px 1px 5px #333', cursor: 'pointer'}}>
                        <ArrowForwardIcon
                            style={{ color: 'white' }}
                        />
                    </div>
                </span>
            }
        </div>
    );
}

export default GroupParticipants;