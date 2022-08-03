import './Connections.scss';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import uniqid from 'uniqid';


function Connections(props) {
    const [connections, setConnections] = useState([]);
    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        axios.get(`http://localhost:8080/connections/${user.email}`)
        .then(res => {
            console.log(res.data);
            setConnections(res.data)
        })
    }, [])


    return (
        <section className='chats'>
            {connections.map(el => {
                return (
                    <div key={el.connection_id} className='connection'>
                         <p>{el.email_1 === user.email ? el.email_2 : el.email_1}</p>
                    </div>
                )
            })}
        </section>
    )
}


export default Connections;