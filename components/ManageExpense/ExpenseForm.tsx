import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { Expenses } from "@/constants/type";
import getFormatedDate from "@/util/date";
import Button from "../UI/Button";
import Input from "./Input";

interface ExpenseFormProps {
  onCancel: () => void;
  showButtonLabel: string;
  onSubmit: (arg: Expenses) => void;
  defaultValues?: Expenses;
}

function ExpenseForm({
  onCancel,
  showButtonLabel,
  onSubmit,
  defaultValues,
}: ExpenseFormProps) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount!.toString() : "",
    date: defaultValues ? getFormatedDate(defaultValues.date!) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  function inputChangedHandler(inputIdentifier: any, enteredValue: any) {
    setInputValues((curInputValues) => {
      return { ...curInputValues, [inputIdentifier]: enteredValue };
    });
  }
  const amountChangeHandler = () => {};

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description!.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid input", "Please check your input values");
      return;
    }

    onSubmit(expenseData);
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          onChangeText={inputChangedHandler.bind(this, "amount")}
          value={inputValues.amount}
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          onChangeText={inputChangedHandler.bind(this, "date")}
          value={inputValues.date}
        />
      </View>
      <Input
        label="Description"
        multiline={true}
        onChangeText={inputChangedHandler.bind(this, "description")}
        value={inputValues.description}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {showButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
