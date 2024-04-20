import React, {useEffect, useRef, useState} from 'react'
import { useDispatchItem, useItem } from './context';

export default function Item(props) {
    let dispatch=useDispatchItem();
    let data= useItem();
    let options=props.options;
    const priceRef = useRef();
    let priceVar=Object.keys(options);
    
    const [qty, setqty] = useState(1);
    const [size, setsize] = useState("");
    // let fosod=props.foodItems;
    const handleCart=async ()=>{
        let food=[]
        for(const item of data){
            if(item.id === props.foodName._id){
                food=item;
                break;
            }
        }
        if(food !==[]){
            if(food.size === size){
                await dispatch({type: "UPDATE", id: props.foodName._id, price:finalPrice, qty:qty})
                return;
            }
            else if( food.size !== size){
                await dispatch({type:"ADD",id:props.foodName._id, name: props.foodName.name, price: finalPrice, qty:qty,size:size})
                return;
            }
        }
        await dispatch({type:"ADD",id:props.foodName._id, name: props.foodName.name, price: finalPrice, qty:qty,size:size})
        
    }
    let finalPrice = qty * parseInt(options[size]);
    
    useEffect(()=>{
        setsize(priceRef.current.value)
    },[])
    return (
        
            <div>
                <div className="card mt-4" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodName.image} className="card-img-top" alt="..." style={{height: "170px",objectFit:"fill"}} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName.name}</h5>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-warning rounded' onChange={(e)=> setqty(e.target.value)}>
                                {Array.from(Array(5), (e, i) => {
                                    return (<option key={i + 1} value={i + 1}>{i + 1}</option>)
                                })

                                }
                            </select>
                            <select className='m-2 h-100 bg-warning rounded' ref={priceRef} onChange={(e)=> setsize(e.target.value)}>
                                {priceVar.map((cost)=>{
                                    return <option key={cost} value={cost}>{cost}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5 fst-italic'>
                            ₹{finalPrice}/-
                            </div>
                        </div>
                        {/* <hr></hr> */}
                        <button className={'btn btn-warning justify-center ms-2'}  onClick={handleCart}> Add To Cart</button>

                    </div>
                </div>
            </div>
        
    )
}
