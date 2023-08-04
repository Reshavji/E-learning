import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useStateValue } from '../Context/StateProvider';
import './UserProfile.css';
import db from '../config/firebase';

const UserProfile = () => {
  const [{ user }] = useStateValue();
  const [profileSettingVisible, setProfileSettingVisible] = useState(false);
  const [name, setName] = useState(user.name || user.displayName || '');
  const [description, setDescription] = useState(user.description || '');
  const [language, setLanguage] = useState(user.language || 'English');
 
  useEffect(() => {
    if (user && user.uid) {
      const fetchUserData = async (userId) => {
        try {
          const userDoc = await db.collection('users').doc(userId).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setName(userData.name || userData.displayName || '');
            setDescription(userData.description || '');
            setLanguage(userData.language || 'English');
            setAbout(userData.about || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle the error here (e.g., show a message to the user)
        }
      };

      fetchUserData(user.uid);
    }
  }, [user]);

  const handleSave = async () => {
    
    console.log(user.name);
    try {
        const userProfileRef = db.collection('users').doc(user.uid);
        console.log("Hi");
        // Prepare the data object to save to Firestore
        const userData = {
          name,
          description,
          language,
          about,
          // Add other profile data properties as needed
        };
  
        console.log('Saving user data:', userData);
  
        await userProfileRef.update(userData);
  
        console.log('User profile data updated successfully!');
      
    } catch (error) {
      console.error('Error updating user profile data:', error);
    }
  };
  
  
  const [about, setAbout] = useState('');

  const toggleProfileSetting = () => {
    setProfileSettingVisible(!profileSettingVisible);
  };

  return (
    <div className='Home'>
      <Header />
      <div className='profile-grid'>
        <div className='profile-item'>
          <div className='profile-img'>
            <img
              id='user-profile'
              src='https://img.freepik.com/free-icon/man_318-233556.jpg'
              alt='profile-img'
            ></img>
          </div>
          <div className='user-name'>
            <span>{user.displayName || user.name}</span>
          </div>
          <div className='settings'>
            <div className='set-item' onClick={toggleProfileSetting}>
              Profile Setting
            </div>
            <div className='set-item'>Description Setting</div>
            <div className='set-item'>Course Setting</div>
            <div className='set-item'>Social Connection</div>
            <div className='set-item'>Privacy</div>
          </div>
        </div>

        {profileSettingVisible ? (
          // Render the Profile Setting form when profileSettingVisible is true
          <div className='profile-item'>
            <div className='head-section'>
              <h3>Profile Setting</h3>
              <p>Update your profile information</p>
            </div>
            <div className='info-section'>
              <div className='input-container'>
                <label htmlFor='name'>Name:</label>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='input-container'>
                <label htmlFor='description'>Description:</label>
                <input
                  type='text'
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='input-container'>
                <label htmlFor='language'>Language:</label>
                <input
                  type='text'
                  id='language'
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </div>
              <div className='input-container'>
                <label htmlFor='about'>About:</label>
                <textarea
                  id='about'
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div className='save-btn'>
              <button className='save-button' onClick={handleSave}>
                Save
              </button></div>
            </div>
          </div>
        ) : (
          // Render the original second profile item when profileSettingVisible is false
          <div className='profile-item'>
            <div className='head-section'>
              <h3>Public Information</h3>
              <p>Add Information about yourself</p>
            </div>
            <div className='info-section'>
              <table className='user-table'>
                <tbody>
                  <tr>
                    <td className='data-heading'>Name:</td>
                    <td className='user-data'>{user.name || user.displayName || ''}</td>
                  </tr>
                  <tr>
                    <td className='data-heading'>Email:</td>
                    <td className='user-data'>{user.email || user.email || ''}</td>
                  </tr>
                  <tr>
                    <td className='data-heading'>Description:</td>
                    <td className='user-data'>{user.description || 'Ready For Job'}</td>
                  </tr>
                  <tr>
                    <td className='data-heading'>Language:</td>
                    <td className='user-data'>{user.language || 'English'}</td>
                  </tr>
                  {/* Add other user details as needed */}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
