import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import Dashboard from "layouts/admin"; 


// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    path: "/admin/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
    layout: Dashboard,
  },
  {
    name: "NFT Marketplace",
    path: "/admin/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
    layout: Dashboard,
  },
  {
    name: "Data Tables",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/admin/data-tables",
    component: DataTables,
    layout: Dashboard,
  },
  {
    name: "Profile",
    path: "/admin/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
    layout: Dashboard
  },
  {
    name: "Logout",
    path: "/auth/logout",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
    layout: null
  },
];

export default routes;


export const publicRoutes = [
  {
    name: "Sign In",
    path: "/auth/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
    layout: null
  },
];