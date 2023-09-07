import { create } from 'zustand';
import confetti from 'canvas-confetti';
import { persist, devtools } from 'zustand/middleware';
import { type IQuestion } from '../types/index';

export interface State {
	questions: IQuestion[];
	currentQuestion: number;
	fetchQuestions: (limit: number) => Promise<void>;
	selectedAnswer: (questionId: number, answerIndex: number) => void;
	goToPreviousQuestion: () => void;
	goToNextQuestion: () => void;
	reset: () => void;
}

export const useQuestionStore = create<State>()(
	devtools(
		persist(
			(set, get) => {
				return {
					questions: [],
					currentQuestion: 0,

					fetchQuestions: async (limit: number) => {
						const res = await fetch('http://localhost:5173/data.json');
						const json = await res.json();

						const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
						set({ questions });
					},

					selectedAnswer: (questionId: number, answerIndex: number) => {
						const { questions } = get();

						const newQuestions = structuredClone(questions);
						const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
						const questionData = newQuestions[questionIndex];

						const isCorrectUserAnswer = questionData.correctAnswer === answerIndex;
						if (isCorrectUserAnswer) confetti();

						newQuestions[questionIndex] = {
							...questionData,
							userSelectedAnswer: answerIndex,
							isCorrectUserAnswer,
						};

						set({ questions: newQuestions });
					},

					goToNextQuestion: () => {
						const { currentQuestion, questions } = get();
						const nextQuestion = currentQuestion + 1;

						if (nextQuestion < questions.length) {
							set({ currentQuestion: nextQuestion });
						}
					},

					goToPreviousQuestion: () => {
						const { currentQuestion } = get();
						const previousQuestion = currentQuestion - 1;

						if (previousQuestion >= 0) {
							set({ currentQuestion: previousQuestion });
						}
					},

					reset: () => {
						set({ questions: [], currentQuestion: 0 });
					},
				};
			},
			{ name: 'questions' }
		)
	)
);
