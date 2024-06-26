import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { BASE_URL } from './api';

export default function Login() {
  const [credentials, setcreds] = useState({ email: "", password: "" })
  let navigate= useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json)
    if (!json.success) {
      alert("Enter Valid Credtials")
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authorize", json.authenticate);
      console.log(localStorage.getItem("authorize"));
      navigate("/")
    }
  }
  const updatedCreds = (e) => {
    setcreds({ ...credentials, [e.target.name]: e.target.value })
  }
  
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={updatedCreds} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={updatedCreds} />
          </div>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/signin" className="m-3 btn btn-warning">New User</Link>
        </form>
      </div>
    </>
  )
}
