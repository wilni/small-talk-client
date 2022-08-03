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
import axios from 'axios';


const fakemessages = [
    {
        sender: 'me',
        text: "hey how are you? ",
        id: 1
    }, 
    {
        sender: '',
        text: "good and you?",
        id:2
    }, 
    {
        sender: 'me',
        text: "good thank you for asking! ",
        id: 3
    }, 
    {
        sender: '',
        text: "what the hell do you want?",
        id:4
    }, 
    {
        sender: '',
        text: "Always asking for stuff",
        id:5
    },
    {
        sender: '',
        text: "Always asking for stuff",
        id:6
    },
    {
        sender: '',
        text: "Always asking for stuff",
        id:7
    }
]

function Messages({location}) {
        const [messages, setMessages] = useState([]);
        let history = useHistory();
        let urlPath = location.pathname;
        let connectionID = urlPath.split('').pop();

        useEffect(() => {
            axios.get(`http://localhost:8080/messages/${connectionID}`)
            .then(res => {
                console.log("conection data",res.data);
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
            {fakemessages.map(msg => {
                return (
                    <div key={msg.id} className={msg.sender === "me" ? 'chatbox__message chatbox__message--out' : 'chatbox__message  chatbox__message--in'}>
                        <p>{msg.text}</p>
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