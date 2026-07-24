import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-[#070a10]">
      {/* Fixed Animated Navbar */}
      <Navbar />

      {/* Main Content (pt-20 matches fixed navbar height) */}
      <main className="flex-1 w-full pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
