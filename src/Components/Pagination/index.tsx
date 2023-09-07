import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { useQuestionStore } from '../../store/questions';

const Pagination = () => {
	const questions = useQuestionStore((state) => state.questions);
	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const goToNextQuestion = useQuestionStore((state) => state.goToNextQuestion);
	const goToPreviousQuestion = useQuestionStore((state) => state.goToPreviousQuestion);

	return (
		<Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
			<IconButton onClick={goToPreviousQuestion} disabled={currentQuestion === 0}>
				<ArrowBackIosNew />
			</IconButton>
			{currentQuestion + 1} / {questions.length}
			<IconButton onClick={goToNextQuestion} disabled={currentQuestion === questions.length - 1}>
				<ArrowForwardIos />
			</IconButton>
		</Stack>
	);
};

export default Pagination;
