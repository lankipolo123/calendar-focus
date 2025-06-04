import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { EventInput } from '@fullcalendar/core';
import { useState, useRef, useEffect } from 'react';
import FullCalendar from '@/components/calendar-components/main-calendar'
import CalendarHeader from '@/components/calendar-components/main-calendar-header';
import AdminCalendarSidebar from '@/components/calendar-components/admin-calendar-sidebar';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Calendar', href: '/calendar' }];

interface PageProps extends SharedData {
  events: EventInput[];
}

export default function Index() {
  const { auth, events } = usePage<PageProps>().props;
  const calendarRef = useRef<any>(null);
  const [monthLabel, setMonthLabel] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [branch, setBranch] = useState('Main Branch');
  const [search, setSearch] = useState('');

  const updateMonthLabel = () => {
    const calendarApi = calendarRef.current?.getApi();
    const currentDate = calendarApi?.getDate();
    if (currentDate) {
      const formatted = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(currentDate);
      setMonthLabel(formatted);
    }
  };

  const handlePrev = () => {
    calendarRef.current?.getApi()?.prev();
    updateMonthLabel();
  };

  const handleNext = () => {
    calendarRef.current?.getApi()?.next();
    updateMonthLabel();
  };

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr);
    setSidebarOpen(true);
  };

  useEffect(() => {
    updateMonthLabel(); // Run once on load
  }, []);

  const bookingsForDate = events.filter((e) => e.start === selectedDate);

  return (
    <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role}>
      <Head title="Calendar" />
      <div className="h-screen flex overflow-hidden">
        <div className="flex-1 flex-col overflow-hidden">
          <div className="p-4 flex-1 overflow-hidden">
            <div className="h-full flex flex-col bg-white shadow rounded-xl overflow-hidden">
              <CalendarHeader
                currentMonth={monthLabel}
                onPrev={handlePrev}
                onNext={handleNext}
                branch={branch}
                onBranchChange={setBranch}
                search={search}
                onSearchChange={setSearch}
              />
              <div className="flex-1 min-h-0 overflow-hidden">
                <FullCalendar
                  events={events}
                  onDateClick={handleDateClick}
                  calendarRef={calendarRef}
                />
              </div>
            </div>
          </div>
        </div>
        {sidebarOpen && (
          <AdminCalendarSidebar
            date={selectedDate}
            bookings={bookingsForDate}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </AppLayout>
  );
}
