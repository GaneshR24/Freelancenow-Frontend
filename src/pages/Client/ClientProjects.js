import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProjectForm from "../../components/ProjectForm";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosInstance";
import { message, Table } from "antd";

const ClientProjects = () => {
  const dispatch = useDispatch();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const { user } = useSelector((state) => state.users);
  const getProjects = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "https://freelancenow.onrender.com/api/projects/get-all-projects"
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

  const deleteProject = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "https://freelancenow.onrender.com/api/projects/delete-project",
        {
          _id: id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getProjects();
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

  const columns = [
    {
      title: "Project Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Work Type",
      dataIndex: "workType",
    },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i
            class="ri-delete-bin-line"
            onClick={() => {
              deleteProject(record._id);
            }}
          ></i>
          <i
            class="ri-pencil-line"
            onClick={() => {
              setSelectedProject(record);
              setShowProjectForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className="d-flex justify-content-between my-2 mx-3">
          <PageTitle title="Projects" />
          <button
            className="primary-btn"
            onClick={() => setShowProjectForm(true)}
          >
            Add Project
          </button>
        </div>

        <Table columns={columns} dataSource={projects} />

        {showProjectForm && (
          <ProjectForm
            showProjectForm={showProjectForm}
            setShowProjectForm={setShowProjectForm}
            type={selectedProject ? "edit" : "add"}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            getData={getProjects}
          />
        )}
      </div>
    </>
  );
};

export default ClientProjects;
