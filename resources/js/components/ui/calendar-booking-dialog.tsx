import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  date: string;
  onConfirm: (location: string) => void;
}

export default function BookingDialog({
  open,
  onClose,
  date,
  onConfirm,
}: BookingDialogProps) {
  const [selectedLocation, setSelectedLocation] = useState("GreatWork Business Campus");
  const [selectedRoomType, setSelectedRoomType] = useState("Private Office");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogDescription>
            Please confirm your booking for <strong>{date}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Select Location
          </label>
          <select
            id="location"
            name="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="GreatWork Business Campus">GreatWork Business Campus – Quezon Ave</option>
            <option value="GreatWork Studio">GreatWork Studio – Tomas Morato</option>
            <option value="GreatWork Mega Tower">GreatWork Mega Tower – Ortigas</option>
          </select>
        </div>
        <select
  value={selectedRoomType}
  onChange={(e) => setSelectedRoomType(e.target.value)}
>
  <option value="Private Office">Private Office</option>
  <option value="Dedicated Desk">Dedicated Desk</option>
  <option value="Hot Desk">Hot Desk</option>
  <option value="Meeting Room">Meeting Room</option>
  <option value="Event Space">Event Space</option>
  <option value="Virtual Office">Virtual Office</option>
</select>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              onConfirm(selectedLocation);
              onClose();
            }}
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
