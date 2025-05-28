import { useSidebar } from "@/components/ui/sidebar";

export default function AppLogo2() {
  const { open } = useSidebar();

  return (
    <div className="flex justify-center items-center h-30 w-full">
      <img
        src={open ? "/images/GWlogo.svg" : "/images/logo.svg"}
        alt="Sidebar Logo"
        className={`object-contain transition-all duration-300 ${
          open ? "w-400 h-400" : "w-100 h-400"
        }`}
      />
    </div>
  );
}
