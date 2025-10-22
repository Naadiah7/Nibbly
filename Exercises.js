//Week 1 - use function or let

//Exercise 1
function areaOfRectangle(length, width) {
    return length * width;
}

console.log("Area:", areaOfRectangle(7, 8));


//Exercise 2
function conSum(a, b) {
    if(a === b){
        return 3 * (a + b);
    }else{
        return a+b
    }
}

console.log(conSum(3,3));
console.log(conSum(5,3));


//Exercise 3
function checkFifty(n1, n2) {
    return n1 === 50 || n2 === 50 || (n1 + n2 === 50);
}

console.log(checkFifty(50, 30));
console.log(checkFifty(25, 25));
console.log(checkFifty(20, 5));

//Exercise 4
function calPower(voltage, current) {
    return voltage * current;
}

console.log("Power =",calPower(20, 5));

//Exercise 5 - random number
let randInt = Math.floor(Math.random() * 10) + 1;

let isLessThanFive = randInt < 5;

let resultStr = `The number ${randInt} is ${isLessThanFive ? "less than" : "not less than"} five.`;

console.log(resultStr);
console.log(randInt % 2 === 0 ? "Even" : "Odd");

//Exercise 6 - string
function addPyPrefix(str) {
  return str.startsWith("Py") ? str : "Py" + str;
}

console.log(addPyPrefix("thon"));

//Exercise 7 - array
let movies = ["Fantastic 4 ", "Avatar", "Superman", "Transformers", "Mulan"];

movies.push("Inception");

movies.splice(2, 1);

console.log("Second movie:", movies[1]);

movies.push("Spirited Away");

console.log(movies);

//Exercise 8 
function Season(month) {
  month = month.toLowerCase();
  const summer = ["december", "january", "february"];
  const autumn = ["march", "april", "may"];
  const winter = ["june", "july", "august"];
  const spring = ["september", "october", "november"];

  if (summer.includes(month)) return "Summer";
  if (autumn.includes(month)) return "Autumn";
  if (winter.includes(month)) return "Winter";
  if (spring.includes(month)) return "Spring";
  return "Invalid month";
}
console.log(Season("August")); 

//Exercise 9
function deterType(input) {
  return typeof input;
}

console.log(deterType(456));
console.log(deterType("Hello"));
console.log(deterType(true));

//Exercise 10
function longestCountry(countries) {
 return countries.reduce((longest, current) =>
 current.length > longest.length ? current : longest
 );
}

console.log(longestCountry(["USA", "South Africa", "Australia", "India"]));

//Advanced Exercises
//Exercise 11 - array and string
function arrayAverage(array) {
 const sum = array.reduce((acc, val) => acc + val, 0);
 return sum / array.length;
}

console.log(arrayAverage([10, 20, 30, 40, 50]));

//Exercise 12 - 2 equations 
function celToFahren(c) {
  return (c * 9/5) + 32;
}

function fahrenToCel(f) {
  return (f - 32) * 5/9;
}

console.log(celToFahren(0)); 
console.log(fahrenToCel(32)); 

//Exercise 13 - Switch Statement
function simpleCalculator(num1, num2, operation) {
    switch (operation) {
    case "+": return num1 + num2;
    case "-": return num1 - num2;
    case "*": return num1 * num2;
    case "/": return num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
    default: return "Invalid operation";
  }
}

console.log(simpleCalculator(20, 5, "+"));