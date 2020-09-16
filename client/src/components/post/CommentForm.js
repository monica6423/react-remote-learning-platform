import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

const CommentForm = ({ postId, addComment}) => {
    const [text, setText] = useState('');
    return (
     
        <div class="post-form">
    
        <form class="form my-1" onSubmit={e => {
            e.preventDefault();
            addComment(postId, { text });
            setText('');
        }}>
          <TextField
            name="text"
            fullWidth={true}
      
            label="Reply..."
            value={text}
            onChange={ e => setText(e.target.value)}
            required
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

CommentForm.propTypes = {
    addComment:PropTypes.func.isRequired,
}

export default connect(null, {addComment})(CommentForm);
