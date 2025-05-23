import { Provider } from "react-redux"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactModal from 'react-modal'
import { persistor, store } from "./redux/store.js"
import { PersistGate } from "redux-persist/integration/react"

ReactModal.setAppElement('#root')
createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
  <Provider  store={store}>
    <App />
  </Provider>
  </PersistGate>
)
