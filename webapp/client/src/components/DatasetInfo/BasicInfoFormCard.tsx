import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography
} from "@material-ui/core";
import BasicInfoForm from "../DatasetManager/DatasetWizard/BasicInfoForm";

const BasicInfoModal = ({onSave, onSubmit, isOpen = false, onCancel}) => {
  return(
    <Dialog open={isOpen} maxWidth={"sm"}>
      <DialogTitle>
        <Typography className={"dialog-header"}>
          <span className={"bold"}>UPDATE DATASET INFO</span>
        </Typography>
        <Typography className={"dialog-subheader"}>
         Update Dataset Information Here
        </Typography>
      </DialogTitle>
        <DialogContent>
          <BasicInfoForm onSubmit={onSubmit} mode={'edit'}/>
        </DialogContent>
       <DialogActions>
         <Button
           color={"secondary"}
           variant={"outlined"}
           onClick={onCancel}>
           CANCEL
         </Button>
         <Button
           color={"secondary"}
           variant={"contained"}
           onClick={onSave}>
           SAVE
         </Button>
       </DialogActions>
    </Dialog>
  );
};

export default BasicInfoModal;
