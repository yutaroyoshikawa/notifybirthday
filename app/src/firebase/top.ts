import { defaultDB } from '@/firebase/init';

export const registInfo = (Name: string, Birthday: Date) => (
    new Promise((resolve, reject) => {
        defaultDB.collection('users').doc(Name).set({
            birthday: Birthday,
        })
        .then(() => {
            resolve();
        })
        .catch((e) => {
            reject(e);
        });
    })
);
