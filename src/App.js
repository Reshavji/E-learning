import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import LessonModule from './Components/LessonModule';
import UserProfile from './Components/UserProfile';
import Courses from './Components/Courses';
import { useStateValue } from './Context/StateProvider';
import { auth } from './config/firebase';
import db from './config/firebase'; // Import your Firebase configuration

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        // Fetch additional user information from the "users" collection using the user ID (userId)
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          console.log(userData);
          // Set only the username (user's name) as a global variable
          dispatch({
            type: 'SET_USER',
            user: {...userData},
          });
        } else {
          console.log('User document not found in "users" collection.');
          // If the user document doesn't exist in the "users" collection, set the global user state to null
          dispatch({
            type: 'SET_USER',
            user: null,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // If there's an error fetching user data, set the global user state to null
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    };

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // If the user is authenticated
        const providerId = authUser.providerData[0].providerId;
        if (providerId === 'password') {
          // If the user logged in using email/password, fetch data from Firestore
          fetchUserData(authUser.uid);
        } else {
          // For other login methods (e.g., Google), set the entire authUser object as the global user state
          dispatch({
            type: 'SET_USER',
            user: authUser,
          });
        }
      } else {
        // If the user is not authenticated, set the user state to null
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  
    // Cleanup function for the subscription to avoid memory leaks
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="app">
      <div className="app__top"></div>
      <div className="app__container">
        <Switch>
          <Route exact path="/" component={Home} /> {/* Separate route for Home */}
          <Route path="/lesson/:id" component={LessonModule} />
          <Route
            path="/profile"
            render={()=> user? (<UserProfile />): (<Home />)}
          />
          <Route path="/courses" component={Courses} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
