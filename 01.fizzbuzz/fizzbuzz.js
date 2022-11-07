for (let i = 1; i <= 20; i++) {
  let string = "";
  if (!(i % 3)) string = "Fizz";
  if (!(i % 5)) string += "Buzz";
  console.log(string || i);
}
