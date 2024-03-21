import React,{useEffect, useState,useRef} from 'react';
import { useDispatchCard,useCart } from '../component/ContextReducer';
export default function Card(props) {
  let dispatch= useDispatchCard();
 let data=useCart();
 const priceRef=useRef();
  let options = props.options;
  console.log(options);
  let priceOptions = Object.keys(options);

 const [qty,setQty]=useState(1)
 const [size,setSize]=useState("")
const   handleCart =async()=>{
  await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalprice,qty:qty,size:size})
  await console.log(data)
}
 
let finalprice=qty * parseInt(options[size]);
useEffect(()=>{
  setSize(priceRef.current.value)
},[])
  return (
    <div>
      <div className="card "  >
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{props.foodDes}</p>
        </div>

        <div className='container w-100' > </div>
        <div>
          <select className='m-2 h-50 bg-success rounded' onChange={(e)=>setQty(e.target.value)} >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i}>{i + 1}</option>
              )
            })}

          </select>
          <select className='m-2 h-50 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
            {priceOptions.map((data) => {
              return (<option key={data} value={data}>{data}</option>)
            })}
          </select>
          <div className='d-inline fs-5'>{finalprice}</div>
      </div>
          <hr>
          </hr>
          <button  className="btn btn-success justify-centre ms-2"  onClick={handleCart}>Add to Cart</button>

    </div>
        </div>
  )
}
