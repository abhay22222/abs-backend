const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointments", appointmentRoutes);



app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});