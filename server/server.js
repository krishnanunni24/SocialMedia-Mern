import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv"
import session from 'express-session';

dotenv.config()

const port = process.env.PORT
const app = express();

//middlewares
// Parse JSON requests
app.use(bodyParser.json());
// Parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: false }));

// Increase request size limit to 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//initialize session and passport
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


// Enable Cross-Origin Resource Sharing
app.use(cors());

//routes
import connect from './src/infrastructure/config/mongoose.js';
import AuthRoute from "./src/adapters/express/routes/authRoute.js" 
import AdminRoute from './src/adapters/express/routes/adminRoute.js';
import UploadRoute from "./src/adapters/express/routes/uploadRoute.js"
import UserRoute from "./src/adapters/express/routes/userRoute.js"
import ChatRoute from "./src/adapters/express/routes/chatRoute.js"
import verifyToken from './src/adapters/express/middlewares/authMiddleware.js';
import checkBlockedUser from './src/adapters/express/middlewares/checkBlockedUser.js';
// Define your API routes here



// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use('/auth', AuthRoute);
app.use('/admin', AdminRoute);
app.use(verifyToken)
app.use(checkBlockedUser)
app.use('/upload', UploadRoute);
app.use("/user",UserRoute)
app.use("/chat",ChatRoute)

connect();
