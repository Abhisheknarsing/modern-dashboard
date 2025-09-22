"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Package,
  UserCheck,
  PieChart,
  TrendingUp,
} from "lucide-react";

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    children: [
      {
        id: "overview",
        label: "Overview",
        icon: PieChart,
        href: "/dashboard/analytics/overview",
      },
      {
        id: "reports",
        label: "Reports",
        icon: TrendingUp,
        href: "/dashboard/analytics/reports",
      },
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: ShoppingCart,
    href: "/dashboard/commerce",
    children: [
      {
        id: "orders",
        label: "Orders",
        icon: Package,
        href: "/dashboard/commerce/orders",
      },
      {
        id: "products",
        label: "Products",
        icon: Package,
        href: "/dashboard/commerce/products",
      },
    ],
  },
  {
    id: "crm",
    label: "CRM",
    icon: Users,
    href: "/dashboard/crm",
    children: [
      {
        id: "contacts",
        label: "Contacts",
        icon: Users,
        href: "/dashboard/crm/contacts",
      },
      {
        id: "leads",
        label: "Leads",
        icon: UserCheck,
        href: "/dashboard/crm/leads",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function Sidebar({ isCollapsed = false, onToggle, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        "touch-manipulation", // Better touch handling on mobile
        className
      )}
    >
      {/* Header */}
      <div className="flex h-14 sm:h-16 items-center justify-between border-b px-3 sm:px-4">
        <div className={cn(
          "flex items-center space-x-2 transition-all duration-300 ease-in-out",
          isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
        )}>
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary flex items-center justify-center">
            <LayoutDashboard className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-base sm:text-lg whitespace-nowrap">Dashboard</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-accent transition-colors duration-200 touch-manipulation"
        >
          <div className="transition-transform duration-300 ease-in-out">
            {isCollapsed ? (
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </div>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-1 sm:p-2 overflow-y-auto">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            pathname={pathname}
          />
        ))}
      </nav>
    </div>
  );
}

interface SidebarItemProps {
  item: MenuItem;
  isCollapsed: boolean;
  pathname: string;
}

function SidebarItem({ item, isCollapsed, pathname }: SidebarItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const hasChildren = item.children && item.children.length > 0;

  React.useEffect(() => {
    if (isCollapsed) {
      setIsExpanded(false);
    }
  }, [isCollapsed]);

  if (isCollapsed) {
    return (
      <div className="relative group">
        <Link href={item.href}>
          <Button
            variant={isActive ? "secondary" : "ghost"}
            size="icon"
            className="w-full h-9 sm:h-10 justify-center hover:scale-105 transition-all duration-200 touch-manipulation"
            title={item.label}
          >
            <item.icon className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </Link>
        {/* Enhanced Tooltip */}
        <div className="absolute left-full ml-2 top-0 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg text-sm whitespace-nowrap border">
            {item.label}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover border-l border-b rotate-45"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center">
        <Link href={item.href} className="flex-1">
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className="w-full justify-start h-9 sm:h-10 hover:bg-accent transition-colors duration-200 touch-manipulation text-sm sm:text-base"
          >
            <item.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-2 transition-transform duration-200 group-hover:scale-110" />
            <span className="transition-all duration-200">{item.label}</span>
          </Button>
        </Link>
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 ml-1 hover:bg-accent transition-colors duration-200 touch-manipulation"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronRight
              className={cn(
                "h-2 w-2 sm:h-3 sm:w-3 transition-transform duration-300 ease-in-out",
                isExpanded && "rotate-90"
              )}
            />
          </Button>
        )}
      </div>
      {hasChildren && (
        <div className={cn(
          "ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          {item.children?.map((child) => (
            <Link key={child.id} href={child.href}>
              <Button
                variant={pathname === child.href ? "secondary" : "ghost"}
                className="w-full justify-start h-7 sm:h-8 text-xs sm:text-sm hover:bg-accent transition-all duration-200 hover:translate-x-1 touch-manipulation"
              >
                <child.icon className="h-2 w-2 sm:h-3 sm:w-3 mr-2" />
                {child.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}