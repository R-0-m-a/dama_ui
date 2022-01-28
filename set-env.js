const fs = require('fs');

const firebaseFile = `
export const firebase = {
    firebase: {
        apiKey: "${process.env.FIREBASE_API_KEY}",
        databaseURL: "${process.env.FIREBASE_DATABASE_URL}",
        projectId: "${process.env.FIREBASE_PROJECT_ID}",
        appId: "${process.env.FIREBASE_APP_ID}",
        authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
        storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
        messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
        measurementId: "${process.env.FIREBASE_MEASUREMENT_ID}"
    }
};
`;

// Generate file
fs.writeFile('./src/environments/firebase.environment.ts', firebaseFile, function (err) {
    if (err) {
        throw console.error(err);
    } else {
        console.log(`Angular firebase.environment.ts file generated`);
    }
});
