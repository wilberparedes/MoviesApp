import { Alert } from "react-native";

export const headerAxios = (Token = null) => {
  const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (Token !== null) {
    const token = `Bearer ${Token}`;
    return token === undefined ? false : { ...header, Authorization: token };
  }
  return header;
}

export const alertOK = ({title, message, cancel = true}) => {
  Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: cancel},
  );
}