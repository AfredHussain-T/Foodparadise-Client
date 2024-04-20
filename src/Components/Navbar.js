import React, {useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';

import Cart from '../Screens/Cart';
import { useItem } from './context';
export default function Navbar() {
    const [cartView,setcartView] = useState(false);
    let data = useItem();
    const navigate= useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("authorize");
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">FoodParadise</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authorize")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/MyOrder">My Orders</Link>
                                </li> : ""
                            }

                        </ul>
                        {!(localStorage.getItem("authorize")) ?
                            <div className='d-flex'>

                                <Link className="btn bg-success text-white mx-1 active" to="/login">Login</Link>
                                <Link className="btn bg-danger text-white mx-1 active" to="/signin">Sign up</Link>

                            </div>
                            :
                            <div>
                                <div className='btn bg-white text-black mx-2' onClick={()=>{setcartView(true)}}>
                                    My Cart 
                                    
                                        {data.length!==0  && <Badge pill bg="danger"> {data.length} </Badge>}
                                </div>
                                {cartView? <Modal onClose={()=>setcartView(false)}><Cart/></Modal>:null}
                                <div className='btn bg-danger text-white mx-2' onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>}
                    </div>
                </div>
            </nav>

        </div>
    )
}
