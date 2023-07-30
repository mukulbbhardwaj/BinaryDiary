import { Client,Account, Databases } from "appwrite";


export const PROJECT_ID = process.env.REACT_APP_PROJECT_ID ;
export const COLLECTION_ID_BLOGS = process.env.REACT_APP_COLLECTION_ID_BLOGS;
export const DATABASE_ID = process.env.REACT_APP_DATABASE_ID; ;


const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

export const databases = new Databases(client);

export const account = new Account(client);
export default client;
