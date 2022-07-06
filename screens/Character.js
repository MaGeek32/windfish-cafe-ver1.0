//A page show the character clicked by users under Characters page.

import StoryOutput from '../components/StoryOutput/StoryOutput'


function Character ({ route }) {
  const { storyDes, story } = route.params

  return (
    //Todo: 
    //Add a button to let user input a background story of a character
    <StoryOutput
      stories={route.params.story}
    />
  )
}

export default Character
