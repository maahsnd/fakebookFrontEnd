import React, { useState, useEffect } from 'react';
import styles from './settings.module.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [showForm, setShowForm] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [disablePicSubmitBtn, setDisablePicSubmitBtn] = useState(false);
  const [disableBioBtn, setDisableBioBtn] = useState(false);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState('');
  const navigate = useNavigate();
  const token = Cookies.get('jwt_token');
  const id = Cookies.get('user_id');
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://localhost:3000/users/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      });
      const data = await response.json();
      setUser(data);
      setBio(data.bio);
      setUpdateUser(false);
    };
    fetchUser();
  }, [updateUser]);

  //photo functions
  const onFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };

  const handleSubmit = async (e) => {
    setDisablePicSubmitBtn(true);
    e.preventDefault();
    if (!file) {
      console.error('no file');
      return;
    }
    const formData = new FormData();
    formData.set('profilePicture', file);
    try {
      const response = await fetch(
        'https://localhost:3000/users/' + id + '/profilepic',
        {
          headers: { Authorization: 'Bearer ' + token },
          method: 'POST',
          body: formData
        }
      );
      setDisablePicSubmitBtn(false);
    } catch (err) {
      console.error(err);
      return;
    }
    setUpdateUser(true);
  };

  //bio functions
  const bioChange = (e) => {
    setBio(e.target.value);
  };
  const bioSubmit = async (e) => {
    e.preventDefault();
    setDisableBioBtn(true);
    const body = {
      text: bio
    };
    e.preventDefault();
    try {
      await fetch('https://localhost:3000/users/' + id + '/bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      setDisableBioBtn(false);
    } catch (err) {
      console.error(err);
      return;
    }
    setUpdateUser(true);
  };

  if (!token || token == 'undefined' || token == null) {
    navigate('/login');
  }

  return (
    <>
      <div className={styles.settingsContainer}>
        <h2 className={styles.settingsTitle}>Settings</h2>
        {user && (
          <div className={styles.profPicContainer}>
            <h3 className={styles.profPicTitle}>Profile Picture</h3>
            <div className={styles.picAndChangeContainer}>
              <img
                src={user.profilePhoto}
                alt="Profile picture"
                className={styles.profImg}
              />

              <button
                className={styles.changeBtn}
                onClick={() => {
                  showForm ? setShowForm(false) : setShowForm(true);
                }}
              >
                Change
              </button>
            </div>

            <div
              className={
                showForm ? styles.formContainerShow : styles.formContainerHide
              }
            >
              <form
                onSubmit={handleSubmit}
                className={styles.profPicForm}
                encType="multipart/form-data"
              >
                <input
                  type="file"
                  name="profPicSelect"
                  id="profPicSelect"
                  onChange={onFileChange}
                />
                <button
                  className={styles.submitProfPic}
                  disabled={disablePicSubmitBtn}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        <div className={styles.aboutMe}>
          <h3 className={styles.aboutMeTitle}>About Me</h3>
          <form className={styles.bioForm} onSubmit={bioSubmit}>
            <textarea
              onChange={bioChange}
              className={styles.bioTextArea}
              name="updateBio"
              id="updateBio"
              value={bio}
              placeholder={
                bio == '' || bio == undefined
                  ? 'Write something about yourself!'
                  : null
              }
            ></textarea>
            <button className={styles.bioBtn} disabled={disableBioBtn}>
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Settings;
