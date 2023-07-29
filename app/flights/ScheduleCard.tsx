import { scheduleData } from '@/types/types';

type Props = {
  schedule: scheduleData;
};

const ScheduleCard = ({ schedule }: Props) => {
  return (
    <div className="flex flex-col align-center mt-10 shadow-lg w-[300px] max-w-full bg-white p-5">
      <p className=" mb-3">Airline ICAO code: {schedule.airline_icao}</p>
      <p className="mb-3">Airline IATA code: {schedule.airline_iata}</p>
      <p className="mb-3">Arrival Gate: {schedule.arr_gate}</p>
      <p className="mb-3">Arrival Airport IATA code: {schedule.arr_iata}</p>
      <p className="mb-3">Arrival Airport ICAO code: {schedule.arr_icao}</p>
      <p className="mb-3">Arrival Airport Terminal: {schedule.arr_terminal}</p>
      <p className="mb-3">
        Estimated Arrival time in the airport time zone: {schedule.arr_time}
      </p>
      <p className="mb-3">
        Actual departure time in the airport time zone: {schedule.dep_actual}
      </p>
      <p className="mb-3">
        Updated departure time in the airport time zone:{' '}
        {schedule.dep_estimated}
      </p>
      <p className="mb-3">Departure Airport Gate: {schedule.dep_gate}</p>
      <p className="mb-3">Departure Airport Terminal: {schedule.dep_gate}</p>
      <p className="mb-3">
        Departure time in the airport time zone: {schedule.dep_time}
      </p>
      <p className="mb-3">
        Estimated flight duration (in minutes): {schedule.duration}
      </p>
      <p className="mb-3">Flight status: {schedule.status}</p>
    </div>
  );
};
export default ScheduleCard;
