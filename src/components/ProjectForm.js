import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

const ProjectForm = ({
  showProjectForm,
  setShowProjectForm,
  type = "add",
  getData,
  selectedProject,
  setSelectedProject,
}) => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post(
          "https://freelancenow.onrender.com/api/projects/add-project",
          values
        );
      } else {
        response = await axiosInstance.put(
          "https://freelancenow.onrender.com/api/projects/update-project",
          {
            ...values,
            _id: selectedProject._id,
          }
        );
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowProjectForm(false);
      setSelectedProject(null);

      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  return (
    <Modal
      width={900}
      title={type === "add" ? "Add Project" : "Update Project"}
      open={showProjectForm}
      onCancel={() => {
        setSelectedProject(null);
        setShowProjectForm(false);
      }}
      footer={false}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedProject}
      >
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Project Title" name="title">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Company" name="company">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col lg={8} xs={24}>
            <Form.Item label="Category" name="category">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="SubCategory" name="subCategory">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="Skills" name="skills">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Commitment Type" name="commitmentType">
              <select name="Select Commitment Type" id="type">
                <option>--- Select Commitment Type ---</option>
                <option value="Part Time">Part Time</option>
                <option value="Full Time">Full Time</option>
                <option value="Contract">Contract</option>
              </select>
            </Form.Item>
          </Col>

          <Col lg={8} xs={24}>
            <Form.Item label="Work Type" name="workType">
              <select name="Select Work Type" id="workType">
                <option>--- Select Work Type ---</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </Form.Item>
          </Col>

          <Col lg={8} xs={24}>
            <Form.Item label="Estimated Length" name="estimatedLength">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col lg={8} xs={24}>
            <Form.Item label="Amount (₹)" name="amount">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={24} xs={24}>
            <Form.Item label="Description" name="fullDescription">
              <textarea rows={5} cols={83} type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <button className="primary-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProjectForm;
