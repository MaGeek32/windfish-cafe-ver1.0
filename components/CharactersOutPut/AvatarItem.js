//This component shows each Avatar items look like under characters page.

import { Pressable, View, Text, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { useNavigation } from "@react-navigation/native"
import { Avatar } from "@rneui/themed"

function AvatarItem ({ character, story }) {
  const navigation = useNavigation()
  //Navigate to Character page when an Avatar pressed.
  function avatarPressHandler () {
    navigation.navigate('Character', {
      storyDes: story.description,
      story: story
    })
  }

  return <Pressable
    onPress={avatarPressHandler}
    style={({ pressed }) => pressed && styles.pressed}
  >

    <View style={styles.avatarItem}>
      <View >
        <Avatar
          size='large'
          rounded
          //Shows the first letter of character as Avatar image
          //Todo: Allow user to upload a character profile image for each character
          title={character.charAt(0).toUpperCase()}
          onPress={avatarPressHandler}
          activeOpacity={0.7}
          overlayContainerStyle={{
            backgroundColor: GlobalStyles.colors.primary500
          }}
        />
        <Text style={styles.name}>{character}</Text>
        <Avatar />
      </View>
    </View>
  </Pressable>
}

export default AvatarItem

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
    color: GlobalStyles.colors.primary50
  },
  name: {
    textAlign: 'center',
    color: GlobalStyles.colors.primary500
  },
  avatarItem: {
    alignItems: 'center',
    alignContent: 'center',
  },


})