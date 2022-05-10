export class ToolbarAction {
  label: string;
  onClick: any;

  constructor(label: string, onClick: any) {
    this.label = label;
    this.onClick = onClick;
  }
}
