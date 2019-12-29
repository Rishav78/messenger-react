import React from 'react';

function Header(props) {
    return (
        <header className="header"  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', marginRight: 20}}>
                    <img style={{ width: '100%', height: '100%'}} src={`http://localhost:8000/profilepicture/?id=${props.data.chattype ? props.data.imageid : props.data.receiver[0].imageid}`} />
                </div>
            </div>
            <div>
                <div>
                    <div style={{ fontSize: 17, color: '#333' }}>
                        <span>{props.data.chattype ? props.data.chatname : (props.data.receiver[0].firstname + ' ' + props.data.receiver[0].lastname)}</span>
                    </div>
                    { props.data.chattype ? 
                        <div style={{marginTop: 4, fontSize: 14, color: '#9d9d9d'}}>
                            <span>{props.data.chatmembers.map( e => e.firstname).join(', ')}</span>
                        </div> : null
                    }
                </div>
            </div>
            <div>

            </div>
        </header>
    );
}

export default Header;