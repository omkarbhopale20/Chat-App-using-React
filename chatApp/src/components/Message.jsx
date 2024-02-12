import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import {differenceInMinutes, differenceInDays, format} from "date-fns";

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const [timeAgo , setTimeAgo] = useState('');

  // useRef hook to scroll latest message in chat
  const ref = useRef();

  useEffect(() =>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message]);

  useEffect(() =>{
    if (message.date) {
      const messageDate = message.date.toDate();
      const now = new Date();
      const diffMinutes = differenceInMinutes(now, messageDate);
      const diffDays = differenceInDays (now, messageDate);

      if (diffMinutes < 1) {
        setTimeAgo('just now');
      } else if (diffMinutes < 60) {
        setTimeAgo(`${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`);
      } else if (diffDays === 0) {
        // Format time in 12-hour format with AM/PM
        setTimeAgo(format(messageDate, "h:mm a"));
        //setTimeAgo(`${messageDate.getHours()}:${messageDate.getMinutes()}`);
      }else if (diffDays === 1) {
        setTimeAgo('yesterday');
      } else {
        setTimeAgo(`${diffDays} day${diffDays !== 1 ? 's' : ''} ago`);
      }
    }
  },[message]);
  
  //console.log(message);
  return (
    <div ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img src= {
          message.senderId === currentUser.uid ?
          currentUser.photoURL :
          data.user.photoURL
        }
        alt="" />

        {/* just now changed to actual date */}
        <span>{timeAgo}</span>

      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img 
          src= {message.img}
          alt="" 
        />}
        
      </div>

    </div>
  )
}

export default Message
