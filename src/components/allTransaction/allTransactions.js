import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import AllTransaction from "./allTransaction";
import Loading from "../../utils/loading";
import { setSearch, setType, reset } from "../../features/filter/filterSlice";
import { fetchTransectionThank } from "../../features/transection/transectionSlice";
import Form from "../form";

export default function AllTransactions() {
  // const [search, setSearch] = useState("");

  const { type, search } = useSelector((state) => state.filter);
  const { visibleEditFormInAllTransactionPage } = useSelector(
    (state) => state.transactions
  );

  const dispatch = useDispatch();
  const { transactions, isLoading, isError, errors } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransectionThank({ type, search }));
  }, [dispatch, type, search]);

  let content;
  if (!isError && isLoading) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    content = <div className="error">{errors}</div>;
  }
  if (!isLoading && !isError && transactions.length === 0) {
    content = <div>No Transaction found!</div>;
  }
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions
      .map((transaction) => (
        <AllTransaction key={transaction.id} transaction={transaction} />
      ))
      .reverse();
  }

  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };
  let hi = debounce(handleChange, 300);

  return (
    <>
      <div className="all_transaction_page_header">
        <p className="second_heading">My Transactions:</p>
        <p className="reset_btn" onClick={() => dispatch(reset())}>
          Reset
        </p>
      </div>

      <div className="all_transaction_page_menu" style={{ margin: "20px 0" }}>
        <div className="input_and_label">
          <input
            id="income"
            type="radio"
            name="incomeOrexpense"
            checked={type === "income"}
            readOnly
          />
          <label
            id="incomeId"
            htmlFor="income"
            // onClick={() => incomeOrExpense("income")}
            onClick={() => dispatch(setType("income"))}
          >
            Income
          </label>
          <input
            id="expense"
            type="radio"
            name="incomeOrexpense"
            checked={type === "expense"}
            readOnly
          />
          <label
            htmlFor="expense"
            // onClick={() => incomeOrExpense("expense")}
            onClick={() => dispatch(setType("expense"))}
          >
            Expense
          </label>
        </div>
        <div>
          <input
            type="search"
            placeholder="Search"
            onChange={hi}
            // value={search}
          />
        </div>
      </div>
      {/* form */}
      {visibleEditFormInAllTransactionPage && <Form />}
      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
}
