import { useCurrentScore } from '../../hooks/useCurrentScore';

const Score = () => {
	const { correctAnswers, wrongAnswers } = useCurrentScore();

	return (
		<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
			<span>{`✅ ${correctAnswers}`}</span>
			<span>{`❌ ${wrongAnswers}`}</span>
		</div>
	);
};

export default Score;
