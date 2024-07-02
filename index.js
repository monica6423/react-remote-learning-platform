import express from 'express';
import path from 'path';
import cors from 'cors';
import { connectDB } from './config/db.js';
const app = express();

// CORS configuration
const corsOptions = {
    origin: '*', // Allow localhost during development
    optionsSuccessStatus: 200
  };
  
app.use(cors(corsOptions));
connectDB();

//ini middleware
app.use(express.json({ extended: false }));


// Define routes
import users from './api/users.js';
import auth from './api/auth.js';
import profile from './api/profile.js';
import posts from './api/posts.js';
import recommendations from './api/recommendations.js';

//define routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/recommendations', recommendations);

//Serve static assets in production
// if(process.env.ENV === 'production'){
//     //set static folder
//     app.use(express.static('client/build'));
//     app.get('*',(req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     })
// }

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// Export the Express API
export default app;