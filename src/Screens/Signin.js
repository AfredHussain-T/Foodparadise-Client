import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from './api';

export default function Signin() {
    let navigate=useNavigate();
    const [credentials, setcreds] = useState({name:"",email:"",password:"",location:""})
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response= await fetch(`${BASE_URL}/api/createuser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.location})
            
        });
        
        const json=await response.json()
        
        if(!json.success){
            alert("Enter Valid Credtials")
        }
        if(json.success){
            navigate("/");
        }
    }
    const updatedCreds= (e)=>{
        setcreds({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" >Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={updatedCreds} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={updatedCreds} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={updatedCreds}/>
                        <div id="emailHelp" className="form-text">Enter a strong password. It must contain a special character and a numeric value in it.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress" className="form-label" >Current Address</label>
                        <input type="text" className="form-control" name='location' value={credentials.location} onChange={updatedCreds}/>
                    </div>
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/login" className="m-3 btn btn-warning">Existing User</Link>
                </form>
            </div>
        </>
    )
}
