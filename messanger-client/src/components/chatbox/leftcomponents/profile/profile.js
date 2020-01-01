import React, {useState, useEffect} from 'react';
import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Header from '../Header/header'


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

function uploadImage(onImageChange) {
    return async function(input) {
        const image = Array.from(input.target.files);
        const form = new FormData();
        const url = 'http://localhost:8000/profilepicture';
        form.append("filename", image[0]);
        const { filename } = await fetchWrapper(url, 'POST', form);
        onImageChange(filename);
    }
}

async function getUserInformation(io, onChangeUser, onImageChange) {
    const url = 'http://localhost:8000/user';
    const user = await fetchWrapper(url);
    const { imageid } = user;
    onChangeUser(user);
    onImageChange(user.imageid);
}

function Profile(props) {
    const [showchangedp, onchange] = useState(false);
    const [image, onImageChange]  = useState('#');
    const [user, onChangeUser] = useState({});
    const imageinput = React.createRef();

    useEffect(() => {
        const { io } = props;
        getUserInformation(io, onChangeUser, onImageChange);
    },[props])

    return (
        <div>
            <Header
                    tittle="Profile"
                    onBack={props.changeComponent}
            />
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', position: 'relative', cursor: 'pointer'}}
                        onMouseOver={() => onchange(true)}
                        onMouseOut={() => onchange(false)}
                        onClick={(e) => imageinput.current.click() }
                    >
                        <input ref={imageinput} onChange={uploadImage(onImageChange)} name="filename" type="file" style={{display: 'none'}} />
                        <img alt="user" src={`http://localhost:8000/profilepicture/?id=${image}`} style={{ width: '100%', height: '100%'}} />
                        <span style={{ width: '100%', height: '100%', textAlign: 'center'}}>
                            {showchangedp ?
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)', position: 'absolute', zIndex: 100}}>
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
                                </div> : null
                            }
                        </span>
                    </div>
                </div>
                <div style={{ padding: '20px 20px', marginBottom: 18, boxShadow: '1px 1px 5px gray' }}>
                    <div>
                        <div style={{ marginBottom: 20}}>
                            <span style={{ color: '#00bfa5', fontSize: 15}}>Your Name</span>                            
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ flex: 1}}>
                                <span style={{ fontSize: 19}}>{user.firstname + ' ' + user.lastname}</span>
                            </div>
                            <div>
                                <span style={{cursor: 'pointer'}}
                                    onClick={() => alert('under construction')}
                                >
                                    <EditSharpIcon
                                        style={{ color: '#80868a'}}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;