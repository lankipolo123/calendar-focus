import { NavFooter } from '@/components/nav-footer';
import { NavHead } from '@/components/nav-head';
import { NavUser } from '@/components/nav-user';
import { NavAccount} from '@/components/nav-accounting';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { AccountingItems, DailyOperation, type NavItem } from '@/types';
import { Navmain} from '@/components/nav-main';
import { Link } from '@inertiajs/react';
import { LayoutGrid, LucideAlbum, LucideBriefcase, LucideCalendar, LucideCalendarDays, LucideTicket, LucideUser, Settings, Wallet,  } from 'lucide-react';
import AppLogo2 from './app-logo2';

const Overview: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

// const DailyOp: DailyOperation[] = [
//     {
//         title: "Reservations",
//         href: "/reservations",
//         icon: LucideCalendarDays,
//       },
//       {
//         title: "Calendar",
//         href: "/calendar",
//         icon: LucideCalendar,

//       },
//       {
//         title: "Ticket",
//         href: "/ticket",
//         icon: LucideTicket,

//       },
//       {
//         title: "User",
//         href: "/user",
//         icon: LucideUser,

//       },
//       {
//         title: "Log",
//         href: "/logs",
//         icon: LucideBriefcase,
//       },
// ];

const Accounting: AccountingItems[] = [
    {
        title: 'Payment',
        href: '/payment',
        icon: Wallet,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '/settings/profile',
        icon: Settings,
    },
];

interface AppSidebarProps {
    role?: string; // Add the role prop
}

export function AppSidebar({role}: AppSidebarProps) {

    const baseDailyOp: DailyOperation[] = [
        {
            title: "Appointments",
            href: "/appointment",
            icon: LucideAlbum,
        },

        {
            title: "Calendar",
            href: "/customer/calendar",
            icon: LucideCalendar,
        },
        {
            title: "Ticket",
            href: "/customer/ticket",
            icon: LucideTicket,
        }   
    ];

    // Admin-only items
    const adminOnlyItems: DailyOperation[] = [
        {
            title: "User",
            href: "/user",
            icon: LucideUser,
        },
        {
            title: "Log",
            href: "/logs",
            icon: LucideBriefcase,
        },
        {
            title: "Reservations",
            href: "/reservations",
            icon: LucideCalendarDays,
        },
        {
            title: "Calendar",
            href: "/calendar",
            icon: LucideCalendar,
        },
        {
            title: "Ticket",
            href: "/ticket",
            icon: LucideTicket,
        },
        
    ];
    // Merge base with admin-only if role is admin
    const DailyOp = role === 'admin'
        ? [...adminOnlyItems,]
        : baseDailyOp;
    
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader className=" border-b  bg-white">
                <SidebarMenu >
                    <SidebarMenuItem className="bg-white">
                        <SidebarMenuButton size="lg" asChild >
                            <Link href="/dashboard" prefetch>
                                <AppLogo2/>
                            </Link>
                        </SidebarMenuButton >
                    </SidebarMenuItem>
                    {/**must be add here**/}
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className='bg-white'>
                <NavHead items={Overview} />
                <Navmain items={DailyOp} />
                {role === 'admin' && <NavAccount items={Accounting} />}
            </SidebarContent>
            <SidebarFooter className='bg-white'>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
