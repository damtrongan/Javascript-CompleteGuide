// function createTaxCalculator(tax) {
//   function calculateTax(amount) {
//     return amount * tax;
//   }

//   return calculateTax;
// }

// const calculateVatAmount = createTaxCalculator(0.19);
// const calculateIncomeTaxAmount = createTaxCalculator(0.25);

// console.log(calculateVatAmount(100));
// console.log(calculateIncomeTaxAmount(200));

// closue and function
// let userName = 'max'
// function greetUser () {
//    let name  = uesrName    ///Không có tác dụng
//    console.log('hi' + userName);
// }

// userName = 'An';
// greetUser()

// function powerOf(x, n) {
//   // if(n === 1){
//   //    return x
//   // }
//   // return x *= powerOf(x, n-1)
//   return n === 1 ? x : x * powerOf(x, n - 1);
// }

// console.log(powerOf(2, 3));

person = {
  name: "An",
  friends: [
    { name: "Hoang", friends: [{name: 'a'}] },
    { name: "Trang", friends: [{ name: "Sung" }, { name: "Suong" }] },
  ],
};


function findFriend(person){
   collectNames = [];

   if (!person.friends){
      return [];
   }

   for (const friend of person.friends){
      collectNames.push(friend.name);
      collectNames.push(...findFriend(friend));
   }
   return collectNames;
}
console.log(findFriend(person));
