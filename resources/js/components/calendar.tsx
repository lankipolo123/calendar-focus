import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { useEffect, useRef, RefObject } from 'react';

interface CalendarProps {
  events: EventInput[];
  onDateClick?: (arg: { dateStr: string }) => void;
  calendarRef?: RefObject<any>;
}

export default function Calendar({ events, onDateClick, calendarRef }: CalendarProps) {
  const internalRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullCalendarRef = calendarRef || internalRef;

  useEffect(() => {
    const resize = () => {
      fullCalendarRef.current?.getApi()?.updateSize();
    };

    window.addEventListener('resize', resize);
    window.addEventListener('sidebar-resize', resize);

    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('sidebar-resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-0 overflow-hidden">
      <FullCalendar
        ref={fullCalendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={onDateClick}
        headerToolbar={false}
        height="100%"
        contentHeight="auto"
        fixedWeekCount={false}
        dayMaxEventRows={3}
        eventContent={(arg) => {
          const users: string[] = arg.event.extendedProps.users || [];
          const title = arg.event.title || '';

          if (users.length > 0) {
            const visible = users.slice(0, 3);
            const overflow = users.length > 3 ? `+${users.length - 3}` : null;

            return (
              <div className="flex gap-1 items-center">
                {visible.map((name, i) => {
                  const initial = name.trim()[0]?.toUpperCase() || '?';
                  return (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center"
                    >
                      {initial}
                    </div>
                  );
                })}
                {overflow && (
                  <span className="text-[10px] text-muted-foreground">{overflow}</span>
                )}
              </div>
            );
          }

          const initial = title.trim().split(' ').pop()?.[0]?.toUpperCase() || '?';
          return (
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                {initial}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
