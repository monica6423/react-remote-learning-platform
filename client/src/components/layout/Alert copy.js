import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import AlertMUI from '@material-ui/lab/Alert';





const Alert = ({alerts}) => {
    
    const [open, setOpen] = useState(true);
    const _onClick = () => {
        setOpen(!open);
    
        setTimeout(() => {
          setOpen(open => !open)
        }, 3000);
      };
    return (alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <Collapse in={open}>
    <AlertMUI severity={(() => {
        switch (alert.alertType) {
          case "danger": return "error";
          case "success": return "success";
          default: return "jiji";
        }
      })()} key={alert.id} className={`alert alert-${alert.alertType}`} action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="big"
          onClick={
            _onClick
          }
        
        >
        {console.log(open)}
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }>
     
        
        {' '}
        {alert.msg} {console.log(alert.alertType)}
    </AlertMUI>
    </Collapse>
)));}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
