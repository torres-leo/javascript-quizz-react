import { Button } from '@mui/material';
import { useQuestionStore } from './store/questions';

const Start = () => {
	const fetchQuestion = useQuestionStore((state) => state.fetchQuestions);

	const limit = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

	const handleClick = () => {
		fetchQuestion(limit);
	};

	return (
		<Button onClick={handleClick} variant='contained'>
			Start!
		</Button>
	);
};

export default Start;
