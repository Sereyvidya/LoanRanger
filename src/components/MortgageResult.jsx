import React from "react";
import { formatWithCommas } from "../utils/helper";

const MortgageResult = ({ repayment, total }) => {
  return (
    <div className="bg-dark-cyan relative flex w-full flex-col items-center justify-center overflow-hidden sm:w-1/2 sm:rounded-r-2xl">
      <div className="absolute bottom-0 left-0 hidden h-[50px] w-[50px] bg-white sm:block"></div>
      <div className="bg-dark-cyan absolute bottom-0 left-0 hidden h-[50px] w-[50px] rounded-bl-full sm:block"></div>
      {repayment !== "-1" ? (
        <div className="flex flex-col px-6 py-5">
          <h1 className="font-semibold text-white">Your Results</h1>
          <p className="text-gray mt-3 text-xs">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click "calculate
            repayments" again.
          </p>
          <div className="bg-midnight border-lime border-t-3 mt-5 rounded-md p-5">
            <p className="text-gray text-xs">Your monthly repayments</p>
            <p className="text-lime mt-4 text-5xl font-semibold">
              ${formatWithCommas(repayment)}
            </p>
            <hr className="border-gray mt-8" />
            <p className="text-gray mt-8 text-xs">
              Total you'll repay over the term
            </p>
            <p className="mt-4 text-2xl font-semibold text-white">
              ${formatWithCommas(total)}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <img src="./calculator.svg" className="w-40" />
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="font-medium text-white">Results shown here</h1>
            <p className="text-gray px-5 text-center text-xs">
              Complete the form and click "calculate repayments" to see what
              your monthly repayments would be.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageResult;
