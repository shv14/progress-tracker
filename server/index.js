const express = require('express');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const cors = require('cors');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');
// const projectRoutes = require('./routes/projectRoutes');

// require('dotenv').config();

// const app = express();
// connectDB();

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/api/projects', projectRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
