//This component decides what all items within editor looks like

import { View, StyleSheet, Text, Alert, KeyboardAvoidingView } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import Input from "./Input"
import { useState } from "react"
import Button from "../UI/Button"
import { getFormattedDate } from "../../util/date"
import moment from 'moment'


function EditorForm ({ submitButtonLabel, onCancel, onSubmit, defaultValues, stories, description, isEditing }) {
  //Initialize a useState of inputs
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

  //Find the story by its timeline id
  function findArrayElementByTitle (array, description) {

    return array.find((element) => {
      return element.description === description
    })
  }

  //Check if a timeline id is unique or not
  function descriptionIsUnique (inputDescription) {
    const descriptionPool = stories.map((item) => item.description)
    //Updated condition, check if description id is the same as other stories, if not, return true. But can be the same as the story itself.
    if (isEditing) {
      if (descriptionPool.includes(inputDescription) && inputDescription != findArrayElementByTitle(stories, description).description) {
        return false
      }
      else {
        return true
      }

    }
    //Add new story condition, just check if description id is the same as other stories
    else {
      if (descriptionPool.includes(inputDescription)) {
        return false
      }
      else {
        return true
      }
    }

  }

  //Check if the input is the same with existed value or not
  function inputChangeHandler (inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    })

  }

  //When submit a story, create a story with the inputs 
  function submitHandler () {
    const storyData = {
      title: inputs.title.value,
      time: moment().format("DD-MM-YYYY"),
      characters: inputs.characters.value,
      description: inputs.description.value,
      content: inputs.content.value,
    }
    //Check if all the inputs is valid or not
    const descriptionIsValid = !isNaN(storyData.description) && storyData.description > 0 && descriptionIsUnique(storyData.description)
    // const dateIsValid = storyData.date.toString() !== 'Invalid Date'
    const contentIsValid = storyData.content.trim().length > 0
    const titleIsValid = storyData.title.trim().length > 0
    const charactersIsValid = storyData.characters.trim().length > 0
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
    onSubmit(storyData)
  }

  const formIsInvalid = !inputs.description.isValid || !inputs.content.isValid || !inputs.description.isValid || !inputs.characters.isValid

  return (
    //Date will be automatically input by using current date
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

