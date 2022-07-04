import { useContext, useEffect, useState } from 'react'

import StoryOutput from '../components/StoryOutput/StoryOutput'
import ErrorOverlay from '../components/UI/ErrorOverlay'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { StoriesContext } from '../store/stories-context'
import { fetchStories } from '../util/localStorage'

function Character ({ route, navigation }) {
  console.log(route.params.story)
  const { storyDes, story } = route.params
  // console.log(route.params.storyId)
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
        setError('Could not fetch stories!')
      }
      setIsFetching(false)
    }

    getStories()
  }, [])

  if (error && !isFetching) {
    console.log(error)
    return <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  const getStories = storiesCtx.stories
  // console.log(storiesCtx.stories)

  return (
    <StoryOutput
      stories={route.params.story}

    />
  )
}

export default Character
