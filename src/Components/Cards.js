import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

function Cards(props) {
  const dispatch = useDispatchCart();
  const options = props.options;
  const data = useCart();
  const priceRef = useRef();
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  // Log the props and data to check if they are correct
  console.log("Props:", props);
  console.log("Cart Data:", data);

  const handleAddtoCart = async () => {
    let food = data.find(item => item.id === props.foodItem._id);

    if (food) {
      if (food.size === size) {
        // Update existing item
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
      } else {
        // Add new item with different size
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
      }
    } else {
      // Add new item
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
    }
  };

  const finalPrice = qty * (options[size] ? parseInt(options[size]) : 0);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, [priceOptions]);

  return (
    <div>
      <div className="card ms-1" style={{ width: '18rem', maxHeight: '380px', boxShadow: '0 4px 8px rgba(255, 255, 255, 0.5)' }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>

          <div className="container w-100">

            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(parseInt(e.target.value))}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>

            <div className='d-inline h-100 fs-5'>
              PKR: {finalPrice}/-
            </div>
          </div>

          <hr />
          <button className="btn btn-success justify-center ms-2" onClick={handleAddtoCart}>Add to Cart</button>

        </div>
      </div>
    </div>
  );
}

export default Cards;
