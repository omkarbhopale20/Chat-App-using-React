import React, { useState } from "react"
import Add from '../images/addAvatar.png'
import {  createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {auth,storage,db} from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link} from "react-router-dom";

const Register = () => {

  const [err,setErr] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const displayName = (e.target[0].value);
    const email = (e.target[1].value);
    const password = (e.target[2].value);
    const file = (e.target[3].files[0]);

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
  
    (error) => {
      setErr(true);
    }, 
    () => {
    // Handle successful uploads 
    //  get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await updateProfile(res.user,{
        displayName,  
        photoURL:downloadURL,
      });

      // Registered users are stored in "users" database in firabase so that current user can find other users and chat with them

      await setDoc(doc(db, "users" , res.user.uid),{
        uid: res.user.uid,
        displayName,
        email,
        photoURL:downloadURL,
      });

      //when registered userChats collection is created for it
      await setDoc(doc(db,"userChats",res.user.uid),{});

      navigate("/")

    });
  }
);
  
    }
    catch(err){
      setErr(true);
    }

  }


  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="displayName"/>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <input style={{display:"none"}} type="file" id="file"/>
            <label htmlFor="file">
                <img src={Add} alt=""/>
                <span>Add an avatar</span>
            </label>
            <button>Sign Up</button>
            {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register