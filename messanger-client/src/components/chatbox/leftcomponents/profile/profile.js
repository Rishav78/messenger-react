import React, {useState} from 'react';
import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Header from '../Header/header'

function Profile(props) {
    const [showchangedp, onchange] = useState(false);
    return (
        <div>
            <Header
                    tittle="Profile"
                    changeComponent={props.changeComponent}
            />
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', position: 'relative'}}
                        onMouseOver={() => onchange(true)}
                        onMouseOut={() => onchange(false)}
                    >
                        <img src="sdf" style={{ width: '100%', height: '100%', position: 'absolute'}} />
                        <span style={{ width: '100%', height: '100%', textAlign: 'center'}}>
                            {showchangedp ?
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)'}}>
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
                                <span style={{ fontSize: 19}}>hii</span>
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