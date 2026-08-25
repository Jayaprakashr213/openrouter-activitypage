import { TopNavbar } from "./components/topBar";
import { Sidebar } from "./components/sideBar";
import { ActivityPage } from "./pages/activtyPage";

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <TopNavbar />

      <Sidebar />

      <main
        className="
          ml-[250px]
          min-h-screen
          pt-16
        "
      >
        <ActivityPage />
      </main>
    </div>
  );
}

export default App;