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

function Messages({match}) {
        const [messages, setMessages] = useState(() => []);
        const { user } = useAuth0();
        let history = useHistory();
        let connectionID = match.params.id;

        useEffect(() => {
            axios.get(`http://localhost:8080/messages/${connectionID}`)
            .then(res => {
                console.log("messages data",res.data);
                setMessages(res.data)
            })
        }, [])

    return (
        <div className='chatbox'>
            <div className='chatbox__nav'>
            <img className='chatbox__nav-back-arrow' onClick={() => {history.push('/')}} src={backArrow} alt="back arrow" />
            <img className='chatbox__nav-avatar' src={avatar1} alt="avatar"/>
            <p className='chatbox__nav-username'>{'Joe@aim.com'}</p>
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
            <div className='chatbox__input'>
                <textarea className='chatbox__input-text' placeholder='type your message'></textarea>
                <div className='chatbox__input-submit-holder'>
                <img className='chatbox__input-submit' src={sendIcon} alt="submit"/>
                </div>
            </div>
        </div>
    )
}



export default Messages;