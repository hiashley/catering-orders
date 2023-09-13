import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItems from '../components/OrderItems';

export default function Orders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/getAllOrders') // Use the same endpoint path as in your server
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{padding:"3rem 3rem 0"}}>Orders</h1>
      {/* Render your component content using the fetched data */}
      {data.map((item) => (
        <div style={{padding:"0 3rem"}}>
          <OrderItems data={data} orderId={item.order_id} orderTotal={item.order_total} firstName={item.first_name} lastName={item.last_name} orderDate={item.OrderPlacedTime} requiredBy={item.ExpectedReadyTime} />
        </div>
      ))}
    </div>
  );
};
