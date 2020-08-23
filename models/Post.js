const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        // Connect each profile with the corresponding user in the User model using the mongoDB ID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
          type: String,
          required: true
      },
      name: {
          type: String,
      },
      avatar: {
        type: String
      },
      likes: [
        {
              user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'user'
            }
        }
      ],
      comments: [
        {
            user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
              type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      },   
});

module.exports = Post = mongoose.model('post', PostSchema);