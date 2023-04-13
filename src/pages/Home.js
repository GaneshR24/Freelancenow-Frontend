import React from "react";
import { useState, useEffect } from "react";
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, message, Row } from "antd";
import Project from "../components/Project";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [filters = {}, setFilters] = useState({});
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "https://freelancenow.onrender.com/api/projects/get-all-projects",
        tempFilters
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
      <div className="my-3 py-1">
        <Row gutter={10} align="center">
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="Company"
              value={filters.company}
              onChange={(e) =>
                setFilters({ ...filters, company: e.target.value })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="Category"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <select
              name=""
              id=""
              value={filters.workType}
              onChange={(e) =>
                setFilters({ ...filters, workType: e.target.value })
              }
            >
              <option value="">---Select Work Type---</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </Col>
          <Col lg={6} sm={24}>
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getProjects()}>
                Filter
              </button>
              <button
                className="outlined px-3"
                onClick={() => {
                  getProjects({
                    company: "",
                    category: "",
                    workType: "",
                  });
                  setFilters({
                    company: "",
                    category: "",
                    workType: "",
                  });
                }}
              >
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[15, 15]}>
          {projects.map((project) => (
            <Col lg={12} xs={24} sm={24}>
              <Project project={project} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Home;
