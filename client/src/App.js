import React, {useState} from "react";
import './App.css';

import Home from "./components/home/home";
import Navbar from "./components/common_components/navbar/navbar";
import First_lesson from "./components/lessons/first_lesson";
import Quiz_one from "./components/quizzes/quizze-page-one";
import Lessons_selection from "./components/lessons-selection/lesson_selection";
import Colour_lesson from "./components/lessons/colour_lesson";
import Therapy_session from "./components/lessons/therapy_session";
import Login from "./components/login/login";
import Register from "./components/register/register";
import {
  BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Quizzes_selection from "./components/quizzes-selection/quizzes_selection";


function App() {
  return (
<Router>
  <Routes>
    <Route path="/nav" Component={Navbar}/>
    <Route path="/home" Component={Home}/>
    <Route path="/first_lesson" element={<First_lesson/>}/>
    <Route path="/Quiz_one" element={<Quiz_one/>}/>
    <Route path="/lessons_selection" element={<Lessons_selection/>}/>
    <Route path="/colour_lesson" element={<Colour_lesson/>}/>
    <Route path="/therapy_session" element={<Therapy_session/>}/>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/quizzes_selection" element={<Quizzes_selection/>}/>



  </Routes>
</Router>
  );
}

export default App;
