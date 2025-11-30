import React, { useState, useEffect } from 'react';
import { Check, User, Phone, MessageCircle } from 'lucide-react';
import { Logo } from './components/Logo';
import { Button } from './components/Button';
import { QuizCard } from './components/QuizCard';
import { QUESTIONS, TOTAL_STEPS } from './constants';
import { QuestionType, UserResponses, WebhookPayload } from './types';
import { sendQuizData } from './services/apiService';

const App: React.FC = () => {
  // Application State
  const [screen, setScreen] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserResponses>({});
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  // Constants
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / TOTAL_STEPS) * 100;

  // Effects
  useEffect(() => {
    // Reset input when question changes
    setInputValue('');
  }, [currentQuestionIndex]);

  // Handlers
  const handleStart = () => {
    setScreen('quiz');
  };

  const handleOptionSelect = (value: string) => {
    saveAnswerAndNext(value);
  };

  const handleInputNext = () => {
    if (!inputValue.trim()) return;
    saveAnswerAndNext(inputValue);
  };

  const saveAnswerAndNext = (value: string) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // Trigger animation
      setFadeKey(prev => prev + 1);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 150); // Small delay for visual feedback
    } else {
      finishQuiz(updatedAnswers);
    }
  };

  const finishQuiz = async (finalAnswers: UserResponses) => {
    setIsLoading(true);
    
    // Prepare Payload
    const payload: WebhookPayload = {
      name: finalAnswers[7], // ID 7 is name (updated)
      whatsapp: finalAnswers[8], // ID 8 is whatsapp (updated)
      responses: finalAnswers,
      timestamp: new Date().toISOString()
    };

    try {
      await sendQuizData(payload);
      setScreen('result');
    } catch (error) {
      console.error("Failed to submit", error);
      alert("Houve um erro ao enviar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mask helper for Phone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Apply mask (XX) XXXXX-XXXX
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 10) {
      value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }
    setInputValue(value);
  };

  // Reusable Background Component to ensure consistency across all screens
  const BackgroundElements = () => (
    <>
      {/* Sun Effect */}
      <div className="absolute top-[-20%] left-1/2 transform -translate-x-1/2 w-[150vw] h-[60vh] bg-gradient-to-b from-vale-yellow/30 to-transparent rounded-full blur-2xl pointer-events-none z-0"></div>
      
      {/* Floating Bubbles */}
      <div className="absolute top-[20%] left-[10%] w-6 h-6 rounded-full bg-vale-blue/10 animate-bounce delay-700 duration-[3000ms] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] right-[15%] w-10 h-10 rounded-full bg-vale-orange/10 animate-pulse duration-[4000ms] pointer-events-none z-0"></div>

      {/* Animated Waves at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] min-h-[500px] md:h-[65vh] z-0 overflow-hidden pointer-events-none">
          
          {/* Back Wave (Darker, Moving Right) */}
          <div className="absolute bottom-0 left-0 h-full animate-wave-right opacity-30 text-vale-blue">
            <svg viewBox="0 0 1440 320" className="w-1/2 h-full fill-current" preserveAspectRatio="none">
                <path d="M0,130 Q360,100 720,130 Q1080,160 1440,130 L1440,320 L0,320 Z"></path>
            </svg>
            <svg viewBox="0 0 1440 320" className="w-1/2 h-full fill-current" preserveAspectRatio="none">
                <path d="M0,130 Q360,100 720,130 Q1080,160 1440,130 L1440,320 L0,320 Z"></path>
            </svg>
          </div>

          {/* Front Wave (Lighter, Moving Left) */}
          <div className="absolute bottom-0 left-0 h-full animate-wave-left opacity-90 text-[#B3E5FC]">
            <svg viewBox="0 0 1440 320" className="w-1/2 h-full fill-current" preserveAspectRatio="none">
                 <path d="M0,100 Q360,130 720,100 Q1080,70 1440,100 L1440,320 L0,320 Z"></path>
            </svg>
            <svg viewBox="0 0 1440 320" className="w-1/2 h-full fill-current" preserveAspectRatio="none">
                 <path d="M0,100 Q360,130 720,100 Q1080,70 1440,100 L1440,320 L0,320 Z"></path>
            </svg>
          </div>
      </div>
    </>
  );

  // Render Functions
  const renderWelcome = () => (
    <div className="h-[100dvh] w-full flex flex-col relative overflow-hidden bg-gradient-to-b from-[#E0F7FA] to-white">
      <BackgroundElements />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center z-10 w-full max-w-md mx-auto px-6 pt-6 pb-4">
        
        {/* Logo Section */}
        <div className="flex-none mb-2 animate-[fadeInDown_0.8s_ease-out] relative">
            <div className="absolute inset-0 bg-white/40 blur-xl rounded-full transform scale-110"></div>
            <div className="relative transform hover:scale-105 transition-transform duration-500">
                <Logo className="w-56 drop-shadow-lg" />
            </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center space-y-3 mt-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-[900] text-vale-blue leading-tight tracking-tight drop-shadow-sm">
            Tenha um parque aquático para curtir o ano todo!
          </h1>
          <p className="text-gray-600 text-lg font-medium leading-relaxed max-w-xs">
            Vamos descobrir juntos se essa experiência é ideal para você.
          </p>
        </div>

        {/* CTA Button */}
        <div className="w-full relative">
           <div className="absolute -inset-1 bg-vale-orange/30 rounded-2xl blur opacity-75 animate-pulse"></div>
            <Button 
                onClick={handleStart} 
                fullWidth 
                className="relative shadow-xl text-xl py-4 uppercase tracking-wide font-black"
            >
                Começar Agora
            </Button>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="h-[100dvh] w-full flex flex-col py-2 px-4 relative overflow-hidden bg-gradient-to-b from-[#E0F7FA] to-white">
      <BackgroundElements />

      {/* Compact Header */}
      <div className="flex-none w-full max-w-lg mx-auto mb-2 flex flex-col gap-2 z-20 relative">
        <div className="flex items-center justify-center py-1">
             <Logo className="w-32" />
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm border border-vale-light-blue">
            <div className="flex justify-between text-[10px] font-bold text-vale-blue mb-1 px-1 uppercase tracking-wide">
                <span>Pergunta {currentQuestionIndex + 1}/{TOTAL_STEPS}</span>
                <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-2 w-full bg-vale-light-blue rounded-full overflow-hidden border border-vale-blue/10">
                <div 
                className="h-full bg-gradient-to-r from-vale-blue to-vale-orange transition-all duration-500 ease-out rounded-full relative"
                style={{ width: `${progressPercentage}%` }}
                >
                    <div className="absolute top-0 right-0 bottom-0 w-full bg-white/20 animate-pulse"></div>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Area - Flexible */}
      <div className="flex-1 flex items-start justify-center w-full pt-2 pb-2 min-h-0 z-10 relative">
        <div key={fadeKey} className="w-full flex justify-center animate-[fadeIn_0.3s_ease-out]">
          <QuizCard>
            <div className="flex flex-col h-full justify-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 text-center leading-tight">
                {currentQuestion.title}
              </h3>

              {currentQuestion.type === QuestionType.MULTIPLE_CHOICE && (
                <div className="grid gap-2.5 overflow-y-auto max-h-[60vh] px-1 py-1">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.value)}
                      className="w-full p-3 md:p-4 rounded-xl border border-gray-100 bg-gray-50 text-gray-700 font-semibold text-sm md:text-base hover:border-vale-orange hover:bg-orange-50 hover:text-vale-orange transition-all duration-200 shadow-sm text-left flex items-center group relative overflow-hidden active:scale-[0.98]"
                    >
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-gray-300 mr-3 group-hover:border-vale-orange flex-shrink-0 group-hover:bg-vale-orange flex items-center justify-center transition-colors">
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <span className="relative z-10 leading-tight">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {(currentQuestion.type === QuestionType.TEXT || currentQuestion.type === QuestionType.PHONE) && (
                <div className="flex flex-col gap-4 w-full">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {currentQuestion.icon === 'user' ? (
                        <User className="h-5 w-5 text-vale-blue/60 group-focus-within:text-vale-blue transition-colors" />
                      ) : (
                        <Phone className="h-5 w-5 text-vale-green/80 group-focus-within:text-vale-green transition-colors" />
                      )}
                    </div>
                    <input
                      type={currentQuestion.type === QuestionType.TEXT ? "text" : "tel"}
                      value={inputValue}
                      onChange={currentQuestion.type === QuestionType.TEXT ? (e) => setInputValue(e.target.value) : handlePhoneChange}
                      className="block w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-vale-blue focus:ring-4 focus:ring-vale-blue/10 transition-all text-base font-medium shadow-inner"
                      placeholder={currentQuestion.placeholder}
                      autoFocus
                    />
                  </div>
                  
                  <Button 
                    onClick={handleInputNext} 
                    disabled={inputValue.length < 3 || isLoading}
                    fullWidth
                    variant="primary"
                    className="mt-2 py-3"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center text-sm">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : currentQuestionIndex === TOTAL_STEPS - 1 ? "Finalizar" : "Próximo"}
                  </Button>
                </div>
              )}
            </div>
          </QuizCard>
        </div>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center p-4 text-center animate-fade-in relative overflow-hidden bg-gradient-to-b from-[#E0F7FA] to-white">
      <BackgroundElements />

      {/* Confetti-like elements */}
      <div className="absolute top-[10%] left-[5%] w-4 h-4 rounded-full bg-vale-pink animate-bounce opacity-60 z-10 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-3 h-3 rounded-full bg-vale-yellow animate-pulse opacity-80 z-10 pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[5%] w-6 h-6 rounded-full bg-vale-blue animate-bounce delay-100 opacity-50 z-10 pointer-events-none"></div>

      <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl max-w-sm w-full border-t-8 border-vale-green relative z-20 flex flex-col items-center justify-center">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-vale-green text-white p-4 rounded-full shadow-lg border-4 border-white">
          <Check className="w-8 h-8" strokeWidth={3} />
        </div>

        <h2 className="text-2xl font-[800] text-gray-800 mt-6 mb-2 tracking-tight">
          Prontinho!
        </h2>
        <p className="text-gray-600 mb-6 text-base">
          Estamos preparando sua oferta especial exclusiva.
        </p>
        
        <div className="mb-6 p-4 w-full bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 shadow-sm">
          <p className="text-xs text-green-700 font-bold uppercase tracking-widest mb-1">Próximo Passo</p>
          <p className="text-lg text-green-900 font-bold leading-tight">Clique abaixo para receber no WhatsApp.</p>
        </div>

        <a 
          href={`https://wa.me/55${answers[8]?.replace(/\D/g, '')}?text=Olá! Acabei de responder o Quiz do Sócio e gostaria de saber mais sobre a oferta especial.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block transform transition-transform hover:-translate-y-1"
        >
          <Button fullWidth className="bg-[#25D366] hover:bg-[#128C7E] shadow-green-200 shadow-xl flex items-center justify-center gap-2 text-lg py-4">
            <MessageCircle className="w-6 h-6" />
            Receber no WhatsApp
          </Button>
        </a>
      </div>
      
      <div className="mt-8 opacity-80 absolute bottom-4 z-20">
        <Logo className="w-32" />
      </div>
    </div>
  );

  return (
    <div className="h-[100dvh] overflow-hidden text-gray-800 font-sans selection:bg-vale-blue selection:text-white">
      {screen === 'welcome' && renderWelcome()}
      {screen === 'quiz' && renderQuiz()}
      {screen === 'result' && renderResult()}
    </div>
  );
};

export default App;