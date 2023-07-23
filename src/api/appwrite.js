import { Client,Account, Databases } from "appwrite";
// import "dotenv/config";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject('64bcf34995ac8af3861b');

export const databases = new Databases(client);

export const account = new Account(client);
export default client;
