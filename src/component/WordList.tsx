import { useParams } from "react-router"
import useFetch from "hooks/useFetch"
import { IWord } from "types"
import Word from "component/Word";

export default function Words() {
	const {day} = useParams<{day: string}>();
	const url = `http://localhost:3001/words/?day=${day}`;
	const [words, ] = useFetch<IWord>(url);

	return (
		<div className="words">
			<ul className="words__list">
				{words.map(word => (
					<Word word={word} key={word.id} />
				))}
			</ul>
		</div>
	)
}
