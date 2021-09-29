import { useState } from 'react';
import { IWord } from 'types'

interface IProps {
  word: IWord;
}

const Word = ({word: w}: IProps) => {
	const [word, setWord] = useState(w);
	const [isShow, setIsShow] = useState(false);
	const [isDone, setIsDone] = useState(word.isDone);
	const url = `http://localhost:3001/words/${word.id}`;

	function toggleDone() {
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				...word,
				isDone: !isDone
			})
		})
			.then(res => {
				if (res.ok) {
					setIsDone(!isDone);
				}
			})
	}

	function toggleShow() {
		setIsShow(!isShow);
	}

	function del() {
		if (window.confirm("삭제하시겠습니까?")) {
			fetch(url, {
				method: "DELETE",
			})
				.then(res => {
					if (res.ok) {
						alert("삭제되었습니다.");
						setWord({
							...word,
							id: 0,
						})
					}
				})
		}
	}

	if (word.id === 0) return null;


	return (
		<li className={isDone? "off": ""}>
			<input type="checkbox" onChange={toggleDone} checked={isDone}></input>
			<span>{word.eng}</span>
			<span>{isShow? word.kor : ""}</span>
			<button onClick={toggleShow}>뜻 {isShow? "숨기기" : "보기"}</button>
			<button onClick={del}>삭제</button>
		</li>
	)
}

export default Word;
