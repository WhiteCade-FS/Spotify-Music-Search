require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const searchRoutes = require('./routes/search.js');




const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
console.log('searchRoutes is:', searchRoutes);
app.use('/search', searchRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});
