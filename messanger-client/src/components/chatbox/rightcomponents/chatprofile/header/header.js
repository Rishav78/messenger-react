import React from 'react';

function Header(props) {
    return (
        <header className="header">
            <div>
                <div style={{ width: 40, height: 40 }}>
                    <img src="asdfg" />
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