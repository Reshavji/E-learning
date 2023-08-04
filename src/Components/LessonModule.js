import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const LessonModule = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <h2>Lesson Module {id}</h2>
      {/* Render the lesson module content */}
    </div>
  );
};

export default LessonModule;
