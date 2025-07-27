import { useState } from "react";

const App = () => {
  const [expenseArray, setExpenseArray] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  function addExpense() {
    if (!expenseName.trim() || !expenseAmount) return;
    if (isNaN(Number(expenseAmount))) return;

    setExpenseArray([
      ...expenseArray,
      {
        name: expenseName.trim(),
        amount: Number(expenseAmount),
      },
    ]);
    setExpenseAmount("");
    setExpenseName("");
  }

  function deleteExpense(index) {
    const filteredExpenses = expenseArray.filter((_, i) => {
      return i != index;
    });
    setExpenseArray(filteredExpenses);
  }

  let totalExpenses = 0;
  expenseArray.forEach((expense) => {
    totalExpenses += expense.amount;
  });
  return (
    <>
      <div className="min-h-[90vh] flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold text-center">Expense Tracker 💵</h1>
        <div className="mt-5 flex flex-col items-center md:block gap-y-3">
          <input
            type="text"
            placeholder="Enter expense"
            className="border border-gray-300 p-2 rounded-md mr-3 outline-0"
            onChange={(e) => setExpenseName(e.target.value)}
            value={expenseName}
          />
          <input
            type="text"
            placeholder="Enter amount"
            className="border border-gray-300 p-2 rounded-md mr-3 outline-0"
            onChange={(e) => setExpenseAmount(e.target.value)}
            value={expenseAmount}
          />
          <button
            onClick={addExpense}
            className="bg-green-500 p-2 text-white font-bold px-4 rounded-lg"
          >
            Add
          </button>
        </div>
        {expenseArray.length > 0 && (
          <div className="mt-4 border border-gray-300 max-w-full pb-2">
            {expenseArray.map((expenseObject, index) => {
              return (
                <div
                  className="flex justify-between items-center gap-x-6 max-w-full md:w-[600px] p-2"
                  key={index}
                >
                  <p className="ml-2">{expenseObject.name}</p>
                  <p>${expenseObject.amount.toFixed(2)}</p>
                  <button
                    onClick={() => deleteExpense(index)}
                    className="bg-red-400 p-2 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
            <p className="pl-3 pt-2">
              Total:{" "}
              <span className="font-semibold">${totalExpenses.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
