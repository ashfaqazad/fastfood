import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../Components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className='text-center m-5'>
        <h3 className='text-white'>The Cart is Empty!</h3>
      </div>
    );
  }

  const handleCheckOut = async () => {
    if (data.some(item => !item.name || !item.qty || !item.size || !item.price)) {
      alert("Some items in the cart are incomplete. Please review your cart.");
      return;
    }
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='container mt-3'>
      <div className='table-responsive'>
        <table className='table table-hover text-white'>
          <thead className='fs-4'>
            <tr>
              <th scope='col' style={{ color: '#198754' }}>#</th>
              <th scope='col' style={{ color: '#198754' }}>Image</th>
              <th scope='col' style={{ color: '#198754' }}>Name</th>
              <th scope='col' style={{ color: '#198754' }}>Quantity</th>
              <th scope='col' style={{ color: '#198754' }}>Option</th>
              <th scope='col' style={{ color: '#198754' }}>Amount</th>
              <th scope='col' style={{ color: '#198754' }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="text-white">
                <th scope='row' style={{ color: 'white' }}>{index + 1}</th>
                <td>
                  <img src={food.img} alt={food.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                </td>
                <td style={{ color: 'white' }}>{food.name}</td>
                <td style={{ color: 'white' }}>{food.qty}</td>
                <td style={{ color: 'white' }}>{food.size}</td>
                <td style={{ color: 'white' }}>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='text-white'>
        <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        <button className='btn btn-success mt-3 mb-2' onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}
