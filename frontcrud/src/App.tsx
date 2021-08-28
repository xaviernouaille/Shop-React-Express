import { Layout } from "./components/Layout"
import { BrowserRouter as Router } from "react-router-dom"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Layout />
      </Router>
    </div>
  )
}

export default App
