// hash-password.js
import bcrypt from "bcryptjs";

const plain = "12Akash@"; // yahan apna admin ka plain password do
const saltRounds = 10;

bcrypt.hash(plain, saltRounds).then(hash => {
  console.log("HASH:", hash);
}).catch(err => console.error(err));
