const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path')
const cors = require('cors')

app.use(cors())
connectDB();

//ini middleware
app.use(express.json({ extended: false }));


//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

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
module.exports = app;