import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AdminPage, CreateEventPage, DonatePage, ErrorPage, EventPage, HomePage, RegisterPage, ResetPasswordPage, SignInPage, UserInfoPage, VerifyUserPage } from "./pages";
import { useStateContext } from "./context/ContextProvider";
import { Sidebar } from "./components";
const App = () => {
  const { activeMenu, currentMode } = useStateContext();
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"
              }`}
          >
            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<SignInPage />} />
                <Route path="/reset" element={<ResetPasswordPage />} />
                <Route path="event/:type/detail/:id" element={<DonatePage />} />
                <Route path="/event/:type" element={<EventPage />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/create/:type" element={<CreateEventPage />} />
                <Route path="/user/:id" element={<UserInfoPage />} />
                <Route path="/verifyUser" element={<VerifyUserPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
