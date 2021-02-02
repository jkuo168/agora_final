let message_client = AgoraRTM.createInstance(appID, {
  enableLogUpload: false,
});
let channel = message_client.createChannel(channel_name);

let message = message_client.createMessage({ text: "hello" });

message_client
  .login({ uid: user_name })
  .then(() => {
    channel
      .join(appID)
      .then(() => {
        console.log("Successfully joined");
        // channel
        //   .sendMessage(message)
        //   .then(() => {
        //     document.getElementById("chat").innerHTML = message.text;
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

console.log("here");

let send = () => {
  let message = message_client.createMessage({ text: "hello" });
  channel
    .sendMessage(message)
    .then(() => {
      let message_div = document.createElement("div");
      message_div.innerHTML = message.text;
      document.getElementById("chat").appendChild(message_div);
    })
    .catch((error) => {
      console.log(error);
    });
};

channel.on("ChannelMessage", (message, memberId) => {
  console.log("RECEIVED MESSAGE");
  console.log(message, memberId);
  let message_div = document.createElement("div");
  message_div.innerHTML = message.text;
  document.getElementById("chat").appendChild(message_div);
});
