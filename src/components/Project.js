import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Project = ({ project }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card p-2">
        <h1 className="text-lg primary-text">{project.title}</h1>
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            <p className="text-sm">Company</p>
            <p className="text-sm">{project.company}</p>
          </div>

          <div>
            <p className="text-sm">Category</p>
            <p className="text-sm">{project.category}</p>
          </div>

          <div>
            <p className="text-sm">Amount</p>
            <p className="text-sm">₹ {project.amount} /-</p>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-end">
          <div>
            <p className="text-sm">Posted Date</p>
            <p className="text-sm">
              {moment(project.createdAt).format("DD-MM-YYYY")}
            </p>
          </div>

          <h1
            className="text-lg underline secondary-text"
            onClick={() => {
              navigate(`/apply-now/${project._id}`);
            }}
          >
            Apply Now
          </h1>
        </div>
      </div>
    </>
  );
};

export default Project;
