// setTeacherClaim.js
const admin = require('firebase-admin');

// Replace with your service account key JSON file path
const serviceAccount = require('/Users/moshiur/Desktop/kids-exam-portal/binarybeatsquiz-firebase-adminsdk-fp54i-2a93717601.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const email = 'moshiur@binarybeat.org'; // Teacher email

admin.auth().getUserByEmail(email)
  .then(user => {
    return admin.auth().setCustomUserClaims(user.uid, { teacher: true });
  })
  .then(() => {
    console.log(`Custom claims set for ${email}`);
    process.exit();
  })
  .catch(error => {
    console.error('Error setting custom claims:', error);
  });
