
import {q,fql_migrate, client} from "../node_modules/fauna.js/src/main.mjs"
const {Collection, Ref} = q;

const docs = [];
const collections = [
  "Account", "Screen_Name",
  "Profile", "Contact",
  "Contact_For_Screen_Name",
  "Club"
];

console.log(Collection("Account"));
console.log(Ref(Collection("Account"), '1'));
console.log(Ref(Collection("Account"), '1').raw?.ref?.raw?.collection);
// // Create collections.
// for (const x of collections) {
//   docs.push({ ref: Collection(x), history: 0 });
// } // for
//
//
// const results = await client.query(fql_migrate(docs));
//
// console.log(results);
