import { hours } from "./helpers";
import moment from "moment";
import Job from "./Job";
const hoursCnt = hours.length;
const cellUnit = (1 / hoursCnt).toFixed(2);

const HoursRows = ({ timeLabel = false, jobs }) => {
  const verifyJobHour = (hour) => {
    if (jobs) {
      for (let idx = 0; idx < jobs.length; idx++) {
        const job = jobs[idx];
        const plannedStartTime = job.schedule.plannedStartTime.replaceAll(
          "Z",
          ""
        );
        const plannedEndTime = job.schedule.plannedEndTime.replaceAll("Z", "");
        const startHour = moment(plannedStartTime).hour();
        const endHour = moment(plannedEndTime).hour();
        if (hour === startHour) {
          let jobLength =
            endHour > hours[hours.length - 1]
              ? hours[hours.length - 1] - startHour + 1
              : endHour - startHour + 1;
          let id = job.schedule.id;
          return [id, jobLength];
        } else if (
          startHour < hours[0] &&
          endHour >= hours[0] &&
          hour === hours[0]
        ) {
          let jobLength =
            endHour > hours[hours.length - 1]
              ? hours.length
              : endHour - hours[0] + 1;
          let id = job.schedule.id;
          return [id, jobLength];
        }
      }
    }
    return false;
  };

  const verifyJobActive = (hour) => {
    if (jobs) {
      for (let idx = 0; idx < jobs.length; idx++) {
        const job = jobs[idx];
        const plannedStartTime = job.schedule.plannedStartTime.replaceAll(
          "Z",
          ""
        );
        const plannedEndTime = job.schedule.plannedEndTime.replaceAll("Z", "");
        const startHour = moment(plannedStartTime).hour();
        const endHour = moment(plannedEndTime).hour();
        if (hour >= startHour && hour <= endHour) {
          return true;
        }
      }
    }
    return false;
  };

  const verifyEarlyStart = (hr) => {
    if (jobs) {
      for (let idx = 0; idx < jobs.length; idx++) {
        const job = jobs[idx];
        const plannedStartTime = job.schedule.plannedStartTime.replaceAll(
          "Z",
          ""
        );
        const plannedEndTime = job.schedule.plannedEndTime.replaceAll("Z", "");
        const startHour = moment(plannedStartTime).hour();
        const endHour = moment(plannedEndTime).hour();
        if (
          hr >= startHour &&
          hr <= endHour &&
          startHour < hours[0] &&
          endHour >= hours[0]
        ) {
          const jobLength = endHour - startHour + 1;
          const id = job.schedule.id;
          return [id, jobLength];
        }
      }
    }
    return false;
  };

  return hours.map((hr) => {
    const jobDetails = verifyJobHour(hr);
    // const previousHrDetails = verifyEarlyStart(hr);
    const activeJob = verifyJobActive(hr);
    let [id, jobLength] = jobDetails ? jobDetails : [];
    // [id, jobLength] = !jobDetails && verifyEarlyStart(hr) ? previousHrDetails : [];
    // if (verifyEarlyStart(hr)) {
    //   console.log("early started:", hr, hours[0], jobLength);
    // }
    // jobLength = verifyEarlyStart(hr)
    //   ? jobLength - hr - hours[0] + 1
    //   : jobLength;

    return (
      <div key={hr} className={`td ${activeJob ? "myjob" : "nojob"}`}>
        {jobDetails ? <Job key={id} jobLength={jobLength} id={id} /> : ""}
      </div>
    );
  });
};

export default HoursRows;
