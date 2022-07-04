import { FlatList, View } from "react-native"
import AvatarItem from "./AvatarItem"
import { StyleSheet } from "react-native"

// const characterId = new Date().toString() + Math.random().toString()

function renderAvatarItem (itemData) {
  return <AvatarItem {...itemData.item} />
}



function AvatarList ({ stories }) {



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


