import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import {db} from "../firebase"
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

  const [chats , setChats] = useState([])

  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)


  
  useEffect(() =>{

    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid ), (doc) => {
        setChats(doc.data());
      });
  
      return ()=> {
        unsub()
      };
    };

    currentUser.uid && getChats()
  },[currentUser.uid]);
  

  const handleSelect = (u) =>{
    if(u && u.displayName && u.photoURL ){
      dispatch({type:"CHANGE_USER", payload:u});
    }else{
      console.error("Invalid user object:", u);
    }
    
  };
  //console.log("Chats component - chats state:", chats); 
  
//{Object.entries(chats)?.map(chat=>(
  return (
    <div className='chats'> 
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
        chat[1] && (
        <div className='userChat' key={chat[0]} onClick={()=>handleSelect(chat[1])}>
          <img src={chat[1].photoURL}/>
          <div className="userChatInfo">
            <span>{chat[1].displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div> 
        )
      ))};
                   
    </div>
    
  );
}

export default Chats

