import { Carousel } from "@/components/Carousel";
import SummaryStats from "@/components/SummaryStats";
import RoutinesList from "@/components/RoutinesList";

export default function LandingPage() {
  return (
    <div>
      <section>
        <Carousel />
      </section>
      <section>
        <SummaryStats />
      </section>
      <section>
        <RoutinesList />
      </section>
    </div>
  );
}
