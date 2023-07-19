import Airports from './airports/page';
import DelayedFlights from './delayedFlights/page';
import Flights from './flights/page';

export default function Home() {
  return (
    <div className="flex justify-evenly mt-10">
      <div>
        <Airports />
      </div>
      <div>
        <Flights />
      </div>
      {/* <div>
        <DelayedFlights />
      </div> */}
    </div>
  );
}
