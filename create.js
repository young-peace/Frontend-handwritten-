const person = {
    isHuman: false,
    printIntroduction: function() {
      console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
  };
// 新对象的__proto__指向原对象的实例
  const me = Object.create(person);
  
  me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
  me.isHuman = true; // inherited properties can be overwritten
function Person() { 
    this.age = 16;
}
let person1 = new Person();
//   me.printIntroduction();
  // expected output: "My name is Matthew. Am I human? true"
// console.log(me.__proto__)
console.log(person1.__proto__)
console.log(person.__proto__)

debugger


