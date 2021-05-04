import { useState } from "react";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

const Job = ({ jobLength, id }) => {
  const [popver, togglePopover] = useState(false);
  const toggle = () => togglePopover(!popver);

  return (
    <>
      <div
        className="task-block"
        id={"job" + id}
        // onClick={() => setJob(id)}
        style={{
          width: 50 * jobLength
        }}
      >
        Task Details
      </div>
      <Popover
        placement="bottom"
        isOpen={popver}
        target={"job" + id}
        toggle={toggle}
      >
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>
          Sed posuere consectetur est at lobortis. Aenean eu leo quam.
          Pellentesque ornare sem lacinia quam venenatis vestibulum.
        </PopoverBody>
      </Popover>
    </>
  );
};

export default Job;
