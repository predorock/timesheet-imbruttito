import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { app } from '../app';

export type FnRAM = "128MB" | "256MB" | "512MB" | "1GB" | "2GB";
export interface CloudFnConfig {
  region: string;
  timeoutSeconds: number;
  memory: FnRAM
};

export const defaultFnConfig: CloudFnConfig = {
  region: 'europe-west1',
  timeoutSeconds: 300,
  memory: "256MB"
};

export const bucketName = (!!functions.config().storage) ? functions.config().storage.bucket : null;

export const platformUrl = (!!functions.config().mail) ? functions.config().mail.website: 'http://localhost:4200';

export const db = admin.firestore();

export const db_ref = (collection: string, id: string) => db.collection(collection).doc(id);

export const collection_data = async (collection: string): Promise<any[]> =>
  (await db.collection(collection).get()).docs.map(doc => ({...doc.data(), id: doc.id}))

export const storage = (forceBucket: string = bucketName) => admin.storage(app).bucket(forceBucket);

export const auth = admin.auth();

export const getTimeStamp = () => admin.database.ServerValue.TIMESTAMP;

export const deleteFile = (filePath: string) =>
  storage().file(filePath).delete();

export const cloudFn = (config?: Partial<CloudFnConfig>) => {
  const cfg = {
    ...defaultFnConfig,
    ...config
  };
  return functions
    .region(cfg.region)
    .runWith({
      timeoutSeconds: cfg.timeoutSeconds,
      memory: cfg.memory
    });
}

export function fieldHasChanged(field: string, prev: any, next: any) {
  return !!prev && !!next && !!field && prev[field].id !== next[field].id;
}

export function pad (num: number, size: number) {
  let s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
}

export async function checkAndGet(collection: string, id: string) {
  if (!!collection && !!id) {
    const ref = await db_ref(collection, id).get()
    if (ref.exists) {
      return ref.data();
    }
  }
  return null;
}
