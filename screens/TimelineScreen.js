
//A page shows timeline

import { GlobalStyles } from '../constants/styles'
import React from 'react'
import { StyleSheet, View, } from 'react-native'

import TimelineOutput from '../components/TimelineOutput/TimelineOutput'
import { useState } from 'react'
import { useContext } from 'react'
import { StoriesContext } from '../store/stories-context'
import { useEffect } from 'react'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import { fetchStories } from '../util/localStorage'


function TimelineScreen () {
  //Get stories
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

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  const getStories = storiesCtx.stories



  return (
    <View style={styles.container}>
      <TimelineOutput stories={getStories} />
    </View>
  )
}

export default TimelineScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  }
})