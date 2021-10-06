import {IDay, IWord} from 'types'
import useFetch from 'hooks/useFetch';
import { Link } from 'react-router-dom';

export default function DayList() {
	const url = `http://localhost:3001/days`;
	const [days, setDays] = useFetch<IDay>(url);
	const {day: lastDay} = days.reduce((prev, current) => {
		if (prev.day < current.day) return current;
		return prev;
	}, {day: 0, id: 0} as IDay)

	const fetchWords = () => {
		fetch(url)
			.then(res => res.json())
			.then(days => setDays(days));
	}

	async function del(e: React.MouseEvent, date: IDay ) {
		const {id, day} = date;
		const newDays = days.filter(date => date.day !== day);
		const words: IWord[] = await (await fetch(`http://localhost:3001/words/?day=${day}`)).json();
		const wordIds = words.reduce((ids: number[], word) => {
			ids.push(word.id);
			return ids;
		},[]);


		if (window.confirm("삭제하시겠습니까?")) {
			for (let wordId of wordIds) {
				await fetch(`http://localhost:3001/words/${wordId}`, {
					method: "DELETE",
				})
			}
			await fetch(`http://localhost:3001/days/${id}`, {
				method: "DELETE"
			})

			alert("삭제가 완료되었습니다.");
			setDays(newDays);
		}
	}

	const createDay = () => {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				day: lastDay + 1,
			})
		})
			.then(res => {
				if (res.ok) {
					fetchWords();
				}
			})
	}
	return (
		<>
		<ul className="day-list">
			{days.map(day => (
				<li 
					key={day.id} 
					className="day-list__item">
					<Link to={`/words/${day.day}`}>
						<span>{day.day}Day</span>
					</Link>
					<div className="day_list__btn">
						<button onClick={(e) => del(e, day)}>외움표시</button>
					</div>
				</li>
			))}
		</ul>
		<button onClick={createDay}>Day 추가하기</button>
		</>
	)
}
