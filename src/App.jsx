import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { CreateEventPage, DonatePage, ErrorPage,EventPage,HomePage,RegisterPage, ResetPasswordPage, SignInPage, UserInfoPage } from "./pages";
const App = () =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<SignInPage/>}/>
        <Route path="/reset" element={<ResetPasswordPage/>}/>
        <Route path="event/:type/detail/:id" element={<DonatePage/>}/>
        <Route path="/event/:type" element={<EventPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
        <Route path="/create" element={<CreateEventPage/>}/>
        <Route path="/user/:id" element={<UserInfoPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
