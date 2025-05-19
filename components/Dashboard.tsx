import React from "react";

const Dashboard_Overview= () => {
  const stats = [
    { title: "Credit Tokens", value: 40, description: "Total Credit Tokenssss" },
    { title: "Active TSEs", value: 32, description: "Currently Active" },
    { title: "Terminated TSEs", value: 3, description: "No Longer in use" },
    { title: "Total Transactions", value: 324, description: "Total Top-Uped" },
  ];

  return (
    <div className="flex flex-col gap-5 p-5 w-full">
      <h1 className="text-[22px] font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-4 gap-5 w-full">
        {stats.map((item, index) => (
          <div
            key={index}
            className="h-32 w-full bg-gradient-to-b from-blue-300 flex flex-col justify-between to-blue-900 text-white px-4 py-3 rounded-lg shadow"
          >
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <h4 className="text-[20px] font-bold text-white">{item.value}</h4>
            <p className="text-[15px] font-medium opacity-90">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard_Overview;