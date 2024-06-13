import React, { useEffect, useState } from "react";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale);

function CardPerformance() {
  const [getAllApprove, setGetAllApprove] = useState(0);
  const [getAllReject, setGetAllReject] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      const data = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setGetAllApprove(data.getAllApprove || 0);
      setGetAllReject(data.getAllReject || 0);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ["Approve", "Reject"],
    datasets: [
      {
        label: "Data",
        data: [getAllApprove, getAllReject],
        backgroundColor: ["#3559E0", "#D8A900", "#08DB43"],
        borderColor: ["#3559E0", "#D8A900", "#08DB43"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card-performance container-fluid">
      <div className="row">
        <div className="col-6">
          <div className="card card-wellnes-event-performance mt-5 ">
            <div className="title card-header header-wellnes-event-performance text-2xl fw-semibold color-palette-1">
              Data Performance
            </div>
            <div className="card-body d-flex justify-content-around">
              <div className="my-auto">
                <Bar data={chartData} options={chartOptions} />
              </div>
              <div className="card-text mt-3">
                <div>
                  <div className="text-lg mt-1">
                    <RiCheckboxBlankFill
                      className="me-1"
                      style={{ color: "#08DB43" }}
                    />
                    Approve: {getAllApprove} Data
                  </div>
                  <div className="text-lg mt-1">
                    <RiCheckboxBlankFill
                      className="me-1"
                      style={{ color: "#FF0000" }}
                    />
                    Rejected: {getAllReject} Data
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPerformance;
