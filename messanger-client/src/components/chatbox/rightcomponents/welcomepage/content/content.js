import React from 'react';
import './content.css';

export default function Content(){
    return(
        <div className="contentcontainer">
            <div>
                <img alt="welcome" src='http://localhost:8000/static/intro-connection_c98cc75f2aa905314d74375a975d2cf2.jpg' />
            </div>
            <div>
                <div>
                    <h1>Keep your phone connected</h1>
                </div>
                <div>
                    <span>
                        WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.
                    </span>
                </div>
            </div>
        </div>
    );
}