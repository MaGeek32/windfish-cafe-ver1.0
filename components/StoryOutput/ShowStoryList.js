import { FlatList, Text } from "react-native"
import StoryItem from "./StoryItem"

function renderStoryItem (itemData) {
  return <StoryItem {...itemData.item} />
}

function ShowStoryList ({ stories }) {
  return <FlatList
    data={stories}
    renderItem={renderStoryItem}
    keyExtractor={(item) => item.description}
  />
}

export default ShowStoryList
