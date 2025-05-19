"use client";

import type React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FiDatabase,
  FiUsers,
  FiFileText,
  FiClock,
  FiBarChart2,
  FiPieChart,
  FiTrendingUp,
} from "react-icons/fi";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

export default function Home({ data }: { data: any }) {
  return (
    <div className="flex min-h-screen  w-full">
      <main className="flex-1 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Certification Dashboard
            </h1>
            <p className="text-gray-500 mt-2 dark:text-gray-400">
              TSE ID: <span className="text-[14px]">{data.serialNumber}</span>
            </p>
            <p className="text-gray-500 mt-2 dark:text-gray-400">
              Certification ID: {data.certificationId}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Storage Usage"
              value={`${data.storageUsed} `}
              total={`${data.storageCapacity} `}
              icon={<FiDatabase className="h-6 w-6" />}
              color="bg-blue-500"
            />

            <StatCard
              title="Registered Clients"
              value={data.numRegisteredClients}
              icon={<FiUsers className="h-6 w-6" />}
              color="bg-emerald-500"
            />

            <StatCard
              title="Signatures This Month"
              value={data.productTypeUsage?.signaturesCurrentMonth}
              total={`${data.productTypeUsage?.signatureLimit}`}
              icon={<FiFileText className="h-6 w-6" />}
              color="bg-purple-500"
            />

            <StatCard
              title="Signature Duration"
              value={`${data.productTypeUsage?.signatureDuration}`}
              icon={<FiClock className="h-6 w-6" />}
              color="bg-amber-500"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1  gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <FiPieChart className="h-5 w-5 text-emerald-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Signature Metrics Overview
                </h2>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Created Signatures",
                          value: data.createdSignatures,
                        },
                        {
                          name: "Signature Limit",
                          value: data.productTypeUsage?.signatureLimit,
                        },
                        {
                          name: "Signatures This Month",
                          value: data.productTypeUsage?.signaturesCurrentMonth,
                        },
                        {
                          name: "Slowdown Active",
                          value:
                            data.productTypeUsage
                              ?.slowdownActiveSignatureDuration,
                        },
                        {
                          name: "Slowdown Inactive",
                          value:
                            data.productTypeUsage
                              ?.slowdownInactiveSignatureDuration,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#10b981" />
                      <Cell fill="#f59e0b" />
                      <Cell fill="#ef4444" />
                      <Cell fill="#8b5cf6" />
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value}`, name]}
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        borderColor: "#374151",
                        color: "#F9FAFB",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 👇 Summary Below Chart */}
              <div className=" text-sm text-gray-600 dark:text-gray-300 space-y-1 ">
                <p>
                  📄 <strong>Created Signatures:</strong>{" "}
                  {data.createdSignatures}
                </p>
                <p>
                  📊 <strong>Signature Limit:</strong>{" "}
                  {data.productTypeUsage?.signatureLimit}
                </p>
                <p>
                  📅 <strong>Signatures This Month:</strong>{" "}
                  {data.productTypeUsage?.signaturesCurrentMonth}
                </p>
                <p>
                  ⏱️ <strong>Slowdown Active:</strong>{" "}
                  {data.productTypeUsage?.slowdownActiveSignatureDuration}{" "}
                </p>
                <p>
                  💤 <strong>Slowdown Inactive:</strong>{" "}
                  {data.productTypeUsage?.slowdownInactiveSignatureDuration}{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <FiBarChart2 className="h-5 w-5 text-amber-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Storage Overview
              </h2>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: "Storage",
                      capacity: data.storageCapacity,
                      used: data.storageUsed,
                      remaining: data.storageCapacity - data.storageUsed,
                    },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderColor: "#374151",
                      color: "#F9FAFB",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="capacity"
                    name="Storage Capacity"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="used"
                    name="Used Storage"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="remaining"
                    name="Remaining Storage"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Started Transactions"
              value={data.numStartedTransactions}
              icon={<FiBarChart2 className="h-5 w-5" />}
              color="text-blue-500"
            />
            <MetricCard
              title="Billing Period Months"
              value={data.productTypeUsage?.billingPeriodMonths}
              icon={<FiFileText className="h-5 w-5" />}
              color="text-purple-500"
            />
            <MetricCard
              title="Software Version"
              value={data.softwareVersion}
              icon={<FiFileText className="h-5 w-5" />}
              color="text-amber-500"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  total?: string;
  percentage?: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({
  title,
  value,
  total,
  percentage,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {value}
          </p>
          {total && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              of {total}
            </p>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg text-white`}>{icon}</div>
      </div>

      {percentage !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${color}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {percentage.toFixed(0)}% used
          </p>
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, icon, color }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center mb-2">
        <div className={`${color} mr-2`}>{icon}</div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-3xl font-bold text-gray-800 dark:text-white">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
