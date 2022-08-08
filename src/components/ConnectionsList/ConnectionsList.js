import './ConnectionsList.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
// import uniqid from 'uniqid';
import Connection from '../Connection/Connection.js';
import addFriendsIcon from '..//../assets/Images/add-friends.svg'
import uniqid from 'uniqid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ConnectionModal from '../ConnectionModal/ConnectionModal';
// import avatar1 from '../../assets/Images/avatar1.svg';
// import avatar2 from '../../assets/Images/avatar2.svg';
// import avatar3 from '../../assets/Images/avatar3.svg';
// import avatar4 from '../../assets/Images/avatar4.svg';
// import avatar5 from '../../assets/Images/avatar5.svg';
// import avatar6 from '../../assets/Images/avatar6.svg';


function ConnectionsList(props) {
    const [connections, setConnections] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth0();


    const notify = () => toast.error("User not found", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/connections/${user.email}`)
            .then(res => {
                setConnections(res.data)
            })
    }, [])


    //use effect for escape form modal if modal is open
    useEffect(() => {
        if(showModal){
            document.addEventListener("keydown", handleKeydown);
        }
        return () => { document.removeEventListener('keydown', handleKeydown) }
    }, [showModal])

    const handleKeydown = (e) => {
        if(e.key === "Escape"){
            setShowModal(false);
        }
    }


    const handleClick = () => {
        setShowModal(true)
    }

    const addConnection = (email) => {
        let newConnectionInfo = {
            connection_id: uniqid(),
            email_1: user.email,
            email_2: email
        }
        axios.post(`http://localhost:8080/connections`, newConnectionInfo)
            .then(res => {
                if (res.status === 201) {
                    setConnections(prevConnections => [...prevConnections, newConnectionInfo]);
                } else {
                    notify();
                }
            })
    }


    return (
        <>
            <section className='chats'>

                {connections.map(el => {
                    return (
                        <Connection key={el.connection_id} el={el} />
                    )
                })}
            </section>
            <div className='chats-options' onClick={handleClick}>
                <img className='chats-options-img' alt='add friends icon' src={addFriendsIcon} />
            </div>
            <ConnectionModal
                show={showModal}
                onClose={(e) => { e.preventDefault(); setShowModal(false) }}
                onSubmit={(e) => {
                    e.preventDefault();
                    let email = e.target.newConnection.value;
                    addConnection(email);
                    e.target.newConnection.value = "";
                    setShowModal(false);
                }} 
                />
        </>

    )
}


export default ConnectionsList;