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
import simonImg from '../../assets/Images/simon_game.svg';
import hangmanImg from '../../assets/Images/hangman.svg';
import GameModal from '../GameModal/GameModal.js';

import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import uniqid from 'uniqid';
import { API_URL } from '../../config/index.js';
const { io } = require("socket.io-client");



const socket = io.connect(`${API_URL}`);

socket.on('connect', () => {
    console.log(`socket conected ${socket.id}`);
})

function Messages({ match }) {
    const [messages, setMessages] = useState(() => []);
    const [showModal, setShowModal] = useState(false);
    const [connection, setConnection] = useState('');
    const [gameLaunced, setGameLaunced] = useState("Tic-Tac-Toe")
    const bottomRef = useRef(null);
    const { user } = useAuth0();
    let history = useHistory();
    let connection_id = match.params.id;

    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

    const handleClick = (e) => {
        setGameLaunced(e.target.alt)
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
            axios.post(`${API_URL}/messages`, msg).then(res => console.log(res))
        }

    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey && e.target.value !== '') {
            e.preventDefault();
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
            axios.post(`${API_URL}/messages`, msg)
        }
    }

    // side effect gets all messages and sets it on load
    //also sets name of connection displayed and joins socket room for connection 
    useEffect(() => {
        axios.get(`${API_URL}/messages/${connection_id}`)
            .then(res => {
                setMessages(res.data)
                socket.emit("join_room", connection_id);
            })
        axios.get(`${API_URL}/connections/${connection_id}/id`)
            .then(res => {
                if (res.data[0].email_1 === user.email) {
                    setConnection(res.data[0].email_2);
                } else {
                    setConnection(res.data[0].email_1);
                }
            })
        const handler = (data) => {
            setMessages(prevMessages => [...prevMessages, data])
        }
        socket.on('recieved-message', handler);
        return () => {
            socket.off('recieved-message', handler);
        }
    }, [])

    // side effect to scroll to bottom on every render
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        //get last message and see if it was sent from connection
        axios.get(`${API_URL}/messages/${connection_id}/last`)
            .then(res => {
                let lastMsg = res.data[0];
                if (lastMsg.recipient_email === user.email) {
                    axios.put(`${API_URL}/messages/${connection_id}`, { connection_id: connection_id })
                }
            })
        //mark last message as read
    })

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
            <div className='chatbox-options' onClick={(e) => handleClick(e)}>
                <h3 className='chatbox-options__title'>Games!</h3>
                <hr></hr>
                <div className='chatbox-options__games'>
                    <img className='chatbox-options-img' alt='Tic-Tak-Toe' src={ticTakToe} />
                    <img className='chatbox-options-img' alt='Simon' src={simonImg} />
                    <img className='chatbox-options-img' alt='Hangman' src={hangmanImg} />
                </div>
            </div>
            <GameModal
                show={showModal} setShowModal={setShowModal}
                onClose={(e) => { e.preventDefault(); setShowModal(false) }}
                socket={socket}
                connection_id={connection_id}
                connection={connection}
                gameLaunced={gameLaunced}
            />

        </>

    )
}



export default Messages;