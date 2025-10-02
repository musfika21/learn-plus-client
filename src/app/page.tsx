import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Landing from "./(nondashboard)/landing/page";

export default function Home() {
  return (
    <div className="nonDashboard-layout">
      <NonDashboardNavbar/>
      <main>
        <Landing/>
      </main>
    </div>
  );
}
