import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './src/config/db.js';
import configureRoutes from './src/routes/routes.js';
import seedSubjects from './src/seeder/subject-seeder.js';
import seedModules from './src/seeder/module-seeder.js';
import cors from "cors"
import fileUpload from "express-fileupload";
import seedSuperAdmin from './src/seeder/super-admin-seeder.js';
import cookieParser from 'cookie-parser';
import morgan from "morgan";

dotenv.config();


const app = express();

const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));




// CORS Configuration (Allow localhost:3000 and credentials)
app.use(
    cors({
      origin: `${process.env.FRONTEND_URI}` , // Allow frontend URL
      credentials: true, // Allow cookies, sessions, etc.
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","HEAD"],// Allowed request methods
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
  );

  
// Use cookie-parser middleware
app.use(cookieParser());


/**
 * Use Morgan for HTTP request and response logging
 * In a production environment, "combined" or "common" might be more suitable for comprehensive logging while serving requests.
 **/
app.use(morgan(process.env.LOGGING_FORMAT || "dev"));

configureRoutes(app);

app.listen(port, async() => {
    console.log(`Server connected on PORT: ${port}`);
    try{
        await connectDatabase();
        // await seedSubjects();
        // await seedModules();
        // await seedSuperAdmin();
    }catch(error){
        console.error(error,"Error or server initialization.")
    }
});