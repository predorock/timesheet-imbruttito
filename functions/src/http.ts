import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

import { validateFirebaseIdTokenMiddleware }  from './core/auth';
import * as utils from './core/utils';

export const app = express();

app.use(cors({origin: true}));
app.use(validateFirebaseIdTokenMiddleware);
app.options('*', cors());



app.post('/setCustomClaims', (req, res) => {
  // Get the ID token passed.
  const idToken = req.body.idToken;
  // Verify the ID token and decode its payload.
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((claims) => {
      // Verify user is eligible for additional privileges.
      if (typeof claims.email !== 'undefined' && typeof claims.email_verified !== 'undefined' && claims.email_verified) {
        // Add custom claims for additional privileges.
        admin
          .auth()
          .setCustomUserClaims(claims.sub, {
            admin: true
          })
          .then(() => {
            // Tell client to refresh token on user.
            res.end(JSON.stringify({
              status: 'success'
            }));
          });
      } else {
        // Return nothing.
        res.end(JSON.stringify({status: 'ineligible'}));
      }
    });
});

export const httpCloudFunctions = utils.cloudFn().https.onRequest(app)

