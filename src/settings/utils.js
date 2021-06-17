import { Alert } from "react-native";

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