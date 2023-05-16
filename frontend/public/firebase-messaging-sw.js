self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const flag = e.data.json().data.flag;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    // ...resultData,
    data: { flag: flag },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  let url = "/"; // Set a default value
  const flag = event.notification.data.flag;
  // TODO: flag가 content인지 ott인지에 따라 분기해서 이동시키기
  event.notification.close();

  client.openWindow(url);
});
