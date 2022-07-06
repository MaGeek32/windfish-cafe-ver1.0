//When there is no story, shows this component
import { View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"



function emptyStory () {
  return (
    <View style={styles.container}>
      <Text>Start your first story inspiration by clicking coffee icon in the right corner~</Text>
    </View>
  )
}

export default emptyStory

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  }
})