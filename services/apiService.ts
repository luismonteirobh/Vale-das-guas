import { WebhookPayload } from '../types';

export const sendQuizData = async (data: WebhookPayload): Promise<boolean> => {
  // Simulate network request
  return new Promise((resolve) => {
    console.log("Sending data to Webhook...", data);
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};