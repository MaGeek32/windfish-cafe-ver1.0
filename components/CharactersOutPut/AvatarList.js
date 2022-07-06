//This componnent focuses on the avatar list of all characters
import { FlatList, View } from "react-native"
import AvatarItem from "./AvatarItem"
import { StyleSheet } from "react-native"

function renderAvatarItem (itemData) {
  return <AvatarItem {...itemData.item} />
}



function AvatarList ({ stories }) {
  //Check if a character is existed in previous story, if exist, return true, else return false
  function isExistedCharacter (array, characterName) {
    const isFound =
      array.some(element => {
        if (element.character.trim() === characterName.trim()) {
          return true
        }

        return false
      })
    return isFound
  }

  //Find the related character by character name
  function findElementByCharacter (array, characterName) {
    return array.find((element) => {
      return element.character.trim() === characterName.trim()
    })
  }
  const characterData = []

  stories.map(storyData => storyData.characters.trim().split(',').map(characterName => {
    //if duplicate, merge
    if (isExistedCharacter(characterData, characterName)) {
      findElementByCharacter(characterData, characterName).story.push(storyData)
    }
    else {
      //Set a character data array for all characters
      characterData.push({
        id: new Date().toString() + Math.random().toString(),
        character: characterName.trim(),
        story: [storyData]
      })
    }
    // console.log(characterData)
  }))

  return (
    <View style={styles.container}
    >
      <FlatList
        data={characterData}
        renderItem={renderAvatarItem}
        keyExtractor={(item) => item.description}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  )

}

export default AvatarList

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  }
})


