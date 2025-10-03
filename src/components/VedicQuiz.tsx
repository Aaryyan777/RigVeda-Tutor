"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, Music, Sun, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  type: 'metre' | 'deity' | 'accent';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  icon: any;
}

const quizQuestions: QuizQuestion[] = [
  {
    type: 'metre',
    question: 'How many syllables per pāda does Gāyatrī metre have?',
    options: ['6', '8', '11', '12'],
    correct: 1,
    explanation: 'Gāyatrī has 8 syllables per pāda, with 3 pādas totaling 24 syllables.',
    icon: Music
  },
  {
    type: 'deity',
    question: 'Which deity is most frequently invoked in the Rigveda?',
    options: ['Agni', 'Indra', 'Soma', 'Varuṇa'],
    correct: 1,
    explanation: 'Indra is the most frequently mentioned deity with over 250 hymns dedicated to him.',
    icon: Flame
  },
  {
    type: 'accent',
    question: 'What does the udātta accent mark (॑) indicate?',
    options: ['Low pitch', 'High pitch', 'Falling pitch', 'Silent'],
    correct: 1,
    explanation: 'Udātta (॑) indicates a high or raised pitch in Vedic recitation.',
    icon: Sun
  },
  {
    type: 'metre',
    question: 'Which metre has 11 syllables per pāda?',
    options: ['Gāyatrī', 'Anuṣṭubh', 'Triṣṭubh', 'Jagatī'],
    correct: 2,
    explanation: 'Triṣṭubh has 11 syllables per pāda across 4 pādas (44 syllables total).',
    icon: Music
  },
  {
    type: 'deity',
    question: 'Which maṇḍala is entirely dedicated to Soma Pavamāna?',
    options: ['Maṇḍala 1', 'Maṇḍala 5', 'Maṇḍala 9', 'Maṇḍala 10'],
    correct: 2,
    explanation: 'Maṇḍala 9 contains 114 hymns entirely dedicated to Soma Pavamāna.',
    icon: Flame
  }
];

export default function VedicQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  useEffect(() => {
    if (isQuizActive && timeLeft > 0 && currentQuestion < quizQuestions.length) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      finishQuiz();
    }
  }, [timeLeft, isQuizActive, currentQuestion, showResult]);

  const startQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(60);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
  };

  const handleAnswer = (answerIndex: number) => {
    if (answeredQuestions[currentQuestion]) return;

    setSelectedAnswer(answerIndex);
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        finishQuiz();
      }
    }, 1500);
  };

  const finishQuiz = () => {
    setShowResult(true);
    setIsQuizActive(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return { text: 'Perfect! You are a Vedic scholar! 🎉', color: 'var(--vedic-gold)' };
    if (percentage >= 80) return { text: 'Excellent! Deep knowledge! 🌟', color: 'var(--vedic-saffron)' };
    if (percentage >= 60) return { text: 'Good work! Keep exploring! 👍', color: 'var(--vedic-amber)' };
    return { text: 'Keep learning! Try again! 📚', color: 'var(--vedic-terracotta)' };
  };

  const currentQ = quizQuestions[currentQuestion];
  const IconComponent = currentQ?.icon || Trophy;

  if (!isQuizActive && !showResult) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)] bg-clip-text text-transparent">
            Vedic Knowledge Quiz
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge of Rigvedic metres, deities, and accents in 60 seconds!
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--vedic-saffron)] to-[var(--vedic-amber)] flex items-center justify-center mx-auto mb-4 mandala-glow">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl">Ready to Begin?</CardTitle>
            <CardDescription>
              5 rapid-fire questions covering metres, deities, and accents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <Music className="w-6 h-6 mx-auto mb-2 text-[var(--vedic-amber)]" />
                <div className="font-semibold">Metre ID</div>
                <div className="text-xs text-muted-foreground">Syllable patterns</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Flame className="w-6 h-6 mx-auto mb-2 text-[var(--vedic-crimson)]" />
                <div className="font-semibold">Deity Knowledge</div>
                <div className="text-xs text-muted-foreground">Maṇḍala distribution</div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Sun className="w-6 h-6 mx-auto mb-2 text-[var(--vedic-gold)]" />
                <div className="font-semibold">Accent Spotting</div>
                <div className="text-xs text-muted-foreground">Svara recognition</div>
              </div>
            </div>

            <Button
              onClick={startQuiz}
              size="lg"
              className="w-full gap-2 bg-gradient-to-r from-[var(--vedic-saffron)] to-[var(--vedic-amber)]"
            >
              <Clock className="w-5 h-5" />
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const scoreMsg = getScoreMessage();
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 mandala-glow"
                style={{ backgroundColor: scoreMsg.color }}
              >
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
              <CardDescription className="text-lg mt-2" style={{ color: scoreMsg.color }}>
                {scoreMsg.text}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2" style={{ color: scoreMsg.color }}>
                  {score} / {quizQuestions.length}
                </div>
                <div className="text-muted-foreground">Correct Answers</div>
              </div>

              <div className="space-y-3">
                {quizQuestions.map((q, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Badge variant={answeredQuestions[index] ? 'default' : 'secondary'}>
                        Q{index + 1}
                      </Badge>
                      <div className="flex-1">
                        <p className="font-medium mb-2">{q.question}</p>
                        <p className="text-sm text-muted-foreground">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={startQuiz} className="w-full" size="lg">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timer & Progress */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[var(--vedic-saffron)]" />
          <span className="font-mono text-2xl font-bold">{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[var(--vedic-gold)]" />
          <span className="font-mono text-xl">{score}/{quizQuestions.length}</span>
        </div>
      </div>

      <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="max-w-2xl mx-auto" />

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--vedic-saffron)]/10 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-[var(--vedic-saffron)]" />
                </div>
                <div className="flex-1">
                  <Badge variant="secondary">{currentQ.type.toUpperCase()}</Badge>
                  <CardDescription className="mt-1">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </CardDescription>
                </div>
              </div>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQ.correct;
                const showFeedback = selectedAnswer !== null;

                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answeredQuestions[currentQuestion]}
                    variant={isSelected ? 'default' : 'outline'}
                    className={`w-full h-auto p-4 text-left justify-start text-base ${
                      showFeedback && isCorrect ? 'bg-green-500 hover:bg-green-600' :
                      showFeedback && isSelected && !isCorrect ? 'bg-red-500 hover:bg-red-600' : ''
                    }`}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                );
              })}

              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-muted rounded-lg mt-4"
                >
                  <p className="text-sm">{currentQ.explanation}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}