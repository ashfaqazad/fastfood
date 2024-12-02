import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        if (!email) return;

        try {
            const res = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const response = await res.json();
            console.log("Fetched Order Data:", response); // Console log the fetched data
            setOrderData(response);
        } catch (error) {
            console.error("Failed to fetch order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container mt-4'>
                <div className='row'>
                    {orderData && orderData.orderData && orderData.orderData.order_data.length > 0 ? (
                        orderData.orderData.order_data.slice(0).reverse().map((order, index) => (
                            <div key={index} className='col-12 mb-4'>
                                {order.map((item, idx) => (
                                    item.name ? ( // Check if item has a name to ensure it's a valid order item
                                        <div key={idx} className='card mb-3' style={{ maxWidth: '100%' }}>
                                            {item.Order_date && (
                                                <div className='card-header'>
                                                    <strong>{item.Order_date}</strong>
                                                    <hr />
                                                </div>
                                            )}
                                            <div className='row no-gutters'>
                                                <div className='col-md-4'>
                                                    <img src={item.img} className='card-img' alt={item.name} style={{ height: '120px', objectFit: 'cover' }} />
                                                </div>
                                                <div className='col-md-8'>
                                                    <div className='card-body'>
                                                        <h5 className='card-title'>{item.name}</h5>
                                                        <div className='d-flex justify-content-between'>
                                                            <span>{item.qty}</span>
                                                            <span>{item.size}</span>
                                                            <span>{item.price}/-</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null // Ignore items with only an _id field
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
