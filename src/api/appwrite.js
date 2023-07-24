import { Client,Account, Databases } from "appwrite";


export const PROJECT_ID = '64bcf34995ac8af3861b';
export const COLLECTION_ID_BLOGS = "64bd047b72e0a6c1d928";
export const DATABASE_ID = "64bd04631a3d473d1330";


const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject('64bcf34995ac8af3861b');

export const databases = new Databases(client);

export const account = new Account(client);
export default client;
