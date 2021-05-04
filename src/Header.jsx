import { hours } from "./helpers";

const HoursRows = ({ timeLabel = false }) => {
  return hours.map((hr) => {
    return (
      <div key={hr} className="td">
        <span className="task-hours">{`${timeLabel ? hr + ": 00" : ""}`}</span>
      </div>
    );
  });
};

const Header = () => {
  return (
    <div className="tr tr-header">
      <div className="td td-category">{new Date().toDateString()}</div>
      <HoursRows timeLabel={true} />
    </div>
  );
};

export default Header;
