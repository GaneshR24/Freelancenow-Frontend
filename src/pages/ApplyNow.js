import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, message, Row } from "antd";
import PageTitle from "../components/PageTitle";
import moment from "moment";

const ApplyNow = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [project, setProject] = useState(null);

  const getProject = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "https://freelancenow.onrender.com/api/projects/get-project-by-id",
        {
          _id: params.id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setProject(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const applyNow = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "https://freelancenow.onrender.com/api/applying/apply-project",
        {
          project: project._id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/applying");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <div>
        {project && (
          <div>
            <PageTitle title={project.title} className="projectheading" />
            <hr />
            <Row>
              <Col span={18}>
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex justify-content-between mt-1">
                    <span>Company</span>
                    <span>{project.company}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Category</span>
                    <span>{project.category}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Sub Category</span>
                    <span>{project.subCategory}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Skills</span>
                    <span>{project.skills}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Estimated Length</span>
                    <span>{project.estimatedLength}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Commitment Type</span>
                    <span>{project.commitmentType}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Work Type</span>
                    <span>{project.workType}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Amount</span>
                    <span>₹ {project.amount}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Posted Date</span>
                    <span>
                      {moment(project.createdAt).format("DD-MM-YYYY")}
                    </span>
                  </div>
                </div>
                <h5 className="underline uppercase my-3">
                  Project Description
                </h5>
                <span className="pt-2">{project.fullDescription}</span>

                <div className="d-flex gap-2 mt-3 justify-content-end">
                  <button
                    className="secondary-btn"
                    onClick={() => navigate("/")}
                  >
                    CANCEL
                  </button>

                  <button className="primary-btn" onClick={applyNow}>
                    APPLY NOW
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplyNow;
