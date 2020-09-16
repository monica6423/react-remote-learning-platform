import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('');
    return (
        <div class="post-form">
        
        <form class="form my-1" onSubmit={e => {
            e.preventDefault();
            addPost({ text });
            setText('');
        }}>
          <TextField
            multiline
            fullWidth={true}
            name="text"
      
            label="Now start your group"
            rows={2}

            value={text}
            onChange={ e => setText(e.target.value)}
        
          ></TextField>
          <div className="send-button">
          <Button type="submit"  variant="contained" value="Submit">
            <SendIcon /><span className="send"> Send</span> 
          </Button>
          </div>
          
        </form>
      </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm);
