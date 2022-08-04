import './Connection.scss';
import {Link} from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import avatar1 from '../../assets/Images/avatar1.svg';

function Connection({el}){
    const [message, setMessage] = useState([]);
    const { user } = useAuth0();


    useEffect(() => {
        axios.get(`http://localhost:8080/messages/${el.connection_id}/last`)
        .then(res => {
            console.log(`last message data from connection ${el.connection_id}`,res.data);
            setMessage(res.data)
        })
    }, [])

    let lastMessage = `Send your first message to ${el.email_1 === user.email ? el.email_2 : el.email_1}`;
    return(
        <Link to={`/messages/${el.connection_id}`} key={el.connection_id} className='connection'>
        <img className='connection__avatar' alt='avatar' src={avatar1}/>
        <div className='connection__text'>
            <div>
            <p className='connection__username'>{el.email_1 === user.email ? el.email_2 : el.email_1}</p>
            </div>
         <p className='connection__message'>{ (message[0] == undefined) ? lastMessage: message[0].content}</p>
        </div>
    </Link>
    )
}

export default Connection;