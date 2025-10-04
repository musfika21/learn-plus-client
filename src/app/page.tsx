import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Landing from "./(nondashboard)/landing/page";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="nonDashboard-layout">
      <NonDashboardNavbar/>
      <main>
        <Landing/>
      </main>
      <Footer/>
    </div>
  );
}
