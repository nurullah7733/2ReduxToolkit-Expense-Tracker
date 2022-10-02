import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Transaction from "./transection";
import { fetchTransectionThank } from "../../features/transection/transectionSlice";
import Loading from "../../utils/loading";
import { Link } from "react-router-dom";

export default function Transactions() {
  const dispatch = useDispatch();
  const { transactions, isLoading, isError, errors } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransectionThank({}));
  }, [dispatch]);

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
      .slice(-2)
      .map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))
      .reverse();
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul> <br />
        {transactions.length > 2 && (
          <Link to="/all-transaction" className="see_more_btn">
            See more
          </Link>
        )}
      </div>
    </>
  );
}
