import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  increment,
  decrement,
  addAmount,
  reset,
  loadCounters,
} from "./counterSlice";

import {
  selectCounter1,
  selectCounter2,
  selectTotal,
  selectHighestCounter,
  selectIsEqual,
  selectLoading,
  selectError,
} from "./counterSelectors";

function Counter() {
  const dispatch = useDispatch();

  const counter1 = useSelector(selectCounter1);
  const counter2 = useSelector(selectCounter2);

  const total = useSelector(selectTotal);
  const highest = useSelector(selectHighestCounter);
  const isEqual = useSelector(selectIsEqual);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [amount, setAmount] = useState("");

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>Redux Toolkit Smart Counter</h1>

      <hr />

      <h2>Counter 1 : {counter1}</h2>

      <h2>Counter 2 : {counter2}</h2>

      <h2>Total : {total}</h2>

      <h2>Highest Counter : {highest}</h2>

      <h2>
        Are Both Equal ? {isEqual ? "Yes ✅" : "No ❌"}
      </h2>

      <hr />

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button
        onClick={() => dispatch(decrement())}
        style={{ marginLeft: "10px" }}
      >
        Decrement
      </button>

      <br />
      <br />

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        style={{ marginLeft: "10px" }}
        disabled={amount === ""}
        onClick={() => dispatch(addAmount(Number(amount)))}
      >
        Add Amount
      </button>

      <br />
      <br />

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>

      <button
        style={{ marginLeft: "10px" }}
        onClick={() => dispatch(loadCounters())}
      >
        Load Counters
      </button>

      <br />
      <br />

      {loading && <h3>Loading...</h3>}

      {error && <h3 style={{ color: "red" }}>{error}</h3>}
    </div>
  );
}

export default Counter;
