class Course {
  constructor(title, length, price) {
    this.title = title;
    this.length = length;
    this._price = price;
  }
  get price() {
    return "$" + this._price;
  }
  set price(value) {
    if (value < 0) {
      throw "Invalid value";
    }
    this._price = value;
  }
  method1() {
    console.log("Length/price = " + this.length / this.price);
  }

  method2() {
    console.log(
      "This is course " +
        this.title +
        ", It take " +
        this.length +
        " hours and " +
        this.price
    );
  }
}

var courses = [new Course("JavaScript", 50, 200), new Course("Java", 90, 300)];
console.log(courses);
console.log(courses[0].price);

for (const course of courses) {
  course.method1();
  course.method2();
}

class PracticalCourse extends Course {
  numOfExercises;
}

class TheoreticalCourse extends Course {}
