import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendEmailForm from './SendEmailForm';

const SendEmailDialog = ({isOpen = true, onCancel, onSendEmail, onSubmit}) => {
  return(
    <Dialog
      open={isOpen}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Send Email To The Dataset Owner</DialogTitle>
      <DialogContent>
        <SendEmailForm onSubmit={onSubmit}>
        </SendEmailForm>
      </DialogContent>
      <DialogActions>
        <Button
          color={"secondary"}
          onClick={onSendEmail}>
          Send Email
        </Button>
        <Button
          onClick={onCancel}
          color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendEmailDialog;
