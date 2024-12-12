const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

async function setupAdmin() {
  await mongoose.connect("Your Database");

  const adminEmail = ""; //
  const adminPassword = "";

  // Check if an admin user already exists
  let adminUser = await User.findOne({ email: adminEmail });
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    adminUser = new User({
      userName: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    await adminUser.save();
    console.log("Admin user created.");
  } else {
    console.log("Admin user already exists.");
  }

  mongoose.connection.close();
}

setupAdmin().catch((err) => console.log(err));
