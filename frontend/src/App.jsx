import {useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import HomePage from './components/pages/HomePage';

import FlashcardPage from './components/pages/FlashcardPage';
import AboutPage from './components/pages/AboutPage';
import Footer from './components/layout/Footer';
import Modal from './components/common/Modal';
import ResourceLink from './components/common/ResourceLink';

import resourceData from './components/mock-data/resourceData';
import AllPhrasesPage from './components/pages/AllPhrasesPage';
import LoginPage from './components/pages/auth/LoginPage';
import RegisterPage from './components/pages/auth/RegisterPage';
import { AuthContext } from './context/AuthContext';
import PublicHeader from './components/layout/PublicHeader';
import UserHeader from './components/layout/UserHeader';
import UserProfilePage from './components/pages/UserProfilePage';
import { DataContext } from './context/DataContext';
import QuizPage from './components/pages/quiz/QuizPage';
import QuizResultsPage from './components/pages/quiz/QuizResultsPage';

import './App.css';
import { ModalContext } from './context/ModalContext';

function App() {
  const { auth } = useContext(AuthContext);

  const { isLoading, allPhrases, userFlashcards } = useContext(DataContext);
  const { handleOpenModal } = useContext(ModalContext);

  const flashcardPhraseIds = userFlashcards.map((flashcard) => flashcard.phraseId);

  const notify = (successStatus, message) => {
    if (successStatus) return toast.success(message);
    return toast.error(message);
  };

    const renderResourceData = resourceData.map((resource, idx) => {
    return (
      <ResourceLink
        key={idx}
        title={resource.title}
        description={resource.description}
        url={resource.url}
      />
      );
    });

    const modalContent = (
      <div className="modal-inner">
          <span className="before-you-start">BEFORE YOU START</span>
          <h2 className="haiti-aid-title">Haiti is facing an ongoing humanitarian crisis</h2>
          <p className="haiti-aid-paragraph">
            Armed violence and displacement have disrupted daily life for millions
            of people in Haiti, and access to food, healthcare, and safety remains limited
            in many areas. If you'd like to help, here are a few vetted organiztions working
            on the ground:
          </p>
          <div className="haiti-aid-links">
            {renderResourceData}
          </div>
      </div>
  );

  useEffect(() => {
    handleOpenModal(modalContent, 'INFO', 'info-modal');
  }, []);

  return (
    <div className="app-container">
      <Toaster />
      <Modal />
      {auth.isAuthenticated ? <UserHeader notify={notify} modalContent={modalContent} /> : <PublicHeader modalContent={modalContent} />}
      {isLoading ? (
        <div>Loading...</div>
      ) : !auth.isAuthenticated ? (
          <Routes>
            <Route path="/" element={
              <HomePage />
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/all-phrases" element={
              <AllPhrasesPage 
                allPhrases={allPhrases} 
                flashcardPhraseIds={flashcardPhraseIds} 
                userFlashcards={userFlashcards} 
                notify={notify} />} 
              />
            <Route path="/login" element={<LoginPage notify={notify} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />        
          </Routes>
 
        ) : (
          <Routes>
              <Route path="/" element={
                <HomePage notify={notify} />
              } />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/profile" element={<UserProfilePage notify={notify} />} />
              <Route path="/flashcards" element={<FlashcardPage notify={notify} />} />
              <Route path="/all-phrases" element={
                <AllPhrasesPage 
                  allPhrases={allPhrases} 
                  flashcardPhraseIds={flashcardPhraseIds} 
                  userFlashcards={userFlashcards} 
                  notify={notify} />} 
                />
              <Route path="/quiz" element={<QuizPage notify={notify} />} />
              <Route path="/quizResults" element={<QuizResultsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        )}
   
      <Footer />
    </div>
  );
};

export default App;