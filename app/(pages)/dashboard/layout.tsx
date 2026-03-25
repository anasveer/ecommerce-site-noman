import AdminSidebar from "./ui/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-120px] top-[-100px] h-[280px] w-[280px] rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute right-[-100px] top-[80px] h-[260px] w-[260px] rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[20%] h-[320px] w-[320px] rounded-full bg-indigo-200/30 blur-3xl" />
      </div>

      <div className="flex flex-col md:flex-row">
        <AdminSidebar />

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="rounded-[30px] border border-slate-200 bg-white/90 p-5 sm:p-6 shadow-[0_20px_60px_rgba(59,130,246,0.10)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}