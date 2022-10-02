import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransectionThank,
  changeTransectionThank,
  editInActive,
  setVisibleEditFormInAllTransactionPage,
} from "../features/transection/transectionSlice";
import Loading from "../utils/loading";

export default function Form() {
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, isError, errors } = useSelector(
    (state) => state.transactions
  );
  const { name, id, type, amount } = useSelector(
    (state) => state.transactions.edit
  );

  const [addTransectionInput, setAddTransectionInput] = useState({
    name: "",
    type: "income",
    amount: "",
  });

  useEffect(() => {
    if (id) {
      setAddTransectionInput({
        name: name,
        type: type,
        amount: amount,
      });
      setIsEdit(true);
    } else {
      reset();
      setIsEdit(false);
    }
  }, [name, id, type, amount]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddTransectionInput({
      ...addTransectionInput,
      [name]: value,
    });
  };

  // reset form
  const reset = () => {
    setAddTransectionInput({ name: "", type: "income", amount: "" });
    setIsEdit(false);
    dispatch(editInActive());
    dispatch(setVisibleEditFormInAllTransactionPage());
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const name = addTransectionInput.name;
    const type = addTransectionInput.type;
    const amount = Number(addTransectionInput.amount);
    dispatch(addTransectionThank({ name, type, amount }));
    reset();
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      name: addTransectionInput.name,
      type: addTransectionInput.type,
      amount: addTransectionInput.amount,
    };
    dispatch(changeTransectionThank({ id, data }));
    reset();
    dispatch(setVisibleEditFormInAllTransactionPage());
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={isEdit ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="name"
            id="transaction_name"
            placeholder="My Salary"
            value={addTransectionInput.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              id="transaction_type"
              type="radio"
              value="income"
              name="type"
              checked={addTransectionInput.type === "income"}
              onChange={handleChange}
              required
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              id="transaction_type2"
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={addTransectionInput.type === "expense"}
              onChange={handleChange}
            />
            <label htmlFor="transaction_type2">Expense</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="300"
            name="amount"
            onChange={handleChange}
            required
            value={addTransectionInput.amount}
          />
        </div>
        <button className="btn" type="submit" disabled={isLoading}>
          {isEdit ? "Update" : " Add Transaction"}{" "}
          {!isError && isLoading && <Loading />}
        </button>
        {!isLoading && isError && <span className="error">{errors}</span>}
      </form>

      {isEdit && (
        <button className="btn cancel_edit" onClick={reset}>
          Cancel Edit
        </button>
      )}
    </div>
  );
}
