import { createContext, useReducer } from "react"


//Example of story object

const STORY_EXAMPLE = [
  {
    id: 'e1',
    title: 'Story1',
    time: new Date('2022-06-22'),
    characters: 'John',
    description: 1,
    content: 'This is story 1',
  },
  {
    id: 'e2',
    title: 'Story2',
    time: new Date('2022-06-21'),
    characters: 'John',
    description: 2,
    content: 'This is story 2',
  },
  {
    id: 'e3',
    title: 'Story3',
    time: new Date('2022-06-20'),
    characters: 'Paul',
    description: 3,
    content: 'This is story 3',
  },
]

export const StoriesContext = createContext({
  stories: [],
  addStory: ({ title, time, characters, description, content }) => { },
  setStory: (stories) => { },
  deleteStory: (description) => { },
  updateStory: ({ title, time, characters, description, content }) => { },
})

function storiesReducer (state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{ ...action.payload }, ...state]
    case 'SET':
      const inverted = action.payload.reverse()
      return inverted
    case 'UPDATE':
      const updatableStoryIndex = state.findIndex(
        (story) => story.description === action.payload.description
      )
      const updatableStory = state[updatableStoryIndex]
      const updatedItem = { ...updatableStory, ...action.payload.data }
      const updatedStories = [...state]
      updatedStories[updatableStoryIndex] = updatedItem
      return updatedStories
    case 'DELETE':
      return state.filter((story) => story.description !== action.payload)
    default:
      return state
  }
}

function StoriesContextProvider ({ children }) {
  const [storiesState, dispatch] = useReducer(storiesReducer, [])

  function addStory (storyData) {
    dispatch({ type: 'ADD', payload: storyData })
  }

  function setStory (stories) {
    dispatch({ type: 'SET', payload: stories })
  }

  function deleteStory (description) {
    dispatch({ type: 'DELETE', payload: description })
  }

  function updateStory (description, storyData) {
    dispatch({ type: 'UPDATE', payload: { description: description, data: storyData } })
  }

  const value = {
    stories: storiesState,
    addStory: addStory,
    setStory: setStory,
    deleteStory: deleteStory,
    updateStory: updateStory,
  }

  return (
    <StoriesContext.Provider value={value}>
      {children}
    </StoriesContext.Provider>
  )
}

export default StoriesContextProvider