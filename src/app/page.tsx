import { Carousel } from "@/components/Carousel";
import SummaryStats from "@/components/SummaryStats";

export default function LandingPage() {
  return (
    <div>
      <section>
        <Carousel />
      </section>
      <section>
        <SummaryStats />
      </section>
    </div>
  );
}
