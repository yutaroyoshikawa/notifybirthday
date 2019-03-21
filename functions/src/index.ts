import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as serviceAccountKey from '../serviceAccountKey.json';
import { WebClient } from '@slack/client';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey as any),
    databaseURL: functions.config().admin.database_url,
});

const slack = new WebClient(functions.config().slack.api_key);

interface IUser {
    birthday: Date;
    name: string;
}

const notifySlack = async (users: IUser[]) => {
    let names = '';

    if (users.length === 1) {
        users.map(user => names += user.name + ', ');
    } else {
        names = users[0].name;
    }
    
    const res = await slack.chat.postMessage(
        {
            channel: functions.config().slack.channel,
            text: "今日は" + names + "が誕生日！",
        }
    )

    console.log(res);
}

const aggregateUsers = (snapshot: FirebaseFirestore.QuerySnapshot): IUser[] => {
    const today = new Date();
    const users: IUser[] = new Array();

    snapshot.docs.forEach(doc => {
        const birthday: Date = doc.data().birthday.toDate();
        if(birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth()){
            users.push(
                {
                    birthday: doc.data().birthday,
                    name: doc.id,
                }
            );
        };
    });

    return users;
}

export const checkBirthday = functions.https.onRequest((req, resp) => {
    const ref = admin.firestore().collection('users');
    
    ref.get()
    .then(snapshot => {
        const users = aggregateUsers(snapshot);
        
        users.length === 0 ?
            resp.send('ok')
            :
            notifySlack(users)
                .then(() => resp.send('ok'))
                .catch((e) => resp.send('error:' + e))
    })
    .catch((e) => {
        resp.send('error:' + e);
    });
});
