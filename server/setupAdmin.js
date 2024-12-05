const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

async function setupAdmin() {
  await mongoose.connect("mongodb+srv://kn579309:eUQ7eAmKe.Ly2n5@cluster0.l3ply.mongodb.net/");

  const adminEmail = "khainguyen999999@gmail.com"; //
  const adminPassword = "12345";

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
