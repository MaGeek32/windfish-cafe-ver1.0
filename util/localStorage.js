import AsyncStorage from '@react-native-async-storage/async-storage'

export async function storeStory (storyData) {

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

export async function fetchStories () {
  // removeData()
  const response = await AsyncStorage.getItem('stories')
  const stories = []
  // console.log(JSON.parse(response))
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
  console.log('Stories:')
  console.log(stories)
  return stories
}



export async function updateStory (description, storyData) {
  const arr = []
  try {
    const getStories = JSON.parse(await AsyncStorage.getItem('stories'))
    if (getStories) {
      getStories.map(
        storyItem => {
          arr.push(storyItem)
        }
      )
    }
    console.log('Origin arr:')
    console.log(arr)


    // const deleteArr = arr.filter(story => {
    //   return story.description !== description
    // })
    // console.log("step delete:")
    // console.log(deleteArr)
    // const updateArr = deleteArr.push(storyData)
    // console.log('update arr')
    // console.log(updateArr)
    const updateArr = arr.map(obj => {
      // 👇️ if id equals 2 replace object
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
    console.log("Update Arr")
    console.log(updateArr)

    await AsyncStorage.setItem(
      'stories', JSON.stringify(updateArr)
    )
  } catch (error) {
    // Error saving data
    console.log(error)
  }


}

export async function deleteStory (description) {
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


export async function removeData () {
  try {
    const savedUser = await AsyncStorage.clear()
  } catch (error) {
    console.log(error)
  }
};

export async function removeItem () {
  try {
    await AsyncStorage.removeItem("stories")
  } catch (error) {
    console.log(error)
  }
}