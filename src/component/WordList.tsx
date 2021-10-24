import { useParams } from "react-router"
import useFetch from "hooks/useFetch"
import { IWord } from "types"
import Word from "component/Word";
import CreateWord from "component/CreateWord";

export default function Words() {
	const {day} = useParams<{day: string}>();
	const url = `http://localhost:3001/words/?day=${day}`;
	const [words, setWords ] = useFetch<IWord>(url);
	
	const handleSubmit = async () => {
		const reponse = await fetch(url);
		const newWords = await reponse.json();
		setWords(newWords);
	}

	return (
		<>
		<div className="words">
			<ul className="words__list">
				{words.map(word => (
					<Word word={word} key={word.id} />
				))}
			</ul>
		</div>
		<CreateWord onSubmitWord={handleSubmit}/>
		</>
	)
}
