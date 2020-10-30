import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

import * as fs from 'fs';
import * as morgan from 'morgan';

import * as hb from 'handlebars';

// import { validateFirebaseIdTokenMiddleware }  from './core/auth';
import * as utils from './core/utils';


function formatDate(d: Date) {
  return new Intl.DateTimeFormat('it').format(d);
}

export const app = express();

app.use(cors({ origin: true }));
// app.use(validateFirebaseIdTokenMiddleware);
app.use('assets', express.static('./templates/assets'));
app.use(morgan('dev'));
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
      if (
        typeof claims.email !== 'undefined' &&
        typeof claims.email_verified !== 'undefined' &&
        claims.email_verified
      ) {
        // Add custom claims for additional privileges.
        admin
          .auth()
          .setCustomUserClaims(claims.sub, {
            admin: true,
          })
          .then(() => {
            // Tell client to refresh token on user.
            res.end(
              JSON.stringify({
                status: 'success',
              })
            );
          });
      } else {
        // Return nothing.
        res.end(JSON.stringify({ status: 'ineligible' }));
      }
    });
});

app.get('/summary', async (req, res) => {

  const id = 'AAKw2BkmTShn76nsJjxqtQAT3mE3';

  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const query = utils.db
    .collection('work-logs')
    .where('logger', '==', id)
    .where('workDate', '>', firstDay)
    .where('workDate', '<', lastDay);

  const data = (await query.get()).docs
    .map((doc) => ({ ...doc.data()}))
    .map((log: any) => ({...log, workDate: formatDate(log.workDate.toDate())}))
    .reduce((acc, el) => {
      const groupId = el.order.orderCode;

      if (!acc[groupId]) {
        acc[groupId] = {
          ...el.order,
          total: 0,
          entries: [],
        };
      }

      acc[groupId].total += el.workedHours;
      acc[groupId].entries.push(el);
      return acc;
    }, {});

  let totalThisMonth = 0;
  const entries: any[] = [];

  Object.keys(data).map((e) => {
    entries.push(data[e]);
    totalThisMonth += data[e].total;
  });

  const ctx = {
    entries,
    totalThisMonth,
    today: formatDate(today)
  };

  console.log('context', ctx);

  fs.readFile('./templates/summary.hbs', 'utf8', function (err, tplHtml) {
    if (!!err) {
      res.status(400).send(err);
    }

    const tpl = hb.compile(tplHtml.toString());

    res.send(tpl(ctx))

  });
});

export const httpCloudFunctions = utils.cloudFn().https.onRequest(app);
