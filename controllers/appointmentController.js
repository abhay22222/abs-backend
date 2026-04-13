const db = require("../db");


exports.create = (req, res) => {
  const { patient_name, doctor_name, appointment_date, appointment_time, reason, fee } = req.body;

  
  if (!patient_name || !doctor_name || !appointment_date || !appointment_time || !fee) {
    return res.status(400).json({ error: "All required fields must be filled" });
  }

  
  const today = new Date().toISOString().split("T")[0];
  if (appointment_date < today) {
    return res.status(400).json({ error: "Appointment date cannot be in the past" });
  }


  if (fee <= 0) {
    return res.status(400).json({ error: "Fee must be greater than 0" });
  }

  const sql = `
    INSERT INTO appointments 
    (patient_name, doctor_name, appointment_date, appointment_time, reason, fee)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql,
    [patient_name, doctor_name, appointment_date, appointment_time, reason, fee],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Appointment Created ✅" });
    });
};



exports.getAll = (req, res) => {
  db.query("SELECT * FROM appointments ORDER BY appointment_date ASC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
};


exports.update = (req, res) => {
  const { patient_name, doctor_name, appointment_date, appointment_time, reason, status, fee } = req.body;

  const sql = `
    UPDATE appointments SET 
    patient_name=?, doctor_name=?, appointment_date=?, 
    appointment_time=?, reason=?, status=?, fee=? 
    WHERE appointment_id=?`;

  db.query(sql,
    [patient_name, doctor_name, appointment_date, appointment_time, reason, status, fee, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated Successfully ✅" });
    });
};

exports.delete = (req, res) => {
  db.query("DELETE FROM appointments WHERE appointment_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted Successfully ✅" });
    });
};