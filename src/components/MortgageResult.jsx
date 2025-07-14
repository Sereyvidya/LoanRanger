import React from "react";
import { formatWithCommas } from "../utils/helper";
import { translations } from "../utils/translation";

const MortgageResult = ({ language, repayment, total }) => {
  const {
    yourResults,
    yourResultsMessage,
    repaymentHeader,
    totalHeader,
    resultsShown,
    completeFormMessage,
  } = translations[language];

  return (
    <div className="bg-dark-cyan relative flex w-full flex-col items-center justify-center overflow-hidden sm:w-1/2 sm:rounded-r-2xl">
      <div className="absolute bottom-0 left-0 hidden h-[50px] w-[50px] bg-white sm:block"></div>
      <div className="bg-dark-cyan absolute bottom-0 left-0 hidden h-[50px] w-[50px] rounded-bl-full sm:block"></div>
      {repayment !== "-1" ? (
        <div className="flex flex-col px-6 py-5">
          <h1 className="font-semibold text-white">{yourResults}</h1>
          <p className="text-gray mt-3 text-xs">{yourResultsMessage}</p>
          <div className="bg-midnight border-lime border-t-3 mt-5 rounded-md p-5">
            <p className="text-gray text-xs">{repaymentHeader}</p>
            <p className="text-lime mt-4 text-5xl font-semibold">
              ${formatWithCommas(repayment)}
            </p>
            <hr className="border-gray mt-8" />
            <p className="text-gray mt-8 text-xs">{totalHeader}</p>
            <p className="mt-4 text-2xl font-semibold text-white">
              ${formatWithCommas(total)}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <img src="./calculator.svg" className="w-40" />
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="font-medium text-white">{resultsShown}</h1>
            <p className="text-gray px-5 text-center text-xs">
              {completeFormMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageResult;
