import './ConnectionsList.scss';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
// import uniqid from 'uniqid';
import Connection from '../Connection/Connection.js';

// import avatar1 from '../../assets/Images/avatar1.svg';
// import avatar2 from '../../assets/Images/avatar2.svg';
// import avatar3 from '../../assets/Images/avatar3.svg';
// import avatar4 from '../../assets/Images/avatar4.svg';
// import avatar5 from '../../assets/Images/avatar5.svg';
// import avatar6 from '../../assets/Images/avatar6.svg';


function ConnectionsList(props) {
    const [connections, setConnections] = useState([]);
    const { user } = useAuth0();

    // console.log("render connection")

    useEffect(() => {
        axios.get(`http://localhost:8080/connections/${user.email}`)
        .then(res => {
            console.log("conection data",res.data);
            setConnections(res.data)
        })
    }, [])


    return (
        <section className='chats'>
            {connections.map(el => {
                return (
                    <Connection key={el.connection_id} el={el}/>
                )
            })}
        </section>
    )
}


export default ConnectionsList;