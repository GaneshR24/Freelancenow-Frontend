import React from "react";
import { useEffect, useState } from "react";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";

const AllUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get(
        "https://freelancenow.onrender.com/api/users/get-all-users"
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "",
      render: (data) => {
        console.log(data);
        if (data?.isClient) {
          return "Client";
        } else {
          return "Freelancer";
        }
      },
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between my-2">
        <PageTitle title="Users" />
      </div>

      <Table columns={columns} dataSource={users} />
    </>
  );
};

export default AllUsers;
