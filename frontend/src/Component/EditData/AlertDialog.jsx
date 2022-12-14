import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({Title,Text ,open, setOpen , handleClose }) => {

  return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle >
          {Title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            {Text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose(false);} } >لاأوافق</Button>
          <Button onClick={()=> {  handleClose(true);}} autoFocus>
            أوافق
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default AlertDialog;