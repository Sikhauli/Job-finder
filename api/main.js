const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require('path');

//ROUTES
const jobsRoutes = require('./src/api/routes/jobsRoutes');
const authRoutes = require('./src/api/routes/authRoutes'); 
const experienceRoutes = require('./src/api/routes/experienceRoutes')
const educationRoutes = require('./src/api/routes/educationRoutes')
const saveRoutes = require('./src/api/routes/saveRoutes')

dotenv.config();

const port = process.env.PORT || 1960;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.disable('x-powered-by');

// origin: 'https://job-finder-bhg5.onrender.com',


const corsOptions = {
    origin: 'https://job-finder-bhg5.onrender.com',
    credentials: true,
};

//cors middleware
app.use(cors(corsOptions));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

app.use((req, res, next) => {
    next();
});

// Route middlewares
app.use("/api/user", authRoutes); 
app.use("/api/jobs", jobsRoutes);
app.use("/api/experience", experienceRoutes); 
app.use("/api/education", educationRoutes);
app.use("/api/save", saveRoutes);



