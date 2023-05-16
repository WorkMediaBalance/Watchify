// firebase-messaging-sw.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { fcmSave } from "apis/apiMy";

const firebaseConfig = {
  apiKey: "AIzaSyBJk6Qztl_chNGB1rq0eS8YmaEvYz_qWyQ",
  authDomain: "watchify-1539c.firebaseapp.com",
  projectId: "watchify-1539c",
  storageBucket: "watchify-1539c.appspot.com",
  messagingSenderId: "289161187025",
  appId: "1:289161187025:web:ce95962c1dc03c7d5bbff0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey:
      "BO2KgYXXA9rZD6AVijrablXKDM5q5gDRni7ATVjppEO6p1zqrkB9Et9dVJhxeov28-8IanFPB-a5QYdyTHB3FhI",
  });

  if (token) {
    console.log("token: ", token);
    console.log(token);
    fcmSave({ fcmToken: token });
  } else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
}

requestPermission();
