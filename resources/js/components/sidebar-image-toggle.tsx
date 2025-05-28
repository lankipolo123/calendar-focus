import { useSidebar } from "@/components/ui/sidebar";

export function SidebarImageToggle() {
  const { toggleSidebar, state } = useSidebar();

  const handleToggle = () => {
    toggleSidebar();

    // ✅ Wait for the collapse animation to finish (adjust timing as needed)
 setTimeout(() => {
    window.dispatchEvent(new Event('sidebar-resize'));
  }, 300); // Match your sidebar animation duration
  };

  return (
    <div
      onClick={handleToggle}
      className="cursor-pointer flex items-center justify-center w-8 h-8 absolute top-16 -left-5 z-30"
    >
      {state === "expanded" ? (
        <img src="/images/Vector.svg" alt="Collapse" className="w-full h-full" />
      ) : (
        <img src="/images/Vectorflip.svg" alt="Expand" className="w-full h-full" />
      )}
    </div>
  );
}
