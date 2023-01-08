import { Header } from './components';
import { Login, Register, Posts, PostDetails, EditPost } from './pages';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { PostContextProvider } from './contexts/PostContext';
import { CreatePost } from './pages/create-post/CreatePost';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <div className="app">
          <Header />
          <Routes>
            <Route path='/' element={<Posts />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/posts/:postId' element={<PostDetails />} />
            <Route path='/edit/:postId' element={<EditPost />} />
            <Route path='/create' element={<CreatePost />} />
          </Routes>
        </div>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
