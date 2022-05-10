export interface EmailPayload {
  from: string;
  to: string;
  subject?: string;
  message?: string
}

export class DatasetInquiryPayload implements EmailPayload {
  datasetId: string;
  datasetName: string;
  from: string;
  to: string;
  subject: string;
  message: string;

  constructor(to, from, subject, message, datasetId, datasetName) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.message = message;
    this.datasetId = datasetId;
    this.datasetName = datasetName;
  }
}
