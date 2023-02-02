/* 📌  L-Task: String bolib kelgan argumentni ichidagi sonni hisoblab 
javobini butun qilib return qilsin. Masalan: Calculate("1+1") 
return qilsin 2, calculate("4*5") return qilsin 20. */
function calculate(stringNum) {
  return eval(stringNum);
}
console.log(calculate("1 + 1")); // return 2
console.log(calculate("4 * 5")); // return 20
