import * as utils from './utils';

export async function validateFirebaseIdTokenMiddleware(req: any, res: any, next: any) {
  console.log('[validateFirebaseIdTokenMiddleware] Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)) {
    console.error('[validateFirebaseIdTokenMiddleware] No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.');
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('[validateFirebaseIdTokenMiddleware] Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    console.log('[validateFirebaseIdTokenMiddleware] Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send('Unauthorized');
    return;
  }

  try {
    const decodedIdToken = await utils.auth.verifyIdToken(idToken);
    console.log('[validateFirebaseIdTokenMiddleware] ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error('[validateFirebaseIdTokenMiddleware] Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
    return;
  }
};
