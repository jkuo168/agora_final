let urlString = window.location.search;
let urlParams = new URLSearchParams(urlString);
let username = urlParams.get("username");
let first_name = urlParams.get("first-name");
let last_name = urlParams.get("last-name");

// get first and last name
document.getElementById(
  "welcome-text"
).innerHTML = `Welcome ${first_name} ${last_name}!`;
