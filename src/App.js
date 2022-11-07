import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Register from "./pages/Register";
import AuthProvider from "./context/AuthProvider";
import Navbar from "./componets/Navbar";
import AuthRouter from "./router/AuthRouter";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route index element={<Main />} />
          <Route path=":details" element={<AuthRouter />}>
            <Route path="" element={<MovieDetails />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
