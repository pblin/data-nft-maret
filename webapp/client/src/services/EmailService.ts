import {DatasetInquiryPayload} from "./payloads/EmailPayload";

export class EmailService {
  baseUrl: string;
  constructor() {
    this.baseUrl = location.protocol+'//'+location.hostname + ":9000";
  }

  async retrieveSampleData(email: string, datasetId: string, datasetName: string) {

    const body = {
      dataset_id: datasetId,
      dataset_name: datasetName,
      subject: 'Sample Data Info',
      type: 's'
    };

    //TODO: DO 500 check
    await fetch(`${this.baseUrl}/emailer/${email}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return body;
  }

  async retrieveReciept(email: string, datasetId: string, datasetName: string, price: number) {

    const body = {
      dataset_id: datasetId,
      dataset_name: datasetName,
      subject: `Thank you for purchasing dataset ${datasetId}`,
      type: 't',
      price
    };

    //TODO: DO 500 check
    await fetch(`${this.baseUrl}/emailer/${email}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return body;
  }

  //TODO: Create Email Payload object
  async sendEmail(emailInquiry: DatasetInquiryPayload) {
    const body = {
        dataset_id: emailInquiry.datasetId,
        dataset_name: emailInquiry.datasetName,
        subject: emailInquiry.subject,
        message: emailInquiry.message
    };

    //TODO: DO 500 check
    await fetch(`${this.baseUrl}/emailer/${emailInquiry.from}/send/${emailInquiry.to}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return body;
  }

  async verifyEmail(email: string, code: string) {
    const url = `${this.baseUrl}/profile/verify/${email}`;

    const body = {
      code
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if(response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong with verifying the email');
    }
  }
}

export default new EmailService();
