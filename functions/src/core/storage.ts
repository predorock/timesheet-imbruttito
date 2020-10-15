import * as utils from './utils';

export const deleteFromPath = (ref) => {
  const path = ref.get('path');
  return utils.deleteFile(path);
}

export const createDeleteFunction = (collection: string) => {
  return utils.cloudFn().firestore
    .document(`${collection}/{uid}`)
    .onDelete(deleteFromPath);
}
