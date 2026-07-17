import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import IntakeQuiz from '../components/IntakeQuiz';

export default function StartPage({ locale }) {
  const navigate = useNavigate();
  const finishQuiz = useCallback(() => navigate('/'), [navigate]);

  return (
    <div className="start-page-container">
      <IntakeQuiz
        isOpen
        onClose={finishQuiz}
        locale={locale}
        dismissible={false}
      />
    </div>
  );
}
