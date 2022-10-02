import React from "react";
import Balance from "../components/balance";
import Form from "../components/form";
import Transactions from "../components/transection/transections";

const home = () => {
  return (
    <div>
      <Balance />
      <Form />
      <Transactions />
    </div>
  );
};

export default home;
