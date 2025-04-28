const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sample route to test the backend
app.get('/api', (req, res) => {
  res.send({ message: "Hello from the backend!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
