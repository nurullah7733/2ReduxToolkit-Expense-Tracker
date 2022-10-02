import { useSelector } from "react-redux";
import numberWithCommas from "../utils/thusendComma";

export default function Balance() {
  const { transactions } = useSelector((state) => state.transactions);

  const income = transactions.filter((t) => t.type === "income");
  var totalIncome = 0;
  income.map((i) => {
    totalIncome += i.amount;
  });

  // Expense
  const expense = transactions.filter((t) => t.type === "expense");
  var totalExpense = 0;
  expense.map((i) => {
    totalExpense += i.amount;
  });

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        <span>{numberWithCommas(totalIncome - totalExpense)}</span>
      </h3>
    </div>
  );
}
