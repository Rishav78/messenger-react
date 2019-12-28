import React from 'react';

function Header(props) {
    return(
        <header className="header">
            <div style={{flex: 1}}>
                <div style={{width: 40, height: 40, cursor: 'pointer'}}>
                    <img src={'props.img'} style={{borderWidth: '50%', width: '100%', height: '100%'}} />
                </div>
            </div>
            <div>

            </div>
        </header>
    );
}

export default Header;