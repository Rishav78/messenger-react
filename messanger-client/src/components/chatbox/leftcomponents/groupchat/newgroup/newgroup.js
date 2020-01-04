import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';
import DoneIcon from '@material-ui/icons/Done';
import Header from '../../Header/header';
import './newgroup.css';


async function fetchWrapper(url, method, body) {
    const Token = localStorage.getItem('Token1');
    const res = await fetch(url ,{ method, body,
        headers: {
            'Authorization': `Bearer ${Token}`
        }
    });
    const data = await res.json();
    return data;
}

function NewGroup(props) {

    const [subject, onChangeSubject] = useState('');
    const [image, onImageChange]  = useState(null);
    const [filename, onChangeName] = useState('');
    const imageinput = React.createRef();

    function changeImageTemp(input) {

        const files = input.target.files;
        onChangeName(files[0].name);
        if (files && files.length) {
            var fr = new FileReader();
            fr.onload = function (e) {
                onImageChange(e.target.result);
            }
            fr.readAsDataURL(files[0]);
        }
    }


    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
            <div>
                <Header
                    tittle="New group"
                    onBack={() => props.changeComponent(0)}
                    />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                <div 
                    onClick={(e) => imageinput.current.click() }
                    className="groupimage" 
                    style={{ width: 200, height: 200,  borderRadius: '50%', overflow: 'hidden', position: 'relative', cursor: 'pointer'}}>

                    <img alt="group" src={ image ? image : "http://localhost:8000/profilepicture/?id=whatApp_group.png"} style={{ width: '100%', height: '100%'}} />
                    <input ref={imageinput} onChange={changeImageTemp} name="filename" type="file" style={{display: 'none'}} />
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#333', opacity: 0.8}}>
                        <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                            <div style={{ marginBottom: 6}}>
                                <AddAPhotoSharpIcon
                                    style={{ color: 'white' }}
                                />
                            </div>
                            <div>
                                <div><span style={{ color: 'white' }}>change</span></div>
                                <div><span style={{ color: 'white' }}>Profile</span></div>
                                <div><span style={{ color: 'white' }}>Photo</span></div>
                            </div>
                        </div>
                    </div>
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