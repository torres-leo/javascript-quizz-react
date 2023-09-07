import { IQuestion } from '../../types';
import { useQuestionStore } from '../../store/questions';
import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const getBackgroundColor = (info: IQuestion, index: number) => {
	const { userSelectedAnswer, correctAnswer } = info;

	if (userSelectedAnswer == null) return 'transparent';
	if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
	if (index === correctAnswer) return 'green';
	if (index === userSelectedAnswer) return 'red';

	return 'transparent';
};

const Question = ({ info }: { info: IQuestion }) => {
	const selectAnswer = useQuestionStore((state) => state.selectedAnswer);

	const createHandleClick = (answerIndex: number) => () => {
		selectAnswer(info.id, answerIndex);
	};

	const renderItem = () => {
		if (!info) return;

		return info.answers.map((answer, index) => (
			<ListItem key={index} disablePadding sx={{ marginBottom: 2 }} divider>
				<ListItemButton
					onClick={createHandleClick(index)}
					sx={{ backgroundColor: getBackgroundColor(info, index) }}
					disabled={info.userSelectedAnswer != null}>
					<ListItemText primary={answer} sx={{ textAlign: 'center' }} />
				</ListItemButton>
			</ListItem>
		));
	};

	return (
		<Card variant='outlined' sx={{ bgcolor: '#222', border: '1px solid white', p: 2, textAlign: 'left' }}>
			<Typography variant='h5' textAlign='center'>
				{info.question}
			</Typography>

			<SyntaxHighlighter
				language='javascript'
				style={gradientDark}
				customStyle={{
					fontSize: '17px',
					textAlign: 'left',
					padding: '20px',
					paddingRight: '50px',
					borderRadius: '5px',
				}}>
				{info.code}
			</SyntaxHighlighter>

			<List sx={{ bgcolor: '#333' }} disablePadding>
				{renderItem()}
			</List>
		</Card>
	);
};

export default Question;
