const button = document.querySelector("button");
const output = document.querySelector("p");

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opts
    );
  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello guyy");
    }, duration);
  });
  return promise;
};

async function trackUserHandler() {
  let position;
  let timeset;
  try {
    position = await getPosition();
    timeset = await setTimer(2000);
  } catch (err) {
    console.log(err);
  }
  console.log(position, timeset);

  // getPosition()
  //   .then((postData) => {
  //     positionData = postData;
  //     return setTimer();
  //   })
  //   .then((data) => {
  //     console.log(data, positionData);
  //   })
  //   .catch((err) => console.log(err));
  setTimer(1000).then(() => {
    console.log("Timer done!");
  });
  console.log("Getting position...");
}

// (async function(){
//   console.log(await setTimer(2000));
// })();

// setTimer(2000).then(data => {
//   console.log(data);
// })

trackUserHandler();

// // Race hữu ích khi để đo hiệu suất giữa 2 promise xem nên sử dụng cái nào
// Promise.race([getPosition(), setTimer(1000)], (data) => {
//   console.log(data);
// });

// //Trả về kết quả dưới dạng array khi sử dụng all: Nó sẽ dừng thực hiện khi 1 cái không thực hiện được
// Promise.all([getPosition(), setTimer(1000)]).then((promiseData) => {
//   console.log(promiseData);
// });

// Trả về trạng thái và value của promise, 
// nếu 1 cái không thực hiện được nó vẫn thực hiện và trả về trạng thái khác fulfilled
Promise.allSettled([getPosition(), setTimer(1000)]).then((promiseData) => {
  console.log(promiseData);
});
