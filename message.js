let message_client = AgoraRTM.createInstance(appID, {
  enableLogUpload: false,
});
let channel = message_client.createChannel(channel_name);

message_client
  .login({ uid: user_name })
  .then(() => {
    channel
      .join(appID)
      .then(() => {
        console.log("Successfully joined");
        channel
          .sendMessage({ text: "hello" })
          .then(() => {
            console.log("Successfully sent message");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

console.log("here");
