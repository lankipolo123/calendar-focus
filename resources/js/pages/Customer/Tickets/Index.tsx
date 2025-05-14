import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
// import TicketModal from '@/components/TicketModal'; // 👈 Import the modal component
// import TicketTable from '@/components/TicketTable';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tickets',
    href: '/customer/ticket',
  },
];

interface Ticket {
  name: string;
  category: string;
  details: string;
  date_requested: string;
  approved_by: string;
  last_updated: string;
  status: string;
  ticket_number: string;
}

export default function Index({tickets}: { tickets?: Ticket[] }) {
  const [showModal, setShowModal] = useState(false);

  const { data, setData, post, errors, processing } = useForm({
    category: '',
    location: '',
    details: '',
  });

console.log(tickets);

  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Tickets" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
            {/* Button to Open Modal */}
            {/* <button
              onClick={() => setShowModal(true)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              New Ticket
            </button> */}

            {/* Modal Overlay */}
            {/* {showModal && (
              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
                <div className="relative">
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-2 right-2 text-xl font-bold text-gray-600"
                  >
                    &times;
                  </button>
                  <TicketModal
                    data={data}
                    setData={setData}
                    post={post}
                    processing={processing}
                    errors={errors}
                    onClose={() => setShowModal(false)} // 👈 Close function
                  />
                </div>
              </div>
            )} */}
            

              {/* {<TicketTable tickets = {tickets} />} */}
          </div>
        </div>
      </AppLayout>
    </>
  );
}
