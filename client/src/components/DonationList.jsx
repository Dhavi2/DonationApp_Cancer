import { useEffect, useState } from "react";

function DonationList() {
   const [donor, setDonor] = useState(null);
   const[total,setTotal] = useState(0);
  const loadDonor = async () => {
    try {
      const res = await fetch("http://localhost:5000/donation");
      const data = await res.json();

      // API data
      const donors = Array.isArray(data.donations) ? data.donations : [];


//total amount
const totalAmount = donors.reduce((sum,d)=> sum + d.amount,0);
setTotal(totalAmount)

      // Current index from localStorage
      let index = localStorage.getItem("donorIndex");
      index = index ? parseInt(index) : 0;

      // Reset if we reach end
      if (index >= donors.length) index = 0;

      // Set current donor
      setDonor(donors[index]);

      // Save next index for next refresh
      localStorage.setItem("donorIndex", index + 1);
    } catch (err) {
      console.log("Fetch Error:", err);
      setDonor(null);
    }
  };

  useEffect(() => {
    loadDonor();
  }, []);

  return (
    <> 
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      
      <tbody>
        {donor && (
          <tr>
            <td>{donor.name}</td>
            <td>{donor.amount}</td>
          </tr>
        )}
      </tbody>
    </table>
    <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        Total Donation:{total}
      </div>
    </>
  );
}


export default DonationList;
