import React from "react";

const orders = [
  { id: 101, product: "Paneer Butter Masala", customer: "John Doe", status: "Delivered" },
  { id: 102, product: "Chole Bhature", customer: "Jane Smith", status: "Pending" },
];

export default function RecentOrdersTable() {
  return (
    <div className="orders-table">
      <h3>Recent Orders</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.product}</td>
              <td>{o.customer}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
