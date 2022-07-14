const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User',userSchema);

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async (req,res) => {
  if(req.body.username){
    const user = new User({username: req.body.username});
    try {
      const result = await user.save();
      res.json({username: result.username,_id: result._id});
    } catch (error) {
      res.send('Error');
    }
  }else res.send('Error');
});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
