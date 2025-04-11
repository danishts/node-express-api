// const express = require("express");
// const users = require("./MOCK_DATA.json");

// const app = express();
// const PORT = 7000;

// // HTML response
// app.get("/users", (req, res) => {
//   const html = `
//     <ol style="margin-top: 30px p-6 space-y-7 ;">
//       ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//     </ol>
//   `;
//   res.send(html);
// });




// // JSON response
// app.get("/api/users", (req, res) => {
//   return res.json(users);
// });



// app.listen(PORT, () => {
//   console.log(`Server is running on port : ${PORT}`);
// });



// app
//   .route("/api/users/:id")

//   .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
//   })
//   .patch((req, res) => {
//     //Edit user with id
//     return res.json({ status: "Pending" });
//   })

//   .delete((req, res) => {
//     //Delete user with id
//     return res.json({ status: "Pending" });
//   });

//   app.post("/api/users", (req, res) => {
//     //todo: Create new user
//     return res.json({ status: "Pending" });
//   })



























