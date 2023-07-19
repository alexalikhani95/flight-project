import Airports from './airports/page';
import DelayedFlights from './delayedFlights/page';
import Flights from './flights/page';

export default function Home() {
  return (
    <div className="flex justify-evenly mt-10">
      <Flights />
    </div>
  );
}
