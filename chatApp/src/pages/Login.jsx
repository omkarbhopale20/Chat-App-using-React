import React ,{useState}from "react"
import { useNavigate,Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

  const [err,setErr] = useState(false);

  const navigate = useNavigate();


  // Logs in user if already registed using firebase auth
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const email = (e.target[0].value);
    const password = (e.target[1].value);

    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    }
    catch (err){
      setErr(true);
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
            
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <input style={{display:"none"}} type="file" id="file"/>
            
            <button>Sign In</button>
            {err && <span>Someting went Wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login