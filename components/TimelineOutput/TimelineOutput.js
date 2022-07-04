import { View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import Timeline from 'react-native-timeline-flatlist'
import { getFormattedDate } from "../../util/date"
import { useNavigation } from "@react-navigation/native"



// const timelineDataTest = [
//   { time: '09:00', title: 'Event 1', description: 'Event 1 Description' },
//   { time: '10:45', title: 'Event 2', description: 'Event 2 Description' },
//   { time: '12:00', title: 'Event 3', description: 'Event 3 Description' },
//   { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
//   { time: '16:30', title: 'Event 5', description: 'Event 5 Description' }
// ]




function TimelineOutput ({ stories }) {
  // const newArr = []
  const navigation = useNavigation()


  // stories.map((item) => newArr.push(
  //   {
  //     id: item.id,
  //     title: item.title,
  //     time: getFormattedDate(item.date),
  //     description: item.content
  //   })
  // )

  const reorderedStories = [...stories].sort((a, b) => a.description > b.description ? 1 : -1)


  function storyPressHandler (event) {
    // console.log(event.id)
    navigation.navigate('Editor', {
      storyDes: event.description
    })
  }
  return (

    <View style={styles.root}>
      {/* <TimelineItem stories={stories} /> */}
      <Timeline data={reorderedStories}
        innerCircle={'dot'}
        columnFormat='two-column'
        // onEventPress={}
        circleSize={20}
        circleColor='rgb(45,156,219)'
        lineColor='rgb(45,156,219)'
        timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
        timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
        descriptionStyle={{ color: 'gray' }}

        onEventPress={storyPressHandler}
        options={{
          style: { paddingTop: 50 }
        }}




        separator={false}
        detailContainerStyle={{ marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#BBDAFF", borderRadius: 10 }}


      />
    </View>
  )
}

export default TimelineOutput



const styles = StyleSheet.create({
  root: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingTop: 0,

  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  }
})