class Course{
  constructor(title, length, price){
    this._title = title;
    this._length = length;
    this._price = price;
  }
  caculateLePr(){

  }
}

const course1 = new Course("JavaScript", 23, 100);
const course2 = new Course("Python", 30, 100);
console.log(course1, course2);

console.log(course1._title);

class PraticalCourse extends Course{
  numOfExercises = [];
}

class TheoreticalCourse extends Course{
  publish(){
    console.log(this);
  }
}

const test = new TheoreticalCourse("JavaScript", 23, 100);
test.publish();