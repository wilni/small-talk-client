import './Messages.scss';

import avatar1 from '../../assets/Images/avatar1.svg';
// import avatar2 from '../../assets/Images/avatar2.svg';
// import avatar3 from '../../assets/Images/avatar3.svg';
// import avatar4 from '../../assets/Images/avatar4.svg';
// import avatar5 from '../../assets/Images/avatar5.svg';
// import avatar6 from '../../assets/Images/avatar6.svg';
import backArrow from '../../assets/Images/back_arrow_icon.svg';
import sendIcon from '../../assets/Images/send_icon.svg';

import {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import uniqid from 'uniqid';
const { io } = require("socket.io-client");

const socket = io.connect('http://localhost:8080');

socket.on('connect', () => {
    console.log(`socket conected ${socket.id}`);
})

function Messages({match}) {
        const [messages, setMessages] = useState(() => []);
        const [connection, setConnection] = useState('')
        const { user } = useAuth0();
        let history = useHistory();
        let connectionID = match.params.id;

        const handleSubmit = (e) => {
            e.preventDefault();
            let msg = {
                recipient_email: connection,
                sender_email: user.email,
                connection_id: connectionID,
                content: e.target.message.value,
                sent_at: Date.now(),
                message_id: uniqid()
            }
            socket.emit('send-message', {msg, connectionID});
            setMessages(prevMessages => [...prevMessages, msg])
            e.target.message.value = "";
            axios.post('http://localhost:8080/messages', msg).then(res => console.log(res))
        }

        // side effect gets all messages and sets it on load
        //also sets name of connection displayed and joins socket room for connection 
        useEffect(() => {
            axios.get(`http://localhost:8080/messages/${connectionID}`)
            .then(res => {
                console.log("messages data",res.data);
                setMessages(res.data)
                socket.emit("join_room", connectionID);
            })
            axios.get(`http://localhost:8080/connection/${connectionID}`)
            .then(res => {
                console.log('res ffrom connection call',res.data[0]);
                if(res.data[0].email_1 === user.email){
                    setConnection(res.data[0].email_2);
                }else{
                    setConnection(res.data[0].email_1);
                }
            })
        }, [])

        // side effect to recieve message
        useEffect(() => {
            const handler = (data) => {
                console.log("this is recieved message", data);
                setMessages(prevMessages => [...prevMessages, data])
            }
            socket.on('recieved-message', handler);
            return () => socket.off('recieved-message', handler);
        }, [socket])

    return (
        <div className='chatbox'>
            <div className='chatbox__nav'>
            <img className='chatbox__nav-back-arrow' onClick={() => {history.push('/')}} src={backArrow} alt="back arrow" />
            <img className='chatbox__nav-avatar' src={avatar1} alt="avatar"/>
            <p className='chatbox__nav-username'>{connection }</p>
            </div>
            <div className='chatbox__messages'>
            {messages.map(msg => {
                return (
                    <div key={msg.message_id} className={msg.sender_email === user.email ? 'chatbox__message chatbox__message--out' : 'chatbox__message  chatbox__message--in'}>
                        <p>{msg.content}</p>
                    </div>
                )
            })}
            </div>
            <form className='chatbox__input' onSubmit={handleSubmit}>
                <textarea className='chatbox__input-text' name='message' placeholder='type your message'></textarea>
                <div className='chatbox__input-submit-holder'>
                <input type='image' className='chatbox__input-submit' src={sendIcon}  alt="submit"></input>
                </div>
            </form>
        </div>
    )
}



export default Messages;