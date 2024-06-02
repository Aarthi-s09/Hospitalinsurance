const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Aarthis09:Aarthi1234@cluster0.kexotzh.mongodb.net/HospitalAppointment?retryWrites=true&w=majority&appName=Cluster00', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PolicySchema = new mongoose.Schema({
  id: Number,
  name: String,
  details: String,
  coverage: String,
  premium: String,
  referenceUrl: String,
});

const ClaimSchema = new mongoose.Schema({
  policyId: Number,
  description: String,
});

const Policy = mongoose.model('Policy', PolicySchema);
const Claim = mongoose.model('Claim', ClaimSchema);

// API endpoints
app.get('/api/policies', async (req, res) => {
  const policies = await Policy.find();
  res.json(policies);
});

app.post('/api/claims', async (req, res) => {
  const claim = new Claim(req.body);
  await claim.save();
  res.status(201).send('Claim submitted');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
