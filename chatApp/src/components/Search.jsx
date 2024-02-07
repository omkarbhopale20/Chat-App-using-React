import React, { useContext } from 'react'
import { collection, query, where,doc, getDoc,setDoc, updateDoc, getDocs, serverTimestamp } from "firebase/firestore";
import {db} from "../firebase"
import { useState } from "react";
import {AuthContext} from "../context/AuthContext"

const Search = () => {

  const [username , setUsername] = useState ("");
  const [user , setUser] = useState (null);
  const [err , setErr ] = useState (false);

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async() =>{
    const q = query(
      collection(db, "users"),
      where("displayName", "==",username)
    );

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      setUser(doc.data())    
      });
    }
    catch(err){
      setErr(true)
    }

    
  };
  

  const handleKey = (e) =>{
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async()=>{
    // check weather the group (chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try{
      const res =await getDoc(doc(db,"chats",combinedId));

      if(!res.exists()){
        //create chat in chats collection
        await setDoc(doc(db,"chats",combinedId),{messages: [] });

        //create user chats
        await updateDoc(doc(db,"userChats",currentUser.uid),{[combinedId+".userInfo"]:{
          uid:user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        }, 
        [combinedId+".date"]: serverTimestamp()         
        });

        await updateDoc(doc(db,"userChats",user.uid),{[combinedId+".userInfo"]:{
          uid:currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        },  
        [combinedId+".date"]: serverTimestamp()       
        });
      }
    }
    catch(err){
      setErr(true)
    }
    setUser(null);
    setUsername("");

  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder="Find user " onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}/>
      </div>

      {err && <span>User not Found !</span>}


      {/* change in code */}
      {/* { user && <div className='userChat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
            <span>{user.displayName}</span>
        </div>
      </div>} */}
      {user && user.displayName && user.photoURL && (
        <div className='userChats' key={user.uid} onClick={() => handleSelect(user)}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
          <span>{user.displayName}</span>
          </div>
        </div>
      )}


    </div>
  )
}

export default Search
