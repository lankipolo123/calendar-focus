import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { EventInput } from '@fullcalendar/core';
import { useRef, useState, useEffect } from 'react';
import MainCalendar from '@/components/calendar-components/main-calendar';
import CalendarHeader from '@/components/calendar-components/main-calendar-header';
import { showBookingFailed, showBookingSuccess, showPastDateError } from '@/components/calendar-components/main-calendar-toast';
import BookingDialog from '@/components/calendar-components/calendar-booking-dialog';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Calendar', href: '/customer/calendar' }];

interface PageProps extends SharedData {
  events: EventInput[];
}

export default function Index() {
  const { events } = usePage<PageProps>().props;
  const { setData, post } = useForm({ date: '', location: 'Ben-lor Bldg' });

  const calendarRef = useRef<any>(null);
  const [monthLabel, setMonthLabel] = useState('');
  const [pendingDateRange, setPendingDateRange] = useState<DateRange>({ from: new Date(), to: new Date() });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    const currentDate = calendarApi?.getDate();
    if (currentDate) {
      setMonthLabel(
        new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
        }).format(currentDate)
      );
    }
  }, []);

  const handlePrev = () => {
    calendarRef.current?.getApi()?.prev();
    updateMonthLabel();
  };

  const handleNext = () => {
    calendarRef.current?.getApi()?.next();
    updateMonthLabel();
  };

  const updateMonthLabel = () => {
    const calendarApi = calendarRef.current?.getApi();
    const currentDate = calendarApi?.getDate();
    if (currentDate) {
      setMonthLabel(
        new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
        }).format(currentDate)
      );
    }
  };

  const handleDateClick = (arg: { dateStr: string }) => {
    const today = new Date().toISOString().split("T")[0];
    if (arg.dateStr < today) {
      showPastDateError();
      return;
    }

    const clicked = new Date(arg.dateStr);
    setPendingDateRange({ from: clicked, to: clicked });
    setDialogOpen(true);
  };

  const handleBookingConfirm = (
    location: string,
    roomType: string,
    range: DateRange,
    days: number
  ) => {
    if (!range.from) return;
    setData('date', format(range.from, "yyyy-MM-dd"));
    setData('location', location);
    post('/customer/calendar', {
      onSuccess: () => {
        showBookingSuccess();
        setDialogOpen(false);
      },
      onError: showBookingFailed,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Calendar" />
      <div className="h-screen flex overflow-hidden">
        <div className="flex-1 flex-col overflow-hidden">
          <div className="p-4 flex-1 overflow-hidden">
            <div className="h-full flex flex-col bg-white shadow rounded-xl overflow-hidden">
              <CalendarHeader
                currentMonth={monthLabel}
                onPrev={handlePrev}
                onNext={handleNext}
                branch="Ben-lor Bldg"
                onBranchChange={() => {}}
                search=""
                onSearchChange={() => {}}
              />
              <div className="flex-1 min-h-0 overflow-hidden">
                <MainCalendar
                  events={events}
                  onDateClick={handleDateClick}
                  calendarRef={calendarRef}
                />
                <BookingDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  onConfirm={handleBookingConfirm}
                  initialRange={pendingDateRange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
