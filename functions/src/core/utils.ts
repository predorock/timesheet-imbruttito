import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { app } from '../app';

/**
 * Cloud functions ram sizes
 */
export enum FnRam {
  m128 = "128MB",
  m256 = "256MB",
  m512 = "512MB",
  g1   = "1GB",
  g2   = "2GB"
}

/**
 * Cloud Function Region
 */
export enum FnRegion {
  usCentral1     = 'us-central1', // (Iowa)
  usEast1        = 'us-east1', // (South Carolina)
  usEast4        = 'us-east4', // (Northern Virginia)
  europeWest1    = 'europe-west1', // (Belgium)
  europeWest2    = 'europe-west2', // (London)
  asiaEast2      = 'asia-east2', // (Hong Kong)
  asiaNortheast1 = 'asia-northeast1', // (Tokyo)
  asiaNortheast2 = 'asia-northeast2', // (Osaka)
}

/**
 * Cloud function configuration
 */
export interface CloudFnConfig {
  region: FnRegion;
  timeoutSeconds: number;
  memory: FnRam
};

export const defaultFnConfig: CloudFnConfig = {
  region: FnRegion.europeWest1,
  timeoutSeconds: 300,
  memory: FnRam.m256
};

/**
 * Bucket name must be configured to functions config
 */
export const bucketName = (!!functions.config().storage) ? functions.config().storage.bucket : null;

/**
 * Database Reference
 */
export const db = admin.firestore();

/**
 * Returns the document reference
 *
 * @param collection collection name
 * @param id document id
 */
export const db_ref = (collection: string, id: string) => db.collection(collection).doc(id);

/*export const collection_data = async (collection: string): Promise<any[]> =>
  (await db.collection(collection).get()).docs.map(doc => ({...doc.data(), id: doc.id}))
*/

export async function collection_data<T>(collection: string): Promise<T[]> {
  return (await db.collection(collection).get()).docs
    .map(doc => {
      return {
        ...doc.data(),
        id: doc.id
      } as unknown as T
    })
}


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

export async function checkAndGet(collection: string, id: string) {
  if (!!collection && !!id) {
    const ref = await db_ref(collection, id).get()
    if (ref.exists) {
      return ref.data();
    }
  }
  return null;
}
