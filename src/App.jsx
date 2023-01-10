import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { CreateEventPage, DonatePage, ErrorPage,EventPage,HomePage,RegisterPage, ResetPasswordPage, SignInPage } from "./pages";
const App = () =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<SignInPage/>}/>
        <Route path="/reset" element={<ResetPasswordPage/>}/>
        <Route path="/detail/:id" element={<DonatePage/>}/>
        <Route path="/event/:id" element={<EventPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
        <Route path="/create" element={<CreateEventPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
