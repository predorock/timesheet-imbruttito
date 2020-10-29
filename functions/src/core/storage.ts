import { EventContext } from 'firebase-functions';
import { QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import * as utils from './utils';

/**
 *
 * Assuming that the document has a field path referring to the file in the cloud storage.
 * This is a function handler that deletes the file when the corresponding document is deleted
 *
 * @param snapshot
 * @param context
 */
export const deleteFromPath = (snapshot: QueryDocumentSnapshot, context: EventContext) => {
  const path = snapshot.get('path');
  return utils.deleteFile(path);
}

/**
 *
 * Creates a cloud function that handles the file deletetion
 * for all the documents on the given collection
 *
 * NOTE: all the documents MUST have a field 'path' to the corresponding file in the cloud storage
 *
 * @param collection
 */
export const createDeleteFunction = (collection: string) => {
  return utils.cloudFn().firestore
    .document(`${collection}/{uid}`)
    .onDelete(deleteFromPath);
}
