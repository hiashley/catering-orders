import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItems from '../components/OrderItems';
import LoadingSpinner from '../components/UI/LoadingSpinner';

export default function Orders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/getAllOrders')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Function to format the date and time to 12-hour format (AM/PM)
  const formatDateTime = (dateTimeString) => {
    const year = dateTimeString.slice(0, 4);
    const month = dateTimeString.slice(4, 6);
    const day = dateTimeString.slice(6, 8);
    const hour = dateTimeString.slice(9, 11);
    const minute = dateTimeString.slice(12, 14);

    // Convert to 12-hour format (AM/PM)
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12 AM

    return (
      <div>
        <span>{`${month}-${day}-${year}`}</span>
        <br />
        <span>{`${hour12}:${minute} ${ampm}`}</span>
      </div>
    );
  };

  if (loading) {
    return <><LoadingSpinner/></>;
  }

  return (
    <div>
      <h1 style={{ padding: "3rem 3rem 0" }}>Orders</h1>
      {data.map((item) => (
        <div style={{ padding: "0 3rem" }} key={item.order_id}>
          <OrderItems
            data={data}
            orderId={item.order_id}
            orderTotal={item.order_total}
            firstName={item.first_name}
            lastName={item.last_name}
            orderDate={formatDateTime(item.OrderPlacedTime)} // Format the date and time here
            requiredBy={formatDateTime(item.ExpectedReadyTime)}
            locationCity={item.location.location_city}
            plumId={item.location.plum_site_id}
          />
        </div>
      ))}
    </div>
  );
}
