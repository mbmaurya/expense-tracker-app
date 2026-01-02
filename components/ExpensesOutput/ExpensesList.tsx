import { Expenses } from "@/constants/type";
import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData: any) {
  return (
    <ExpenseItem
      id={itemData.item.id}
      description={itemData.item.description}
      date={itemData.item.date}
      amount={itemData.item.amount}
    />
  );
}

function ExpensesList({ expenses }: { expenses: Expenses[] }) {
  return <FlatList data={expenses} renderItem={renderExpenseItem} />;
}

export default ExpensesList;
