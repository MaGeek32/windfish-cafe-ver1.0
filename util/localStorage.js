//A component manage local storage by using AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

//The function add a story
export async function storeStory (storyData) {
  //Get current stories first
  try {
    const getStories = JSON.parse(await AsyncStorage.getItem('stories'))
    // console.log(getStories)
    const arr = []
    if (getStories) {
      getStories.map(
        storyItem => {
          arr.push(storyItem)
        }
      )
    }
    // console.log(arr)
    // add a story to current stories
    arr.push(storyData)
    // console.log("step2:" + arr)

    await AsyncStorage.setItem(
      'stories', JSON.stringify(arr)
    )
  } catch (error) {
    // Error saving data
    console.log(error)
  }


}

//The function get all stories
export async function fetchStories () {
  //uncomment below line when need to clean data
  // removeData()
  //Get current stories
  const response = await AsyncStorage.getItem('stories')
  const stories = []
  // console.log(JSON.parse(response))
  //Set stories in storyObj
  if (response != null) {
    JSON.parse(response).map((story) => {
      const storyObj = {
        // id: new Date().toString() + Math.random().toString(),
        title: story.title,
        time: story.time,
        characters: story.characters,
        description: story.description,
        content: story.content,
      }
      stories.push(storyObj)
    })
  }
  // console.log('Stories:')
  // console.log(stories)
  return stories
}


//The function update a story
export async function updateStory (description, storyData) {
  const arr = []
  //Get stories first
  try {
    const getStories = JSON.parse(await AsyncStorage.getItem('stories'))
    if (getStories) {
      getStories.map(
        storyItem => {
          arr.push(storyItem)
        }
      )
    }

    const updateArr = arr.map(obj => {
      // 👇️ if id equals timeline id replace object
      if (obj.description === description) {
        return {
          description: storyData.description,
          content: storyData.content,
          characters: storyData.characters,
          time: storyData.time,
          title: storyData.title
        }
      } else {
        return obj
      }
    })
    // console.log("Update Arr")
    // console.log(updateArr)

    await AsyncStorage.setItem(
      'stories', JSON.stringify(updateArr)
    )
  } catch (error) {
    // Error saving data
    console.log(error)
  }


}
//The function delete a story
export async function deleteStory (description) {
  //Get all stories
  const arr = []
  try {
    const getStories = JSON.parse(await AsyncStorage.getItem('stories'))
    // console.log(getStories)
    if (getStories) {
      getStories.map(
        storyItem => {
          arr.push(storyItem)
        }
      )
    }
    // console.log(arr)
    // console.log("step2:" + arr)
    //Delete the selected story
    const deleteArr = arr.filter(story => {
      return story.description !== description
    })
    // console.log('delete arr')
    // console.log(deleteArr)
    await AsyncStorage.setItem(
      'stories', JSON.stringify(deleteArr)
    )
  } catch (error) {
    // Error saving data
    console.log(error)
  }


}

//The function remove all data
export async function removeData () {
  try {
    const savedUser = await AsyncStorage.clear()
  } catch (error) {
    console.log(error)
  }
};
//The function remove the value within stories
export async function removeItem () {
  try {
    await AsyncStorage.removeItem("stories")
  } catch (error) {
    console.log(error)
  }
}