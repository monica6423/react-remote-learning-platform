import React, {useState} from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const interests = [
    {
        "_id": 1,
        "name": "Coding"
    },
    {
        "_id": 2,
        "name": "Finance"
    },
    {
        "_id": 3,
        "name": "Language"
    },
    {
        "_id": 4,
        "name": "Chemistry"
    },
    {
        "_id": 5,
        "name": "Art"
    }
]

function CheckBox(props) {
    const [Checked, setChecked] = useState([])
    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if(currentIndex === -1){
            //if we didnt check this value before, it will be push inside the array
            newChecked.push(value)
        }else{
            //if we check again the already checked box, we get rid of it from current array
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
    }
    return (
        <div>
            
               
                    {interests.map((value, index) => (
                        <React.Fragment key={index}>
                        <FormControlLabel
                            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                            label={value.name}
                            onChange={() => handleToggle(value._id)}
                            type="checkbox"
                            checked={Checked.indexOf(value._id) === -1 ? false : true}
                        />

                        </React.Fragment>
                    ))}
                
          
        </div>
        
    )
}

export default CheckBox
