
const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const jobsRoutes = require('./src/api/routes/jobsRoutes');
const authRoutes = require('./src/api/routes/authRoutes'); 
// const experienceRoutes = require('./src/api/routes/experienceRoutes')
// const educationRoutes = require('./src/api/routes/educationRoutes')
// const accomplishmentRoutes = require('./src/api/routes/accomplishmentRoutes')
// const certificationRoutes = require('./src/api/routes/certificationRoutes')

dotenv.config();

const port = process.env.PORT || 1960;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.disable('x-powered-by');


//cors middleware
app.use(cors());

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

// Route middlewares
app.use("/api/auth", authRoutes); 
app.use("/api/jobs", jobsRoutes);
// app.use("/api/experience", experienceRoutes); 
// app.use("/api/education", educationRoutes);
// app.use("/api/accomplishment", accomplishmentRoutes);
// app.use("/api/certification", certificationRoutes);



