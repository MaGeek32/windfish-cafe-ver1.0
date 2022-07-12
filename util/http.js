// import axios from 'axios'
// const BACKEND_URL = 'https://react-native-firebase-66fde-default-rtdb.firebaseio.com'

// export async function storeStory (storyData) {
//   const response = await axios.post(BACKEND_URL + '/stories.json',
//     storyData
//   )
//   const id = response.data.name
//   return id
// }

// export async function fetchStories () {
//   const response = await axios.get(BACKEND_URL + '/stories.json')
//   const stories = []
//   for (const key in response.data) {
//     const storyObj = {
//       id: key,
//       title: response.data[key].title,
//       time: response.data[key].time,
//       characters: response.data[key].characters,
//       description: response.data[key].description,
//       content: response.data[key].content,
//     }
//     stories.push(storyObj)
//   }
//   return stories
// }


// export function updateStory (id, storyData) {
//   return axios.put(BACKEND_URL + `/stories/${id}.json`, storyData)
// }

// export function deleteStory (id) {
//   return axios.delete(BACKEND_URL + `/stories/${id}.json`)
// }