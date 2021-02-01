// validate login values
let validate = () => {
  let username = document.getElementById("username").value;
  let first_name = document.getElementById("first-name").value;
  let last_name = document.getElementById("last-name").value;
  let check = true;

  if (!username) {
    document.getElementById("username").className = "incorrect";
    document.getElementById("username-helper").className = "shown-helper-text";
    check = false;
  } else {
    document.getElementById("username").className = "";
    document.getElementById("username-helper").className = "hidden-helper-text";
  }

  if (!first_name) {
    document.getElementById("first-name").className = "incorrect";
    document.getElementById("first-name-helper").className =
      "shown-helper-text";
    check = false;
  } else {
    document.getElementById("first-name").className = "";
    document.getElementById("first-name-helper").className =
      "hidden-helper-text";
  }

  if (!last_name) {
    document.getElementById("last-name").className = "incorrect";
    document.getElementById("last-name-helper").className = "shown-helper-text";
    check = false;
  } else {
    document.getElementById("last-name").className = "";
    document.getElementById("last-name-helper").className =
      "hidden-helper-text";
  }

  return check;
};
