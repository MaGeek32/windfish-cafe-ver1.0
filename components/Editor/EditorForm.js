import { View, StyleSheet, Text, Alert, KeyboardAvoidingView } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import Input from "./Input"
import { useState } from "react"
import Button from "../UI/Button"
import { getFormattedDate } from "../../util/date"
import moment from 'moment'


function EditorForm ({ submitButtonLabel, onCancel, onSubmit, defaultValues, stories, description, isEditing }) {
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : '',
      isValid: true,
    },
    time: {
      value: defaultValues ? getFormattedDate(defaultValues.time) : '',
      // value: defaultValues,
      isValid: true,
    },
    characters: {
      value: defaultValues ? defaultValues.characters : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
      isValid: true,
    },
    content: {
      value: defaultValues ? defaultValues.content : '',
      isValid: true,
    },
  })

  function findArrayElementByTitle (array, description) {

    return array.find((element) => {
      return element.description === description
    })
  }


  function descriptionIsUnique (inputDescription) {
    const descriptionPool = stories.map((item) => item.description)

    if (isEditing) {
      if (descriptionPool.includes(inputDescription) && inputDescription != findArrayElementByTitle(stories, description).description) {
        return false
      }
      else {
        return true
      }

    } else {
      if (descriptionPool.includes(inputDescription)) {
        return false
      }
      else {
        return true
      }
    }


  }



  function inputChangeHandler (inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    })

  }


  function submitHandler () {
    const expenseData = {
      title: inputs.title.value,
      time: moment().format("DD-MM-YYYY"),
      characters: inputs.characters.value,
      description: inputs.description.value,
      content: inputs.content.value,
    }

    const descriptionIsValid = !isNaN(expenseData.description) && expenseData.description > 0 && descriptionIsUnique(expenseData.description)
    // const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const contentIsValid = expenseData.content.trim().length > 0
    const titleIsValid = expenseData.title.trim().length > 0
    const charactersIsValid = expenseData.characters.trim().length > 0
    if (!descriptionIsValid || !contentIsValid || !titleIsValid || !charactersIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values')
      setInputs((curInputs) => {
        return {
          description: { value: curInputs.description.value, isValid: descriptionIsValid },
          time: { value: curInputs.time.value, isValid: true },
          content: { value: curInputs.content.value, isValid: contentIsValid },
          title: { value: curInputs.title.value, isValid: titleIsValid },
          characters: { value: curInputs.characters.value, isValid: charactersIsValid },
        }
      })
      return
    }

    onSubmit(expenseData)
  }

  const formIsInvalid = !inputs.description.isValid || !inputs.content.isValid || !inputs.description.isValid || !inputs.characters.isValid


  return (


    <View style={styles.form}>
      <Text style={styles.pageTitle}>Story Editor</Text>
      <View style={styles.inputsRow}>
        <View style={styles.inputTitle}>
          <Input label="Title"
            invalid={!inputs.title.isValid}
            textInputConfig={{
              // multiline: true,
              // autocorrect: false,
              // autoCapitalize: 'none'
              onChangeText: inputChangeHandler.bind(this, 'title'),
              value: inputs.title.value,
              textAlign: 'center'

            }} />
        </View>
        {/* <View style={styles.inputFlex}>
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value,
          }} />
      </View> */}
      </View>
      <View style={styles.inputsRow}>
        <View style={styles.inputCharacters}>
          <Input label="Characters"
            invalid={!inputs.characters.isValid}
            textInputConfig={{
              // multiline: true,
              // autocorrect: false,
              // autoCapitalize: 'none'
              onChangeText: inputChangeHandler.bind(this, 'characters'),
              value: inputs.characters.value,
              textAlign: 'center'


            }} />
        </View>
        <View style={styles.inputTimeline}>
          <Input
            style={styles.rowInput}
            label="Timeline"
            invalid={!inputs.description.isValid}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangeHandler.bind(this, 'description'),
              value: inputs.description.value,
              textAlign: 'center'
            }} />
        </View>

      </View>

      <Input label="Content"
        invalid={!inputs.content.isValid}
        textInputConfig={{
          multiline: true,
          // autocorrect: false,
          // autoCapitalize: 'none'
          onChangeText: inputChangeHandler.bind(this, 'content'),
          value: inputs.content.value,
        }} />



      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - Timeline must be unique!</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}> Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
      <View style={styles.instructionContainer}>
        <Text style={styles.instruction}>You can input multiple characters by using "," such as "John, Paul, Geroge, Ringo"</Text>
      </View>
    </View>
  )
}

export default EditorForm

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  inputCharacters: {
    flex: 5
  },
  inputTimeline: {
    flex: 1
  },
  inputTitle: {
    flex: 1
  },
  form: {
    marginTop: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
    marginVertical: 24,
    textAlign: 'center',
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  instruction: {
    paddingTop: 50,
    color: GlobalStyles.colors.primary600,
    // fontWeight: 'bold',
    width: '90%',
    fontStyle: 'italic'


  },
  instructionContainer: {
    alignItems: 'center'
  }
})

