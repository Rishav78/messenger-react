import React from 'react';
import MaterialIcon from 'material-icons-react';

function Availableuser(props) {
    console.log(props)
    return (
        <div tabIndex="-1">
            <div className="card">
                <div className="dp">
                    <div style={{width: 49, height: 49}}>
                        <img src={'props.dp'} />
                    </div>
                </div>
                <div className="userinfomation">
                    <div className="basic">
                        <div className="name"> 
                            <span> {props.data.firstname+' '+props.data.lastname} </span>
                        </div>
                    </div>
                    <div className="status">
                        <div>
                            <span>{"Hey there i'm using whatsapp"}</span>
                        </div>
                    </div>
                </div>
                <div className="add">
                    <div className="addicon" onClick={() => props.onAdd(props.data._id)}>
                        <MaterialIcon
                            icon={"add"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Availableuser;