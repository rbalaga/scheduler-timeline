import "./styles.css";
import data from "./data.json";
import Header from "./Header";
import JobRows from "./JobRows";

const CatRows = ({ catjob, category }) => {
  return category.map((catNum, idx) => {
    return (
      <div className="tr">
        <div className="td td-category">
          <div className="category-holder">{catjob + idx}</div>
        </div>
        <JobRows jobs={category[idx].jobs} />
      </div>
    );
  });
};

export default function App() {
  const tempjobs = data.tempjobs;
  const tempjobsKeys = Object.keys(tempjobs);
  return (
    <div className="App">
      <div className="table">
        <Header />
        {tempjobsKeys.map((catjob) => (
          <CatRows key={catjob} catjob={catjob} category={tempjobs[catjob]} />
        ))}
      </div>
    </div>
  );
}
