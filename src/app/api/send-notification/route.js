import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";



// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  console.log("si llega aca")
    console.log(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

}

export async function POST(request) {
  const { token, title, message, link } = await request.json();

  const payload = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
