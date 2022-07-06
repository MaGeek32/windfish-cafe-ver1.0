//This component shows the total area of stories
import { View, StyleSheet } from "react-native"
import ShowStoryList from "./ShowStoryList"
import { GlobalStyles } from "../../constants/styles"

function StoryOutput ({ stories }) {
  return (
    <View style={styles.container}>
      <ShowStoryList stories={stories} />
    </View>
  )
}

export default StoryOutput

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  }
})