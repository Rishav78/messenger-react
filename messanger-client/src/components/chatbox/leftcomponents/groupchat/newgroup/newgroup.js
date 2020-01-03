import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Header from '../../Header/header';


function NewGroup(props) {

    const [subject, onChangeSubject] = useState('');

    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
            <div>
                <Header
                    tittle="New group"
                    onBack={() => props.changeComponent(0)}
                    />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                <div style={{ width: 200, height: 200,  borderRadius: '50%', overflow: 'hidden'}}>
                    <img alt="group" src="" style={{ width: '100%', height: '100%'}} />
                </div>
            </div>
            <div style={{flex: 1}}>
                <div style={{ marginLeft: 30}}>
                    <TextField 
                        fullWidth
                        label="Group subject"
                        onChange={(e) => onChangeSubject(e.target.value)}
                        />
                </div>
                {
                    subject &&
                    <div style={{ paddingTop:28, textAlign:"center"}}>
                        <div
                            onClick={() => props.onDone(subject)} 
                            style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: 46, height: 46, borderRadius: '50%', backgroundColor: '#5cb85c', boxShadow: '1px 1px 5px #333', cursor: 'pointer'}}>
                            <DoneIcon
                                style={{ color: 'white' }}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default NewGroup;