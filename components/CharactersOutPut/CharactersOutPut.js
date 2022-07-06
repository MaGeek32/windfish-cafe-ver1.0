//This component shows the total area of characters

import { View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import AvatarList from "./AvatarList"



function CharactersOutput ({ stories }) {
  return (

    <View style={styles.container}>
      <AvatarList stories={stories} />
    </View>
  )
}

export default CharactersOutput

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  }
})