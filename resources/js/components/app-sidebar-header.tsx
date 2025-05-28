import { Breadcrumbs } from '@/components/breadcrumbs';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  return (
   <header className="border-sidebar-border/50 flex h-20 items-center border-b px-6 md:px-4 transition-[width,height] ease-linear overflow-x-hidden">
      <div className="w-full overflow-x-hidden whitespace-nowrap text-ellipsis">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    </header>
  );
}
