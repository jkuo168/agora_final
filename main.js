let urlString = window.location.search;
let urlParams = new URLSearchParams(urlString);
let username = urlParams.get("username");
let first_name = urlParams.get("first-name");
let last_name = urlParams.get("last-name");

// get first and last name
document.getElementById(
  "welcome-text"
).innerHTML = `Welcome ${first_name} ${last_name}!`;

let join = () => {
  let channel_name = document.getElementById("channel-name").value;
  let check = true;
  if (!channel_name) {
    document.getElementById("channel-name").className = "incorrect";
    document.getElementById("channel-name-helper").className =
      "shown-helper-text";
    check = false;
  } else {
    document.getElementById("channel-name").className = "";
    document.getElementById("channel-name-helper").className =
      "hidden-helper-text";
  }

  return check;
};

document.getElementById("create-button").onclick = () => {
  let event_name = document.getElementById("new-event-name").value;
  let channel_name = document.getElementById("new-channel-name").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;

  let check = true;

  if (!event_name) {
    document.getElementById("new-event-name").className = "incorrect";
    document.getElementById("new-event-name-helper").className =
      "shown-helper-text";
    check = false;
  } else {
    document.getElementById("new-event-name").className = "";
    document.getElementById("new-event-name-helper").className =
      "hidden-helper-text";
  }

  if (!channel_name) {
    document.getElementById("new-channel-name").className = "incorrect";
    document.getElementById("new-channel-name-helper").className =
      "shown-helper-text";
    check = false;
  } else {
    document.getElementById("new-channel-name").className = "";
    document.getElementById("new-channel-name-helper").className =
      "hidden-helper-text";
  }

  if (!date) {
    document.getElementById("date").className = "incorrect";
    document.getElementById("date-helper").className = "shown-helper-text";
    check = false;
  } else {
    document.getElementById("date").className = "";
    document.getElementById("date-helper").className = "hidden-helper-text";
  }

  if (!time) {
    document.getElementById("time").className = "incorrect";
    document.getElementById("time-helper").className = "shown-helper-text";
    check = false;
  } else {
    document.getElementById("time").className = "";
    document.getElementById("time-helper").className = "hidden-helper-text";
  }

  // if all inputed, create an event
  if (event_name && channel_name && date && time) {
    document.getElementById("new-event-name").value = "";
    document.getElementById("new-channel-name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";

    let hour = parseInt(time.slice(0, 2));
    let meal;
    let num = Math.floor(Math.random() * 3) + 1;
    let day = "AM";

    if (hour < 10) {
      meal = "breakfast";
    } else if (hour < 15) {
      meal = "lunch";
    } else {
      meal = "dinner";
    }

    if (hour > 12) {
      day = "PM";
      hour = hour - 12;
    }

    let event_card_div = document.createElement("div");
    event_card_div.className = "event-card";

    let event_name_div = document.createElement("div");
    event_name_div.className = "event-name";
    event_name_div.innerHTML = event_name;

    let event_image_div = document.createElement("div");
    event_image_div.className = "event-image-container";

    let event_image = document.createElement("img");
    event_image.className = "event-image";
    event_image.src = `/assets/${meal}_${num}.jpg`;
    event_image_div.appendChild(event_image);

    let event_channel_name_div = document.createElement("div");
    event_channel_name_div.className = "event-channel-name";
    event_channel_name_div.innerHTML = `<strong>Channel Name:</strong> ${channel_name}`;

    let event_info_div = document.createElement("div");
    event_info_div.className = "event-info";

    let event_date_div = document.createElement("div");
    event_date_div.className = "event-date";
    event_date_div.innerHTML = `<strong>Date:</strong> ${date}`;

    let flex_div = document.createElement("div");
    flex_div.className = "flex-grow";

    let event_time_div = document.createElement("div");
    event_time_div.className = "event-time";
    event_time_div.innerHTML = `<strong>Time:</strong> ${hour}${time.slice(
      2
    )} ${day}`;

    event_info_div.appendChild(event_date_div);
    event_info_div.appendChild(flex_div);
    event_info_div.appendChild(event_time_div);

    event_card_div.appendChild(event_name_div);
    event_card_div.appendChild(event_image_div);
    event_card_div.appendChild(event_channel_name_div);
    event_card_div.appendChild(event_info_div);

    document.getElementById("event-container").prepend(event_card_div);
  }

  return true;
};
