import { Container, Stack, Typography } from '@mui/material';
import './App.css';
import Start from './Start';
import { useQuestionStore } from './store/questions';
import { JavasScriptLogo } from './Components/JavaScriptLogo';
import Game from './Components/Game';

function App() {
	const questions = useQuestionStore((state) => state.questions);

	return (
		<main>
			<Container maxWidth='sm'>
				<Stack direction='row' gap={2} alignItems='center' justifyContent='center' marginBottom={4}>
					<JavasScriptLogo />
					<Typography variant='h2' component='h1'>
						Javascript Quizz
					</Typography>
				</Stack>

				{questions.length === 0 && <Start />}
				{questions.length > 0 && <Game />}
			</Container>
		</main>
	);
}

export default App;
