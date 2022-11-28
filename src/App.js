import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { MainPageView } from './charts/main_page'
import { UserPageView } from './charts/user_page'

function App() {
  return (
    <>
      <MainPageView />
      <UserPageView />
    </>
  )
}

export default App
