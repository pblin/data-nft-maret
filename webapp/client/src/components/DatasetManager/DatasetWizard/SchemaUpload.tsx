import * as React from "react";
import {Grid} from "@material-ui/core";
import {FileUpload} from "../../Common/FileUpload";
import NotificationLabel from "../../Common/NotificationLabel";

interface SchemaUploadProps {
  onSchemaFileChange: any;
  onSchemaUpload: any;
  schemaFile: any;
  schema: any[];
  errors: any[];
  displayNoSchemaError: boolean;
}

export class SchemaUpload extends React.Component<SchemaUploadProps> {
  constructor(props: SchemaUploadProps) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.upload = this.upload.bind(this);
    this.renderFileContent = this.renderFileContent.bind(this);
    this.renderFileUpload = this.renderFileUpload.bind(this);
    this.onFileTypeMismatch = this.onFileTypeMismatch.bind(this);
  }

  onFileChange(fileId: string, file: File) {
    this.props.onSchemaFileChange(fileId, file);
  }


  onFileTypeMismatch() {

  }

  upload(fileId: string) {
    this.props.onSchemaUpload(fileId);
  }

  renderErrors(errors: any[]) {
    return(
      <div>
        {errors.map((error, index) => {
          return (
            <NotificationLabel key={'notification-'+index}
                               type="error">
              <strong>ERROR </strong>{error.dataPath} {error.message} {JSON.stringify(error.params)}
            </NotificationLabel>
          )
        })}
      </div>
    )
  }

  renderFileUpload() {
    return (
      <Grid item xs={12} className="text-center">
        <FileUpload
          fileId="schemaFile"
          onFileChange={this.onFileChange}
          upload={this.upload}
          displayUpload={false}
          fileTypes={['.json', 'application/json']}
          onFileTypeMismatch={this.onFileTypeMismatch}
        />
      </Grid>
    )
  }

  renderFileContent() {
    if(!this.props.schemaFile) {
      return;
    }else if(this.props.errors) {
      return (this.renderErrors(this.props.errors));
    } else if(this.props.schemaFile && this.props.schema.length){
      return (<NotificationLabel type={"success"}>File is valid, and it passes all validation checks</NotificationLabel>);
    }
  }

  renderNoSchemaError() {
    if (this.props.displayNoSchemaError) {
      return (<NotificationLabel type="error"><strong>ERROR </strong> Schema is required, please upload a valid
        schema</NotificationLabel>)
    }
  }

  render() {
    return (
      <Grid container={true} justify={'center'}>
        {this.renderNoSchemaError()}
        {this.renderFileContent()}
        {(!this.props.schema.length || this.props.errors) && this.renderFileUpload()}
      </Grid>
    )
  }
}
