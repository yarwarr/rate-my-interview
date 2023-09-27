import { NavItem } from "../../types"

export type DashboardConfig = {
  sidebarNav: NavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Account",
      href: "/settings/account",
      icon: "user",
      items: [],
    }
  ],
}
