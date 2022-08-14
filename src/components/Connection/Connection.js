import './Connection.scss';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import avatar1 from '../../assets/Images/avatar1.svg';
import mailbox from '../../assets/Images/mailbox.svg';
import { API_URL } from '../../config/index.js';

function Connection({ el, setConnections }) {
    const [message, setMessage] = useState(() => []);
    const { user } = useAuth0();

    const deleteConnection = () => {
        axios.delete(`${API_URL}/connections/${el.connection_id}`)
            .then(res => {
                setConnections((prevConnections) => prevConnections.filter(connection => connection.connection_id !== el.connection_id))
            })
    }

    useEffect(() => {
        axios.get(`${API_URL}/messages/${el.connection_id}/last`)
            .then(res => {
                console.log("msg from call to back end", res.data)
                if (res.data[0] === null) {
                    let email = el.email_1 === user.email ? el.email_2 : el.email_1;
                    let msg = {
                        connection_id: el.connection_id,
                        content: `Send your first message to ${email}`,
                        message_id: "1000",
                        read: 1,
                        recipient_email: el.email,
                        sender_email: email,
                        sent_at: Date.now()
                    }
                    setMessage([msg])
                } else {
                    setMessage(res.data)
                }

            })
    }, [])

    let lastMessage = `Send your first message to ${el.email_1 === user.email ? el.email_2 : el.email_1}`;
    if (message[0] != null) {
        return (
            <div className='connection__wrapper'>
                <Link to={`/messages/${el.connection_id}`} key={el.connection_id} className='connection'>
                    <img className='connection__avatar' alt='avatar' src={avatar1} />
                    <div className='connection__text'>
                        <div>
                            <p className='connection__username'>{el.email_1 === user.email ? el.email_2 : el.email_1}</p>
                        </div>
                        <div className='connection__message'>
                            {(message[0].read === 0 && message[0].recipient_email === user.email) ? <img className='connection__notif' src={mailbox} alt='new message' /> : console.log("meg", message[0])}
                            <p className='connection__message-text'>{(message[0] == undefined) ? lastMessage : message[0].content}</p>
                        </div>
                    </div>
                </Link>
                <button onClick={() => deleteConnection()} className='connection__delete'>🗑️</button>
            </div>
        )
    }

}

export default Connection;