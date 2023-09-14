import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/UI/LoadingSpinner';

export default function OrderDetails({ match }) {
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = match.params.orderId;

    // Make a GET request to your API endpoint
    axios.get(`/getOrderById/${orderId}`)
      .then((response) => {
        setOrderData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [match.params.orderId]);

  if (loading) {
    return <><LoadingSpinner/></>;
  }
console.log(orderData)
  return (
    <div>
<div>
      <h1>Order Details</h1>
      <p>Order ID: {orderData.order_id}</p>
      <p>Order Placed Time: {orderData.order.OrderPlacedTime}</p>
      <p>Expected Ready Time: {orderData.order.ExpectedReadyTime}</p>

      <h2>Items</h2>
      <ul>
        {orderData.order.Items.map((item, index) => (
          <li key={index}>
            {item.Description} - Quantity: {item.Quantity}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
