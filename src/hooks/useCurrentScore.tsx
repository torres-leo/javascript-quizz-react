import { useQuestionStore } from '../store/questions';

export const useCurrentScore = () => {
	const questions = useQuestionStore((state) => state.questions);

	let correctAnswers = 0;
	let wrongAnswers = 0;
	let unanswered = 0;

	questions.forEach((question) => {
		const { userSelectedAnswer, correctAnswer } = question;

		if (userSelectedAnswer == null) {
			unanswered++;
		} else if (userSelectedAnswer === correctAnswer) {
			correctAnswers++;
		} else {
			wrongAnswers++;
		}
	});

	return { correctAnswers, wrongAnswers, unanswered };
};
