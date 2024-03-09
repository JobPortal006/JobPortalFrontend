import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { ApplyJob } from './ApplyJob';



const ApplyJobDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <ApplyJob />
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobDialog;