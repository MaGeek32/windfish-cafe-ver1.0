//This component decides how each story item looks like in story list and navigate to editor when each story pressed.
import { Pressable, View, Text, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { getFormattedDate } from "../../util/date"
import { useNavigation } from "@react-navigation/native"

//Example of a story
// title: 'Story1',
// date: new Date('2022-06-22'),
// characters: 'John, Paul',
// timeline: 1,
// content: 'This is story 1',



function StoryItem ({ description, title, time }) {
  const navigation = useNavigation()

  //When button pressed, navigate to Editor
  function storyPressHandler () {
    navigation.navigate('Editor', {
      storyDes: description
    })
  }


  return <Pressable
    onPress={storyPressHandler}
    style={({ pressed }) => pressed && styles.pressed}

  >
    <View style={styles.storyItem}>
      <View >
        <Text style={[styles.textBase, styles.title]}>{title}</Text>
        <Text style={styles.textBase}>{getFormattedDate(time)}</Text>
      </View>
    </View>
  </Pressable>
}

export default StoryItem

const styles = StyleSheet.create({

  pressed: {
    opacity: 0.75,
  },

  storyItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: 'white'
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },

})