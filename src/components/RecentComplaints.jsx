import React from "react";

const complaints = [
  { name: "John Doe", complaint: "Late delivery", img: "/assest/paneer.jpg" },
  { name: "Jane Smith", complaint: "Wrong product", img: "/assets/samosa.jpg" },
];

export default function RecentComplaints() {
  return (
    <div className="recent-complaints">
      <h3>Recent Complaints</h3>
      {complaints.map((c, idx) => (
        <div className="complaint-card" key={idx}>
          <img src={c.img} alt={c.name} />
          <div>
            <p className="name">{c.name}</p>
            <p className="text">{c.complaint}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
