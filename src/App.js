
import './App.css';
import {Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import CreateLiveClasses from './components/CreateLiveClasses';
import SearchResults from './components/SearchResults';
import Profile  from './components/ProfilePage';
import Room from './components/Room';
import { UserProvider } from './components/UserDataContext';
import TeacherDashboard from './components/TeacherDashboard';
import CourseCreationForm from './components/CourseCreationForm';
import Course_showing_cpm from './components/Course_showing_cpm';
import McqQuestion from './components/MockTest/Mock_test_question_component';
import Mock_test_topic from './components/MockTest/Mock_test_topic';
function App() {
  return (
    <UserProvider>
    <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/profile' element={<Profile/>}/>
<Route path='/Room/:classTeacher/:id' element={<Room/>}/>
<Route path='/createliveclasses' element={<CreateLiveClasses/>}/>
<Route path='/SearchResults' element={<SearchResults/>}/>
<Route path='/TeacherDashboard' element={<TeacherDashboard/>}/>
<Route path='/CourseCreationForm/:classTeacher' element={<CourseCreationForm/>}/>
<Route path='/Course/:courseName/:id' element={<Course_showing_cpm/>} />
<Route path='/GenerateMockTests' element={<Mock_test_topic/>} />
<Route path='GenerateMockTests/MockTest/:id' element={<McqQuestion/>} />
    </Routes>
    </UserProvider>
  );
}

export default App;
