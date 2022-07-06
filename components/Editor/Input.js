// This component decides how each input area looks like in editor
import { View, Text, StyleSheet } from "react-native"
import { TextInput } from "react-native"
import { GlobalStyles } from "../../constants/styles"

function Input ({ label, invalid, style, textInputConfig }) {

  const inputStyles = [styles.input]
  //Using multiline style when check mutiline is true
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }
  //Output invalid alert when check invalid is true
  if (invalid) {
    inputStyles.push(styles.invalidInput)
  }


  return (

    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        // blurOnSubmit={true}
        style={inputStyles} {...textInputConfig} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,

  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary500,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,

  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  }
})