
import { SidebarImageToggle } from '@/components/sidebar-image-toggle';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    role?: string;
}
export default ({ children, role, breadcrumbs, ...props }: AppLayoutProps) => (
  <>
    <Toaster position="top-center" visibleToasts={3} duration={2000} />
    <AppLayoutTemplate
      breadcrumbs={breadcrumbs}
      role={role}
      {...props}
    >
      <SidebarImageToggle />

      <div className="flex-1 h-full min-h-0 flex flex-col overflow-hidden">
        {children}
      </div>
    </AppLayoutTemplate>
  </>
);
