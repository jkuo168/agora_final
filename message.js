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
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

let send = () => {
  let message_text = document.getElementById("message").value;
  if (message_text) {
    document.getElementById("message").className = "";
    document.getElementById("message").value = "";
    document.getElementById("message-helper-text").className =
      "hidden-helper-text";

    let message = message_client.createMessage({ text: message_text });
    channel
      .sendMessage(message)
      .then(() => {
        let message_container = document.createElement("div");
        let message_div = document.createElement("div");
        let message_member = document.createElement("div");
        message_member.innerHTML = user_name;
        message_member.className = "sent-member";
        message_div.className = "sent-message";
        message_div.innerHTML = message.text;
        message_container.appendChild(message_member);
        message_container.appendChild(message_div);
        document.getElementById("chat").appendChild(message_container);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    document.getElementById("message").className = "incorrect";
    document.getElementById("message-helper-text").className =
      "shown-helper-text";
    document.getElementById("message-helper-text").style.textAlign = "left";
    document.getElementById("message-helper-text").style.marginLeft = "55px";
  }
};

channel.on("ChannelMessage", (message, memberId) => {
  let message_container = document.createElement("div");
  let message_div = document.createElement("div");
  let message_member = document.createElement("div");
  message_member.innerHTML = memberId;
  message_member.className = "received-member";
  message_div.className = "received-message";
  message_div.innerHTML = message.text;
  message_container.appendChild(message_member);
  message_container.appendChild(message_div);
  document.getElementById("chat").appendChild(message_container);
});
