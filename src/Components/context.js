
import React, { createContext,useContext, useReducer } from 'react'
const itemStateContext= createContext();
const itemDispatch=createContext();

const reducer= (state,action)=>{
    switch(action.type){
        case "ADD":
            return [...state,{id:action.id, name:action.name, qty:action.qty, size:action.size, price:action.price, image:action.image}]
        case "REMOVE":
            let remVal=[...state]
            remVal.splice(action.index,1)
            return remVal;
        case "UPDATE":
            let arr = [...state]
            arr.find((food,index)=>{
                if(food.id === action.id){
                    console.log(food.qty, parseInt(action.qty),action.price,food.price)
                    arr[index]= {...food, qty: parseInt(action.qty)+food.qty, price: action.price+food.price}
                }
                return arr
            })
            return arr
        case "DROP":
            let empArr=[]
            return empArr
        default:
            console.log("Error")
    }
}
export const ItemProvider=({children})=>{

    const [state, dispatch] = useReducer(reducer,[])
    return(
        <itemDispatch.Provider value={dispatch}>
            <itemStateContext.Provider value={state}>
                {children}
            </itemStateContext.Provider>
        </itemDispatch.Provider> 
        )
    
}
export const useItem=()=> useContext(itemStateContext);
export const useDispatchItem=()=>useContext(itemDispatch);

