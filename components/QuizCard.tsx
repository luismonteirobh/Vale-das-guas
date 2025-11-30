import React from 'react';

interface QuizCardProps {
  children: React.ReactNode;
}

export const QuizCard: React.FC<QuizCardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-[1.5rem] shadow-xl p-5 md:p-8 w-full max-w-md mx-auto border-b-4 border-vale-blue/20 relative overflow-hidden flex flex-col justify-center max-h-full">
        {/* Decorative background elements inside card */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-vale-blue/5 rounded-full -mr-10 -mt-10 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-vale-orange/5 rounded-full -ml-8 -mb-8 z-0 pointer-events-none"></div>
        <div className="relative z-10 w-full">
            {children}
        </div>
    </div>
  );
};