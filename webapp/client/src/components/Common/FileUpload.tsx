import * as React from "react";
import {Grid, Icon, Typography} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

interface FileUploadProps {
  fileId: string,
  onFileChange: any;
  upload: any;
  displayUpload: boolean;
  fileTypes: string[];
  onFileTypeMismatch: any;
}

export class FileUpload extends React.Component<FileUploadProps> {

  constructor(props: FileUploadProps) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.upload = this.upload.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleFileChange() {
    let fileElement = document.getElementById(this.props.fileId);
    if(!fileElement) {
      return;
    }

    let file: File = (fileElement as any).files[0];

    this.props.onFileChange(this.props.fileId, file);
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop(e) {
    //TODO: Place errors for wrong file types
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files = dt.files;
    let file = files[0];
    let foundFileType = this.props.fileTypes.find((type) => {
      return file.type == type;
    });

    if(foundFileType) {
      this.props.onFileChange(this.props.fileId, file);
    } else {
      this.props.onFileTypeMismatch(file.type)
    }
  }

  async upload() {
    this.props.upload(this.props.fileId);
  }

  render() {
    return (
        <div className={'drop-zone'} onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
          <Grid item xs={12}>
            <Icon fontSize={"large"}>
              <CloudUploadIcon className={"upload-icon"}/>
            </Icon>
          </Grid>
          <Grid item xs={12}>
            <Typography>Drag And Drop Files Here To Upload</Typography>
          </Grid>
          <label htmlFor={this.props.fileId} className="file-input-label"><Typography>Or Select A File To Upload</Typography></label>
          <input className={"file-input"}
                 type="file"
                 id={this.props.fileId}
                 name={this.props.fileId}
                 onChange={this.handleFileChange}
                 accept={this.props.fileTypes.join(',')}
          />
          {this.props.displayUpload && (
            <button type="button" onClick={this.upload}>Upload</button>
          )}
        </div>
    )
  }
}
