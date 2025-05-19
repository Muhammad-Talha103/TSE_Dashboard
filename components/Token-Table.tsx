"use client";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { MdCheckCircle, MdCancel, MdMoreVert } from "react-icons/md";
import Link from "next/link";
import { Token } from "@/types/types";
import { getStatusBadge } from "@/utils/functions-Helper";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const TokenTable = ({ tokens = [] }: { tokens: Token[] }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div
      className={`${poppins.className} w-full hidden lg:block overflow-hidden`}
    >
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client ID
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metadata
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TSEs
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tokens.map((token, index) => (
                <tr
                  key={token.creditClientId || index}
                  className="hover:bg-gray-50"
                >
                  <td className="px-3 sm:px-4 md:px-6 py-4">
                    <div className="flex items-center">
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">
                          {token.creditClientId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-4">
                    <div className="text-xs sm:text-sm text-gray-900 truncate max-w-[60px] sm:max-w-[100px] md:max-w-none">
                      {token.metadata?.toUpperCase() || "N/A"}
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900">
                      {token.tseCount ?? 0}
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(token.state)}
                  </td>
                  <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-center text-sm font-medium relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      aria-label="Actions"
                    >
                      <MdMoreVert />
                    </button>
                    {activeDropdown === index && (
                      <div
                        className={`z-50 absolute right-0 sm:right-2 md:right-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 
    ${
      index < 5
        ? "top-full mt-2 origin-top-right"
        : "bottom-full mb-2 origin-bottom-right"
    }`}
                      >
                        <div className="py-1">
                          {token.tseSerialNumbers &&
                          token.tseSerialNumbers.length > 0 ? (
                            token.tseSerialNumbers.map(
                              (serialNumber, idx) =>
                                Number.parseInt(serialNumber, 10) !== 0 && (
                                  <Link
                                    key={serialNumber}
                                    href={`/tses-dashboard/${serialNumber}`}
                                  >
                                    <button className="cursor-pointer block w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100">
                                      {`TSE 0${idx + 1}`}
                                      <p className="text-[10px] sm:text-[12px] text-gray-600">
                                        Product Type:{" "}
                                        {token.productTypes &&
                                        token.productTypes.length > idx
                                          ? token.productTypes[idx]
                                          : "No product type available"}
                                      </p>
                                    </button>
                                  </Link>
                                )
                            )
                          ) : (
                            <p className="text-gray-700 text-center text-xs sm:text-sm">
                              No TSEs to show
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenTable;
