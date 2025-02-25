import express from 'express';
import cookieParser from 'cookie-parser'; // Import cookie-parser

const app = express();

// ...existing code...

app.use(cookieParser()); // Use cookie-parser middleware

// ...existing code...
