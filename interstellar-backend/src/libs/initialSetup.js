import Role from "../models/Role";
import User from "../models/User";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    // Count documents
    const count = await Role.estimatedDocumentCount();

    // Check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "pilot" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // Check for an existing admin user
  const user = await User.findOne({ email: "admin@admin.com" });
  // Get roles _id
  const roles = await Role.find({ name: { $in: ["admin", "pilot"] } });

  if (!user) {
    // Create a new admin user
    await User.create({
      name: "Admin Admin",
      email: "admin@admin.com",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  }
};
