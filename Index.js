const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 7000;


// Middleware to parse JSON body- PLUGIN
app.use(express.urlencoded({ extended: false }));


// HTML response
app.get("/users", (req, res) => {
  const html = `
    <ol style="margin-top: 30px p-6 space-y-7 ;">
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ol>
  `;
  res.send(html);
});




// JSON response
app.get("/api/users", (req, res) => {
  return res.json(users);
});



app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});



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

 


app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      return res.status(500).json({ status: "Error" });
    }

    return res.json({ status: "SUCCESS" });
  });
});
































app
  .route("/api/users/:id")

  // GET user by ID
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({ status: "Not Found" });
    }

    return res.json(user);
  })

  // PATCH (Edit) user by ID
  .patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ status: "Not Found" });
    }

    users[index] = { ...users[index], ...req.body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ status: "Error updating user" });
      }

      return res.json({ status: "Updated", user: users[index] });
    });
  })

  // DELETE user by ID
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ status: "Not Found" });
    }

    users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ status: "Error deleting user" });
      }

      return res.json({ status: "Deleted", id });
    });
  });













// Middleware to parse JSON body
app.use(express.json());

// POST route
app.post("/users", (req, res) => {
  const { first_name, last_name, email } = req.body;
  console.log("Received:", first_name, last_name, email);

  // Save to DB logic (for now, just send back)
  res.status(201).json({
    message: "User created successfully",
    data: { first_name, last_name, email },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
