import { Expenses } from "@/constants/type";
import React, { createContext, useReducer } from "react";

type ExpenseParams = {
  description?: string;
  amount?: number;
  date?: Date | string;
};

interface contextParams {
  expenses: Expenses[];
  setExpenses: (arg: Expenses[]) => void;
  addExpense: (arg: Expenses) => void;
  updateExpense: (id: string, {}: ExpenseParams) => void;
  deleteExpense: (id: string) => void;
}

export const ExpensesContext = createContext<contextParams>({
  expenses: [{}],
  addExpense: ({ description, amount, date }: ExpenseParams) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (
    id: string,
    { description, amount, date }: ExpenseParams
  ) => {},
});

function expensesReducer(state: Expenses[], action: any) {
  switch (action.type) {
    case "Add":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updatedItem = { ...updateableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: { children: React.ReactNode }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: ExpenseParams) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses: Expenses[]) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, expenseData: ExpenseParams) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
