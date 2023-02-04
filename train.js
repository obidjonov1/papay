/* M-Task: shunday Member class tuzing, uning bir private
 counts nomli state bolsin, hamda bu classni 3ta methodlari bolsin, ular 
 addMember, removeMember, inform. 
      
  Masalan: member.addMember(5) hech qanday log chiqmasin, 
  member.removeMember(2) bunda ham log kerakmas va member.inform() 
  bizga memberlar soni 3ta chiqarsin.
 */
class Member {
  constructor() {
    this._counts = 0;
  }

  addMember(amount) {
    this._counts += amount;
  }

  removeMember(amount) {
    this._counts = Math.max(this._counts - amount, 0);
  }

  inform() {
    console.log(`number of members: ${this._counts}`);
  }
}

const member = new Member();

member.addMember(5);
member.removeMember(2);
member.inform(); // number of members: 3


/* 




*/

/* 📌  L-Task: String bolib kelgan argumentni ichidagi sonni hisoblab 
javobini butun qilib return qilsin. Masalan: Calculate("1+1") 
return qilsin 2, calculate("4*5") return qilsin 20. */
/* function calculate(stringNum) {
  return eval(stringNum);
}
console.log(calculate("1 + 1")); // return 2
console.log(calculate("4 * 5")); // return 20
 */
