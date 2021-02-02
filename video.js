let handleError = (err) => {
  console.log(err);
};

// get username, firstname, lastname, and channelname
let urlString = window.location.search;
let urlParams = new URLSearchParams(urlString);
let user_name = urlParams.get("username");
let channel_name = urlParams.get("channel-name");
let first_name = urlParams.get("first-name");
let last_name = urlParams.get("last-name");

// appID and video/mute permissions
let appID = "146de515ef7e4d41a85d1c07a99e631d";
let globalStream;
let isAudioMuted = false;
let isVideoMuted = false;

// initialize client
let client = AgoraRTC.createClient({
  mode: "live",
  codec: "h264",
});

// connect to AgoraRTC client
client.init(appID, () => {
  console.log("AgoraRTC Client Connected"), handleError;
});

// join a channel
client.join(null, channel_name, user_name, () => {
  let localStream = AgoraRTC.createStream({
    video: true,
    audio: true,
  });
  globalStream = localStream;

  // initialize a stream
  localStream.init(() => {
    console.log("JOINING");

    // create main frame name
    let mainFrameName = document.createElement("div");
    mainFrameName.id = "main-frame-name";
    document.getElementById("right-pane").appendChild(mainFrameName);

    // create main frame
    let mainFrame = document.createElement("div");
    mainFrame.id = "main-frame";
    document.getElementById("right-pane").appendChild(mainFrame);

    // play video on main frame
    localStream.play("main-frame");
    console.log(`App id: ${appID}\nChannel id: ${channel_name}`);
    client.publish(localStream);

    // add name to main frame
    mainFrameName.innerHTML = localStream.getId();

    // add video and mute buttons
    let video_mute_bar = document.createElement("div");
    video_mute_bar.id = "video-mute-bar";

    let flex_div = document.createElement("div");
    flex_div.id = "flex-div";

    let video_div = document.createElement("div");
    video_div.id = "video";
    video_div.onclick = video;
    video_div.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>';

    let mic_div = document.createElement("div");
    mic_div.id = "mic";
    mic_div.onclick = mic;
    mic_div.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>';

    flex_div.appendChild(video_div);
    flex_div.appendChild(mic_div);
    video_mute_bar.appendChild(flex_div);
    document.getElementById("right-pane").appendChild(video_mute_bar);

    // add name to participant list
    let participant_div = document.createElement("div");
    participant_div.className = "participant";
    participant_div.id = `${localStream.getId()}-participant`;
    participant_div.innerHTML = user_name;
    document
      .getElementById("participants-container")
      .appendChild(participant_div);
  });
});

// add a stream
client.on("stream-added", (event) => {
  console.log("Added Stream");
  client.subscribe(event.stream, handleError);
});

// subscribe to a stream
client.on("stream-subscribed", (event) => {
  console.log("Subscribed Stream");
  let stream = event.stream;
  addVideoStream(stream.getId());
  stream.play(stream.getId());
});

client.on("peer-leave", function (event) {
  removeVideoStream(event);
});

let addVideoStream = (streamID) => {
  let parentContainer = document.getElementById("child-frames");

  if (!parentContainer) {
    parentContainer = document.createElement("div");
    parentContainer.id = "child-frames";
    document.getElementById("right-pane").appendChild(parentContainer);
  }

  let childContainer = document.createElement("div");
  childContainer.id = `${streamID}-container`;
  let remoteContainer = document.createElement("div");
  let streamNameDiv = document.createElement("div");
  let streamDiv = document.createElement("div");

  // add participant's name on top of video frame
  streamNameDiv.innerHTML = streamID;
  streamNameDiv.style.textAlign = "center";
  streamNameDiv.style.fontSize = "smaller";

  // add participant video frame
  remoteContainer.className = "child";
  streamDiv.id = streamID;
  streamDiv.style.transform = "rotateY(180deg)";
  remoteContainer.appendChild(streamDiv);
  childContainer.appendChild(streamNameDiv);
  childContainer.appendChild(remoteContainer);
  parentContainer.appendChild(childContainer);

  // add participant's name to container
  let participant_div = document.createElement("div");
  participant_div.className = "participant";
  participant_div.id = `${streamID}-participant`;
  participant_div.innerHTML = streamID;
  document
    .getElementById("participants-container")
    .appendChild(participant_div);
};

let removeMyVideoStream = function () {
  globalStream.stop();
};

let removeVideoStream = (event) => {
  let stream = event.stream;
  stream.stop();
  let remDiv = document.getElementById(`${stream.getId()}-container`);
  remDiv.parentNode.removeChild(remDiv);
  let participant_div = document.getElementById(
    `${stream.getId()}-participant`
  );
  participant_div.parentNode.removeChild(participant_div);
};

let leave = () => {
  client.leave(() => {
    console.log("Sucessfully left!");
  }, handleError);
  removeMyVideoStream();
  document.getElementById("username").value = user_name;
  document.getElementById("first-name").value = first_name;
  document.getElementById("last-name").value = last_name;

  return true;
};

let video = () => {
  if (!isVideoMuted) {
    globalStream.muteVideo();
    isVideoMuted = true;
    document.getElementById("video").style.color = "grey";
  } else {
    globalStream.unmuteVideo();
    isVideoMuted = false;
    document.getElementById("video").style.color = "#ab96ff";
  }
};

let mic = () => {
  if (!isAudioMuted) {
    globalStream.muteAudio();
    isAudioMuted = true;
    document.getElementById("mic").style.color = "grey";
  } else {
    globalStream.unmuteAudio();
    isAudioMuted = false;
    document.getElementById("mic").style.color = "#ab96ff";
  }
};
