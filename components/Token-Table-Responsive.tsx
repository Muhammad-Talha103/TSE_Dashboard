"use client";
import { Token } from "@/types/types";
import { getStatusBadge } from "@/utils/functions-Helper";
import Link from "next/link";
import React, { useState } from "react";
import { MdCancel, MdCheckCircle, MdMoreVert } from "react-icons/md";

const TokenTableResponsive = ({ tokens = [] }: { tokens: Token[] }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className="lg:hidden w-full max-w-full  text-white grid grid-cols-1 grid-cols-custom-2 grid-cols-custom-3 gap-7">
      {tokens.map((token, index) => (
        <div
          key={index}
          className="h-[200px] bg-[#1A1A1A] rounded-2xl flex flex-col gap-2 p-2"
        >
          <p className="text-white text-[15px] ">
            CLient Id :{" "}
            <span className="text-[13px]">{token.creditClientId}</span>
          </p>
          <p className="text-white text-[15px] ">
            Metadata :{" "}
            <span className="text-[13px]">
              {" "}
              {token.metadata?.toUpperCase() || "N/A"}
            </span>
          </p>
          <p className="text-white text-[15px] ">
            TSEs : <span className="text-[13px]">{token.tseCount}</span>
          </p>
          <p className="text-white text-[15px] flex gap-1 items-center ">
            Status{" "}
            <span className="text-[13px] w-full">
              {getStatusBadge(token.state)}
            </span>
          </p>
          <div className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
            <button
              onClick={() => toggleDropdown(index)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Actions"
            >
              <MdMoreVert />
            </button>
            {activeDropdown === index && (
              <div className="origin-top-right z-50 absolute right-0 sm:right-2 md:right-10 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenTableResponsive;
