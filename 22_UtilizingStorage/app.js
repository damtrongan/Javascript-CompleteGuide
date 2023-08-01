const storeBtn = document.getElementById("store-btn");
const retrBtn = document.getElementById("retrieve-btn");

const dbRequest = indexedDB.open("StorageDummy", 1);

dbRequest.onsuccess = function() {
   db = event.target.result
}


dbRequest.onerror = function () {
  console.log("ERROR!");
};

storeBtn.addEventListener("click", () => {
   if (!db){
      return;
   }
   dbRequest.onupgradeneeded = function () {
      const objStore = db.createObjectStore("products", { keyPath: "id" });
      objStore.transaction.oncomplet = function (event) {
        const productStore = db
          .transaction("products", "readwrite")
          .objectStore("products");
        productStore.add({
          id: "p2",
          title: "A Second Product",
          price: 12.99,
          tags: ["Expensive", "Luxury"],
        });
      };
    };
});

retrBtn.addEventListener("click", () => {});
