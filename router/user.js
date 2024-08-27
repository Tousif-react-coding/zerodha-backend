const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Assuming you have a User model
const bcrypt = require("bcrypt"); // To compare hashed passwords
const jwt = require("jsonwebtoken"); // For generating JWT tokens

router.post("/signup", (req , res) => {
  let {name,email , password } = req.body;
  //hashing pssword
bcrypt.hash(password , 10)
.then((hashedPassword)=>{
  let user = new User({name , email , password : hashedPassword});
  user.save()
   // return success if the new user is added to the database successfully
   .then((result) => {
    res.status(201).send({
      message: "User Created Successfully",
      result,
    });
  })
  // catch error if the new user wasn't added successfully to the database
  .catch((error) => {
    res.status(500).send({
      message: "Error creating user",
      error,
    });
  });

})
.catch((e)=>{
  res.status(500).send({
    message:"Password was not hashed successfully",
  })
  e;
  console.log(e);
})
})
//login
router.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});


module.exports = router;