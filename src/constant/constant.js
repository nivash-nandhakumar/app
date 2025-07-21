let user_mode = JSON.parse(localStorage.getItem("userMode")) || "";
let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
const defaultAvatar = JSON.parse(localStorage.getItem("avatar")) || "https://placehold.co/120x120?text=Avatar";

// let user_mode = '';
// let isLoggedIn = true;
console.log("userMode------>", user_mode, "isLogge----------->", isLoggedIn);
