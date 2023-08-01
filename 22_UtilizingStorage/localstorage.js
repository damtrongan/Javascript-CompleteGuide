const storeBtn = document.getElementById("store-btn");
const retrBtn = document.getElementById("retrieve-btn");

const userId = "Da123";
const user = {
   name : 'Max',
   age : 30,
   hobbies : ['Sports', 'Cooking']
}
//localStorage.setItem("uid", userId);

storeBtn.addEventListener("click", () => {
   sessionStorage.setItem("uid", userId);
   localStorage.setItem("user", JSON.stringify(user));
});

retrBtn.addEventListener("click", () => {
  const extractedId = sessionStorage.getItem("uid");
  const extractedUser = JSON.parse(localStorage.getItem('user'))
  console.log(extractedUser);
  if (extractedId || extractedUser) {
   console.log("Got the id - " + extractedId);
  }else {
   console.log("Could not find user id ");
  }
});
