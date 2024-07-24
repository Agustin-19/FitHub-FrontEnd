import { Carousel } from "@/components/Carousel";
import SummaryStats from "@/components/SummaryStats";
import Programs from "@/components/Programs";
import CoachList from "@/components/CoachList";

export default function LandingPage() {
  return (
    <div>
      <div>
        <section className="mb-8 ">
          <Carousel />
        </section>
      </div>
      <section className="mb-10">
        <SummaryStats />
      </section>
      <section id="programs" className="mb-10">
        <Programs />
      </section>
      <section id="coaches" className="mb-10">
        <CoachList />
      </section>
    </div>
  );
}
