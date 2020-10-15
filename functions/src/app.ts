import * as admin from 'firebase-admin';

const firestore = new admin.firestore.Firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);
export const app = admin.initializeApp();
