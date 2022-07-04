import { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StoryOutput from '../components/StoryOutput/StoryOutput'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { StoriesContext } from '../store/stories-context'
import { fetchStories } from '../util/localStorage'
import { GlobalStyles } from "../constants/styles"


function StoryList () {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()

  const storiesCtx = useContext(StoriesContext)

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

  // function isStart (item) {
  //   if (item = []) { return true }
  //   else { return false }
  // }

  if (error && !isFetching) {
    console.log(error)
    return <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  const getStories = storiesCtx.stories
  // console.log(getStories)
  // console.log(isStart(getStories))
  // console.log(storiesCtx.stories)
  if (getStories.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Start your first story inspiration by clicking coffee icon in the right corner!</Text>
      </View>
    )
  }

  else {
    return (
      <StoryOutput
        stories={getStories}

      />
    )

  }

}

export default StoryList

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    justifyContent: 'center',


  },
  text: {
    fontSize: 20,
    color: GlobalStyles.colors.primary600,
    textAlign: 'center',
    margin: 8,


  }
})