import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { formatWithCommas, calculate } from "../utils/helper";

const MAX_AMOUNT = 10000000;
const MAX_TERM = 50;
const MAX_RATE = 40;

const CalculatorForm = ({ setRepayment, setTotal }) => {
  const [formData, setFormData] = useState({
    amt: "",
    term: "",
    rate: "",
    type: "",
  });
  const [formError, setFormError] = useState({
    amtError: "",
    termError: "",
    rateError: "",
    typeError: "",
  });

  const clearForm = () => {
    setFormData({
      amt: "",
      term: "",
      rate: "",
      type: "",
    });
    setFormError({
      amtError: "",
      termError: "",
      rateError: "",
      typeError: "",
    });
    setRepayment("-1");
    setTotal("-1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amt, term, rate, type } = formData;
    const newErrors = {
      amtError: "",
      termError: "",
      rateError: "",
      typeError: "",
    };

    if (!amt) newErrors.amtError = "This field is required";
    if (!term) newErrors.termError = "This field is required";
    if (!rate) newErrors.rateError = "This field is required";
    if (!type) newErrors.typeError = "This field is required";

    setFormError(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) return;

    const { repayment, total } = calculate(amt, term, rate, type);
    setRepayment(String(repayment));
    setTotal(String(total));
    return;
  };

  const setAmount = (value) => {
    const raw = value.replaceAll(",", "");
    const amountRegex = /^\d*$/;
    if (amountRegex.test(raw)) {
      const amt = parseInt(raw);
      if (amt > MAX_AMOUNT) {
        setFormError((prev) => ({
          ...prev,
          amtError: "Max amount reached",
        }));
      } else if (amt < 0) {
        setFormError((prev) => ({
          ...prev,
          amtError: "Invalid amount",
        }));
      } else {
        setFormData((prev) => ({ ...prev, amt: raw }));
        setFormError((prev) => ({
          ...prev,
          amtError: "",
        }));
      }
    } else {
      setFormError((prev) => ({
        ...prev,
        amtError: "Invalid amount",
      }));
    }
  };

  const setTerm = (value) => {
    const raw = value.replaceAll(",", "");
    const termRegex = /^\d*$/;
    if (termRegex.test(raw)) {
      const term = parseInt(raw);
      if (term > MAX_TERM) {
        setFormError((prev) => ({
          ...prev,
          termError: "Max term reached",
        }));
      } else if (term < 0) {
        setFormError((prev) => ({
          ...prev,
          termError: "Invalid term",
        }));
      } else {
        setFormData((prev) => ({ ...prev, term: raw }));
        setFormError((prev) => ({
          ...prev,
          termError: "",
        }));
      }
    } else {
      setFormError((prev) => ({
        ...prev,
        termError: "Invalid term",
      }));
    }
  };

  const setRate = (value) => {
    const raw = value;
    const rateRegex = /^(\d+)?(\.\d{0,2})?$/;
    if (rateRegex.test(raw)) {
      const rate = parseFloat(raw);
      if (rate > MAX_RATE) {
        setFormError((prev) => ({
          ...prev,
          rateError: "Max rate reached",
        }));
      } else if (rate < 0) {
        setFormError((prev) => ({
          ...prev,
          rateError: "Invalid rate p",
        }));
      } else {
        // Store raw instead of the parsed
        setFormData((prev) => ({ ...prev, rate: raw }));
        setFormError((prev) => ({
          ...prev,
          rateError: "",
        }));
      }
    } else {
      setFormError((prev) => ({
        ...prev,
        rateError: "Invalid rate",
      }));
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 bg-white p-5 sm:w-1/2 sm:rounded-l-2xl">
      <div className="flex justify-between">
        <h1 className="text-dark-cyan font-bold">Mortgage Calculator</h1>
        <button
          className="text-gray mt-1 text-xs hover:underline"
          onClick={() => clearForm()}
        >
          Clear All
        </button>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <p className="text-gray text-sm">Mortgage Amount</p>
          <label
            className={`hover-input focus-within:bg-light-lime flex flex-row-reverse rounded-sm border ${formError.amtError ? "hover-error border-red-500" : "border-gray"}`}
          >
            <input
              type="text"
              className="text-dark-cyan peer h-[40px] w-full cursor-pointer rounded-r-sm px-3 text-sm font-bold focus:outline-none"
              value={formatWithCommas(formData.amt)}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <div
              className={`peer-focus:bg-lime peer-focus:text-dark-cyan ${formError.amtError ? "rounded-l-xs bg-red-500 text-white" : "bg-sky text-gray rounded-l-sm"} flex h-[40px] w-[45px] items-center justify-center`}
            >
              <FaDollarSign className="text-xl" />
            </div>
          </label>
          {formError.amtError && (
            <p className="text-xs text-red-500">{formError.amtError}</p>
          )}
        </div>

        <div className="flex w-full gap-5">
          <div className="flex w-1/2 flex-col gap-2">
            <p className="text-gray text-xs">Mortgage Term</p>
            <label
              className={`hover-input focus-within:bg-light-lime ${formError.termError ? "hover-error border-red-500" : "border-gray"} flex rounded-sm border`}
            >
              <input
                type="text"
                className="border-gray text-dark-cyan peer h-[40px] w-full cursor-pointer rounded-l-sm px-3 text-sm font-bold focus:outline-none"
                value={formData.term}
                onChange={(e) => {
                  setTerm(e.target.value);
                }}
              />
              <div
                className={`peer-focus:bg-lime peer-focus:text-dark-cyan ${formError.termError ? "rounded-r-xs bg-red-500 text-white" : "bg-sky text-gray rounded-r-sm"} flex h-[40px] w-[45px] items-center justify-center px-[10px]`}
              >
                <p className="text-xs font-bold">years</p>
              </div>
            </label>
            {formError.termError && (
              <p className="text-xs text-red-500">{formError.termError}</p>
            )}
          </div>

          <div className="flex w-1/2 flex-col gap-2">
            <p className="text-gray text-xs">Interest Rate</p>
            <label
              className={`hover-input focus-within:bg-light-lime ${formError.rateError ? "hover-error border-red-500" : "border-gray"} flex rounded-sm border`}
            >
              <input
                type="text"
                className="text-dark-cyan border-gray peer h-[40px] w-full cursor-pointer rounded-l-sm px-3 text-sm font-bold focus:outline-none"
                value={formData.rate}
                onChange={(e) => {
                  setRate(e.target.value);
                }}
              />
              <div
                className={`peer-focus:bg-lime peer-focus:text-dark-cyan ${formError.rateError ? "rounded-r-xs bg-red-500 text-white" : "bg-sky text-gray rounded-r-sm"} flex h-[40px] w-[45px] items-center justify-center px-[10px]`}
              >
                <p className="text-xs font-bold">%</p>
              </div>
            </label>
            {formError.rateError && (
              <p className="text-xs text-red-500">{formError.rateError}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray text-xs">Mortgage Type</p>
          <div className="flex flex-col gap-2">
            <label className="hover-input focus-within:bg-light-lime border-gray flex h-[40px] items-center gap-3 rounded-sm border px-4">
              <input
                type="radio"
                name="mortgageType"
                value="repayment"
                className="focus:accent-lime accent-gray"
                checked={formData.type === "repayment"}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, type: "repayment" }));
                  setFormError((prev) => ({ ...prev, typeError: "" }));
                }}
              />
              <p className="text-dark-cyan text-sm font-bold">Repayment</p>
            </label>

            <label className="hover-input focus-within:bg-light-lime accent-gray border-gray flex h-[40px] items-center gap-3 rounded-sm border px-4">
              <input
                type="radio"
                name="mortgageType"
                value="repayment"
                className="focus:accent-lime accent-gray"
                checked={formData.type === "interestOnly"}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, type: "interestOnly" }));
                  setFormError((prev) => ({ ...prev, typeError: "" }));
                }}
              />
              <p className="text-dark-cyan text-sm font-bold">Interest Only</p>
            </label>
            {formError.typeError && (
              <p className="text-xs text-red-500">{formError.typeError}</p>
            )}
          </div>
        </div>

        <button className="bg-lime hover:bg-light-lime border-lime focus:bg-light-lime mt-3 flex h-[40px] cursor-pointer items-center justify-center gap-1 rounded-full border transition-shadow duration-200 ease-in-out hover:border-2 hover:ring-2 hover:ring-[rgba(217,219,48,0.5)] focus:outline-none">
          <FaCalculator className="text-dark-cyan" />
          <p className="text-dark-cyan text-sm font-bold">
            Calculate Repayments
          </p>
        </button>
      </form>
    </div>
  );
};

export default CalculatorForm;
