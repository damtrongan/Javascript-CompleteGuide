const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

//function sendHttpRequest(method, url, data) {
// const promise = new Promise((resolve, reject) => {
// const xhr = new XMLHttpRequest();
// xhr.setRequestHeader('Content-Type', 'application/json')

// xhr.open(method, url);

// xhr.responseType = "json";

// xhr.onload = function () {
//   if(xhr.status >= 200 && xhr.status < 300){
//     resolve(xhr.response);
//   }
//   else{
      //xhr.response
//     reject(new Error('Can not fetch data!'))
//   }
// };

// xhr.onerror = function(){

// }
// xhr.send(JSON.stringify(data));

// });
// return promise;
//}

function sendHttpRequest(method, url, data) {
  return fetch(url, {
    method: method,
    //body: JSON.stringify(data),
    body: data,
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response.json();
      }else{
        return response.json().then(errData => {
          console.log(errData);
          throw new Error("Something went wrong - server-side")
        })
      }
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Something wrong")
    });
}

async function fetchPost() {
  try {
    const listOfPosts = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  const fd = new FormData(post); 
  // fd.append('title' , title);
  // fd.append('body', content);
  fd.append('userId', userId)
  //fd.append('someFile',  "photo.png"),
  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", fd);
}

fetchButton.addEventListener("click", fetchPost);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  createPost(enteredTitle, enteredContent);
});
//createPost("AnTest", "Nothing here");

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    console.log(event);
    const postId = event.target.closest("li").id;
    console.log(postId);
    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
