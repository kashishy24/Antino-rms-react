import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const OffboardingModal = ({handleOffBoarding,isOffboardingToggle,setisOffboardingToggle}) =>{

    const handleClose = () => {
        setisOffboardingToggle(false);
      };

    return(
     <div>
        <Dialog open={isOffboardingToggle} onClose={handleClose}>
        <DialogTitle>Offboard</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Offboard this developer, please click on the Offboard.
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button onClick= {handleOffBoarding} >Offboard</Button>
        </DialogActions>
      </Dialog>

    {/* <buton onClick={()=>handleOffBoarding()}>submit</buton> */}
     </div>   
    )
}

export default OffboardingModal;