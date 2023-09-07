import { Button, Stack } from '@mui/material';
import { useQuestionStore } from '../../store/questions';
import Question from '../Question';
import Score from '../Score';
import Pagination from '../Pagination';

const Game = () => {
	const questions = useQuestionStore((state) => state.questions);
	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const questionInfo = questions[currentQuestion];
	const reset = useQuestionStore((state) => state.reset);

	return (
		<>
			<Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ marginBottom: 2 }}>
				<Pagination />
				<Score />
			</Stack>

			<Question info={questionInfo} />
			<Button variant='outlined' color='success' size='large' onClick={() => reset()} sx={{ marginTop: 2 }}>
				Reset
			</Button>
		</>
	);
};

export default Game;
