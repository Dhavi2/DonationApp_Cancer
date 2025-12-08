const express = require("express")
const cors =  require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const donations = [ 
   { name: "Ashish", amount: 500 },
  { name: "Rahul", amount: 300 },
  { name: "Sneha", amount: 700 },
  { name: "Amit", amount: 400 },
  { name: "Priya", amount: 600 },
]
app.get("/donation",(req,res)=>{
    res.json({donations,message:"Getting data is working"})
})

app.listen(5000,()=>{
    console.log("Back Server running on port 5000")
})