import { useState } from "react";

import { AnnouncementBanner } from "./components/announcementBanner";
import { TopNavbar } from "./components/topBar";
import { Sidebar } from "./components/sideBar";
import { ActivityPage } from "./pages/activtyPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [announcementVisible, setAnnouncementVisible] =
    useState(true);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      
      {announcementVisible && (
        <AnnouncementBanner
          onClose={() => setAnnouncementVisible(false)}
        />
      )}

      <TopNavbar
        onMenuClick={() => setSidebarOpen(true)}
        announcementVisible={announcementVisible}
      />

    <Sidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  announcementVisible={announcementVisible}
/>

      <main
        className={`
          min-h-screen
          lg:ml-[250px]
          ${
            announcementVisible
              ? "pt-[calc(var(--top-nav-height)+3rem)]"
              : "pt-[var(--top-nav-height)]"
          }
        `}
      >
        <ActivityPage />
      </main>
    </div>
  );
}

export default App;