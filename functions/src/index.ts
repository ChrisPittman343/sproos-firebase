import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const auth = admin.auth();

export const userData = functions.https.onCall(async (data) => {
  const token = data;
  try {
    const decoded = await auth.verifyIdToken(token, true);
    return {
      body: {
        uid: decoded.uid,
        name: decoded.name,
        photoURL: decoded.picture,
      },
    };
  } catch (err) {
    return {
      body: "Error!",
    };
  }
});
