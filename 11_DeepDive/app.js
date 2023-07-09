class AgePerson {
  printAge() {
    console.log(this.age);
  }
}
class Person {
  name = "AN";

  constructor() {
    //super();
    this.age = 26;
  }
}
//   greet() {
//     console.log(
//       "Hi, I am " + this.name + " and I am " + this.age + " year old"
//     );
//   }
//   greet = function() {
//    console.log(
//      "Hi, I am " + this.name + " and I am " + this.age + " year old"
//    );
//  }
// }
// const p = new Person();
// console.log(p);
// function Person(){
//    this.age = 30;
//    this.name = 'Max';
//    this.greet = function() {
//       console.log('Hi, I am ' + this.name + ' and I am '+ this.age + ' year old');
//    }
// }

// p.greet()
// p.printAge()
// console.log(p.__proto__);

// const p2 = new p.__proto__.constructor();
// console.log(p2);

// Person.prototype.fixName = function(){
//    console.log(this.name + " Tao la fix name ne");
// }
// p.fixName();
// console.dir(Person);

const course = {
   title: "Javascript - The Complete Guide",
   rating: 5
}
console.log(Object.getPrototypeOf(course));

Object.setPrototypeOf(course, {
   printRating: function(){
      console.log(`${this.rating}/5`);
   }
});
course.printRating();

const student = Object.create({
   printProgress: function(){
      console.log(this.progress);
   }
}, {
   name: {
      configurable: false,
      enumerable : true,
      value: "An",
      writable: true
   }
})

console.log(student.name);