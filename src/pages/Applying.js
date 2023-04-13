import React from "react";
import { useEffect, useState } from "react";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import PageTitle from "../components/PageTitle";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

const Applying = () => {
  const dispatch = useDispatch();
  const [applying, setApplying] = useState([]);

  const getApplying = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get(
        "https://freelancenow.onrender.com/api/applying/get-applying-by-user-id",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((applying) => {
          return {
            ...applying,
            ...applying.project,
            key: applying._id,
          };
        });
        setApplying(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getApplying();
  }, []);

  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "project",
    },
    {
      title: "Project Title",
      dataIndex: "title",
      key: "project",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "project",
    },
    {
      title: "Work Type",
      dataIndex: "workType",
      key: "project",
    },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
      key: "project",
    },
  ];

  return (
    <>
      <PageTitle title="Applying" />
      <div className="mt-2">
        <Table dataSource={applying} columns={columns} />
      </div>
    </>
  );
};

export default Applying;
