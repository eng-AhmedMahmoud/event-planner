import { BrowserRouter } from "react-router-dom"
import App from "./App"

export const AppWrapper = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  )
}