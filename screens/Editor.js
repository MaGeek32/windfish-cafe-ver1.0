//A page show the story editor
//To do: add an story content editor individually 

import { useContext, useLayoutEffect, useState, useEffect } from "react"
import { View, StyleSheet, Keyboard, Alert, TouchableWithoutFeedback } from "react-native"
import IconButton from "../components/UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import { StoriesContext } from "../store/stories-context"
import EditorForm from "../components/Editor/EditorForm"
import { storeStory, updateStory, deleteStory } from '../util/localStorage'
import LoadingOverlay from "../components/UI/LoadingOverlay"
import ErrorOverlay from "../components/UI/ErrorOverlay"
import { fetchStories } from '../util/localStorage'

function Editor ({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const storiesCtx = useContext(StoriesContext)
  const editedStoryDes = route.params?.storyDes
  const isEditing = !!editedStoryDes
  const [error, setError] = useState()
  //Get selected story
  const selectedStory = storiesCtx.stories.find(
    (story) => story.description === editedStoryDes
  )

  const [isFetching, setIsFetching] = useState(true)
  //get all stories
  const getStories = storiesCtx.stories

  //Check if is an update or add a new story
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Story' : 'Add Story'

    })
  }, [navigation, isEditing])

  useEffect(() => {
    async function getStories () {
      setIsFetching(true)
      try {
        const stories = await fetchStories()
        storiesCtx.setStory(stories)
      } catch (error) {
        console.log(error)
        setError('Could not fetch stories!')
      }
      setIsFetching(false)
    }

    getStories()
  }, [])

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }



  // function deleteStoryHandler () {
  //   storiesCtx.deleteStory(editedStoryId)
  //   navigation.goBack()
  // }

  function cancelHandler () {
    navigation.goBack()
  }

  async function deleteStoryHandler () {
    setIsSubmitting(true)
    //Delete confirmation
    try {
      Alert.alert(
        "Confirm Delete?",
        "This is an irrevocable action!",

        [{
          text: "Confirm",
          onPress: () => {
            deleteStory(editedStoryDes)
            storiesCtx.deleteStory(editedStoryDes)
            navigation.goBack()
          }
        }, {
          text: "Cancel",
          onPress: () => {
            // navigation.goBack()
          }
        }]
      )

    } catch (error) {
      setError('Could not delete story - please try again later!')
      setIsSubmitting(false)
    }
  }
  //Confirm story changed
  async function confirmHandler (storyData) {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        storiesCtx.updateStory(editedStoryDes, storyData)
        await updateStory(editedStoryDes, storyData)
      } else {
        await storeStory(storyData)
        storiesCtx.addStory({ ...storyData })
      }
      navigation.goBack()

    }

    catch (error) {
      setError('Could not save data - please try again later!')
      setIsSubmitting(false)
    }
  }



  return (
    //Allow click any place to dismiss the keyboard
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <EditorForm submitButtonLabel={isEditing ? 'Update' : 'Add'}
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          defaultValues={selectedStory}
          stories={getStories}
          description={editedStoryDes}
          isEditing={isEditing}

        />


        {isEditing && (

          <View style={styles.deleteContainer}>
            <IconButton
              // onPress={createTwoButtonAlert}
              onPress={deleteStoryHandler}
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Editor

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary500,
    alignItems: 'center',
  },

})