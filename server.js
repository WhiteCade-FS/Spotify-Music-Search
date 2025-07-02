require('dotenv').config();
console.log('NODE_ENV:', process.env.NODE_ENV);
const express = require('express');
const cors = require('cors');
const authRoutes = require('./server/routes/auth.js');
const searchRoutes = require('./server/routes/search.js');




const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/search', searchRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});
