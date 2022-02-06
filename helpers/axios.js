import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  // "https://us-central1-amaclone-8c301.cloudfunctions.net/api",
  // "http://127.0.0.1:5001/amaclone-4e671/us-central1/api",
  // ancien "https://us-central1-amaclone-673b4.cloudfunctions.net/api",
});

export default instance;
