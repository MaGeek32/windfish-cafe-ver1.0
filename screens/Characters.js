//A page show all the characters of database

import { useContext, useEffect, useState, Text } from 'react'

import ErrorOverlay from '../components/UI/ErrorOverlay'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { StoriesContext } from '../store/stories-context'
import { fetchStories } from '../util/localStorage'
import CharactersOutput from '../components/CharactersOutPut/CharactersOutPut'

function Characters () {
  //Get all stories
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
  // console.log(storiesCtx.stories)

  return (

    <>
      <CharactersOutput stories={getStories} />
    </>
  )
}

export default Characters
