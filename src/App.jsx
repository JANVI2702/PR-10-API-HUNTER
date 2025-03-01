import { useState } from 'react'

import { Provider } from 'react-redux'
// import FetchData from './FeatchData'
import { store } from './Store'
import PostList from './Postlist'

function App() {


  return (
    <Provider store={store}>
      <PostList/>
    </Provider >
  )
}
export default App;
