export const formatWithCommas = (value) => {
  if (value === null || value === undefined || value === "") return "";
  const num = Number(value.replaceAll(",", ""));

  if (isNaN(num)) return "";
  return Number(num).toLocaleString("en-UK");
};

export const calculate = (amt, term, rate, type) => {
  const principal = parseInt(amt);
  const annualRate = parseFloat(rate);
  const years = parseInt(term);
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  let repayment;
  let total;

  if (type === "repayment") {
    // Repayment mortgage
    repayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    total = repayment * totalMonths;
  } else {
    // Interest-only mortgage
    repayment = principal * monthlyRate;
    total = repayment * totalMonths + principal;
  }

  repayment = Math.round(repayment * 100) / 100;
  total = Math.round(total * 100) / 100;
  return { repayment, total };
};
