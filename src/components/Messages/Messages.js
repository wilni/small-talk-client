import './Messages.scss';

import avatar1 from '../../assets/Images/avatar1.svg';
// import avatar2 from '../../assets/Images/avatar2.svg';
// import avatar3 from '../../assets/Images/avatar3.svg';
// import avatar4 from '../../assets/Images/avatar4.svg';
// import avatar5 from '../../assets/Images/avatar5.svg';
// import avatar6 from '../../assets/Images/avatar6.svg';
import backArrow from '../../assets/Images/back_arrow_icon.svg';
import sendIcon from '../../assets/Images/send_icon.svg';
import ticTakToe from '../../assets/Images/tic-tac-toe.svg';
import GameModal from '../GameModal/GameModal.js';

import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import uniqid from 'uniqid';
const { io } = require("socket.io-client");

const socket = io.connect('http://localhost:8080');

socket.on('connect', () => {
    console.log(`socket conected ${socket.id}`);
})

function Messages({ match }) {
    const [messages, setMessages] = useState(() => []);
    const [showModal, setShowModal] = useState(false);
    const [connection, setConnection] = useState('');
    const bottomRef = useRef(null);
    const { user } = useAuth0();
    let history = useHistory();
    let connection_id = match.params.id;

    console.log("render before scroll")
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

    const handleClick = () => {
        console.log("clicked");
        setShowModal(true)
    }

    //functions for submitting messages from form submit and enter key press
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.message.value !== '') {
            let msg = {
                recipient_email: connection,
                sender_email: user.email,
                connection_id: connection_id,
                content: e.target.message.value,
                sent_at: Date.now(),
                message_id: uniqid()
            }
            socket.emit('send-message', { msg, connection_id });
            setMessages(prevMessages => [...prevMessages, msg])
            e.target.message.value = "";
            axios.post('http://localhost:8080/messages', msg).then(res => console.log(res))
        }

    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey && e.target.value !== '') {
            e.preventDefault();
            console.log("event ", e)
            let msg = {
                recipient_email: connection,
                sender_email: user.email,
                connection_id: connection_id,
                content: e.target.value,
                sent_at: Date.now(),
                message_id: uniqid()
            }
            socket.emit('send-message', { msg, connection_id });
            setMessages(prevMessages => [...prevMessages, msg])
            e.target.value = "";
            axios.post('http://localhost:8080/messages', msg).then(res => console.log(res))
        }
    }

    // side effect gets all messages and sets it on load
    //also sets name of connection displayed and joins socket room for connection 
    useEffect(() => {
        axios.get(`http://localhost:8080/messages/${connection_id}`)
            .then(res => {
                console.log("messages data", res.data);
                setMessages(res.data)
                socket.emit("join_room", connection_id);
            })
        axios.get(`http://localhost:8080/connection/${connection_id}`)
            .then(res => {
                console.log('res ffrom connection call', res.data[0]);
                if (res.data[0].email_1 === user.email) {
                    setConnection(res.data[0].email_2);
                } else {
                    setConnection(res.data[0].email_1);
                }
            })
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [])

    // side effect to recieve message
    useEffect(() => {
        const handler = (data) => {
            console.log("this is recieved message", data);
            setMessages(prevMessages => [...prevMessages, data])
        }
        socket.on('recieved-message', handler);
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        return () => {
            socket.off('recieved-message', handler);
        }
    }, [socket])

    //use effect for escape form modal if modal is open
    useEffect(() => {
        if (showModal) {
            document.addEventListener("keydown", handleKeydown);
        }
        return () => { document.removeEventListener('keydown', handleKeydown) }
    }, [showModal])

    const handleKeydown = (e) => {
        if (e.key === "Escape") {
            setShowModal(false);
        }
    }


    return (
        <>
            <div className='chatbox'>
                <div className='chatbox__nav'>
                    <img className='chatbox__nav-back-arrow' onClick={() => { history.push('/') }} src={backArrow} alt="back arrow" />
                    <img className='chatbox__nav-avatar' src={avatar1} alt="avatar" />
                    <p className='chatbox__nav-username'>{connection}</p>
                </div>
                <div className='chatbox__messages' id='scroll'>
                    {messages.map(msg => {
                        return (
                            <div key={msg.message_id} className={msg.sender_email === user.email ? 'chatbox__message chatbox__message--out' : 'chatbox__message  chatbox__message--in'}>
                                <p>{msg.content}</p>
                            </div>
                        )
                    })}
                    <div ref={bottomRef} />
                </div>
                <form className='chatbox__input' onSubmit={handleSubmit}>
                    <textarea
                        className='chatbox__input-text' name='message' placeholder='type your message' onKeyPress={handleKeyPress}>
                    </textarea>
                    <div className='chatbox__input-submit-holder'>
                        <input type='image' className='chatbox__input-submit' src={sendIcon} alt="submit"></input>
                    </div>
                </form>
            </div>
            <div className='chatbox-options' onClick={handleClick}>
                <img className='chatbox-options-img' alt='tic tak toe' src={ticTakToe} />
            </div>
            <GameModal
                show={showModal}
                onClose={(e) => { e.preventDefault(); setShowModal(false) }}
                socket={socket}
                connection_id={connection_id} 
                connection={connection}/>
        </>

    )
}



export default Messages;