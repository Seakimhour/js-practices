for (let i = 1; i <= 20; i++) {
  let string = "";
  if (!(i % 3)) string = "fizz";
  if (!(i % 5)) string += "buzz";
  console.log(string || i);
}
