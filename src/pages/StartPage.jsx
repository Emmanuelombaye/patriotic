import React from 'react';
import IntakeQuiz from '../components/IntakeQuiz';

export default function StartPage({ locale }) {
  return (
    <div className="start-page-container">
      <IntakeQuiz 
        isOpen={true} 
        onClose={() => window.location.href = '/'} 
        locale={locale} 
      />
    </div>
  );
}
