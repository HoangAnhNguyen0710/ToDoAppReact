import { Link } from "react-router-dom";

function Footer(props) {
  const count = () => {
    return props.tasks.filter((task) => task.hasDone === true).length !== 0
      ? "clear completed"
      : "";
  };
  return (
    <div className="col-5 bg-white">
      <div className='border border-1  href=""px-3 py-1 d-flex align-items-center'>
        <span className="m-0 fs-6 me-4">
          {props.tasks.length - props.done} items left{" "}
        </span>
        <div className="list-group list-group-horizontal flex-fill">
          <Link className="list-group-item py-0 px-1" to="/">
            All
          </Link>
          <Link className="list-group-item py-0 px-1" to="/active">
            Active
          </Link>
          <Link className="list-group-item py-0 px-1" to="/completed">
            Completed
          </Link>
        </div>
        <button
          className="m-0 fs-6 ms-4 btn"
          onClick={props.deleteAllCompleted}
        >
          {count()}
        </button>
      </div>
    </div>
  );
}

export default Footer;
