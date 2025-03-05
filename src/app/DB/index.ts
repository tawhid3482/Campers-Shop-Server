import config from "../config";
import { User_Role } from "../modules/users/user.constant";
import { User } from "../modules/users/user.model";

const superUser = {
  name:'Tawhidul Islam',
  email: "tawhidulislam3482@gmail.com",
  password: config.super_admin_password,
  needsPasswordChange: false,
  phone:'01826853371',
  role: User_Role.SUPER_ADMIN,
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({
    role: User_Role.SUPER_ADMIN,
  });
  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};
export default seedSuperAdmin;
