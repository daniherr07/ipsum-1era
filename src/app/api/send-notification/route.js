import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";



// Initialize Firebase Admin SDK
if (!admin.apps.length) {
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
    token: "eRqQgkspNGiE7GrNWQeGN7:APA91bHOc0pkQ_Ga98h2-4v0f7Iy2tHjBX4W3QaCZuP_3Vf7mF80TvWyOaMfyFjR25qzpl9oeT_Ds0j5TcNPXpzLeBxj6VktJ3ny62o0VqVhXl4ah0VwvPw",
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
