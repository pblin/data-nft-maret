import {STRIPECHECKOUT} from "../components/ConfigEnv";

export class StripeService {
  async checkout(body, userId) {
      const results = await fetch(`${STRIPECHECKOUT}/${userId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      console.log('stripe results');
      console.log(results);

      return results.json();
  }
}
