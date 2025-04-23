import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/api/emails";

export const sendEmails = (emails) =>
  axios.post(
    REST_API_BASE_URL,
    emails.map((email) => ({
      email: email,
      repeats: 0,
    }))
    );
  
export const getMostFrequentlySentEmails = () => axios.get(REST_API_BASE_URL);