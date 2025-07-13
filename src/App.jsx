import React, { useState } from "react";
import CalculatorForm from "./components/CalculatorForm";
import MortgageResult from "./components/MortgageResult";
import "./index.css";

function App() {
  const [repayment, setRepayment] = useState("-1");
  const [total, setTotal] = useState("-1");
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-[800px] flex-col items-center justify-center sm:mx-auto sm:flex-row sm:items-stretch sm:px-10">
        <CalculatorForm setRepayment={setRepayment} setTotal={setTotal} />
        <MortgageResult repayment={repayment} total={total} />
      </div>
    </div>
  );
}

export default App;
