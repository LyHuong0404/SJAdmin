import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdLock,
  MdSupervisorAccount,
  MdManageAccounts,
  MdStoreMallDirectory,
  MdSync,
  MdOutlineWork 
} from "react-icons/md";


import MainDashboard from "views/admin/default";
import AccountsPage from "views/admin/accounts";
import Profile from "views/admin/profile";
import DataTables from "views/admin/transactions";
import Stores from "views/admin/stores";
import Dashboard from "layouts/admin"; 
import ServicePackage from "views/admin/servicepackage";
import ForgotPassword from "views/admin/forgotpassword";
import LogInCentered from "views/auth/logIn";

const routes = [
  {
    name: "Main Dashboard",
    path: "/admin/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
    layout: Dashboard,
  },
  {
    name: "Accounts",
    path: "/admin/account-management",
    icon: (
      <Icon
        as={MdSupervisorAccount}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: AccountsPage,
    secondary: true,
    layout: Dashboard,
  },
  {
    name: "Stores",
    icon: <Icon as={MdStoreMallDirectory } width='20px' height='20px' color='inherit' />,
    path: "/admin/stores-management",
    component: Stores,
    layout: Dashboard,
  },
  {
    name: "Transactions",
    icon: <Icon as={MdSync} width='20px' height='20px' color='inherit' />,
    path: "/admin/transactions-management",
    component: DataTables,
    layout: Dashboard,
  },
  {
    name: "Service Package",
    icon: <Icon as={MdOutlineWork } width='20px' height='20px' color='inherit' />,
    path: "/admin/package-management",
    component: ServicePackage,
    layout: Dashboard,
  },
  {
    name: "Profile",
    path: "/admin/profile",
    icon: <Icon as={MdManageAccounts} width='20px' height='20px' color='inherit' />,
    component: Profile,
    layout: Dashboard
  }
];

export default routes;


export const publicRoutes = [
  {
    name: "Log In",
    path: "/auth/log-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: LogInCentered,
    layout: null
  },
  {
    name: "Forgot Password",
    path: "/auth/forgot-password",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: ForgotPassword,
    layout: null
  },
];