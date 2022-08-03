import './Connections.scss';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import uniqid from 'uniqid';
import avatar1 from '../../assets/Images/avatar1.svg';
import avatar2 from '../../assets/Images/avatar2.svg';
import avatar3 from '../../assets/Images/avatar3.svg';
import avatar4 from '../../assets/Images/avatar4.svg';
import avatar5 from '../../assets/Images/avatar5.svg';
import avatar6 from '../../assets/Images/avatar6.svg';


function Connections(props) {
    const [connections, setConnections] = useState([]);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const handleClick = (connection_id) => {
        console.log(`clicked ${connection_id}`);

    }
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
                    <Link to={`/messages/${el.connection_id}`} key={el.connection_id} className='connection'>
                        <img className='connection__avatar' src={avatar1}/>
                        <div className='connection__text'>
                            <div>
                            <p className='connection__username'>{el.email_1 === user.email ? el.email_2 : el.email_1}</p>
                            <p></p>
                            </div>
                         <p className='connection__message'>{"The quick brown fox jumped over the lazy dog! "}</p>
                        </div>
                    </Link>
                )
            })}
        </section>
    )
}


export default Connections;