import useFetch from "hooks/useFetch";
import React, { useState } from "react";
import { IWord } from "types";

const CreateWordList = () => {
  const [addingWords, setAddingWords] = useState<IWord[]>([]);
	const [wordId, setWordId] = useState(0);
	const [day, setDay] = useState("1");
  const [eng, setEng] = useState("");
  const [kor, setKor] = useState("");
	const url = "http://localhost:3001/days";
	const [days, ] = useFetch<IWord>(url);

	const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {target: {name, value}} = e;
		name === 'kor' ? setKor(value) : setEng(value);
	}

	const createWord = () => {
		console.log(wordId);
		const newWord:IWord = {
			id: wordId,
			day: Number(day), 
			eng,
			kor,
			isDone: false,
		}

		const newWords = addingWords.slice(0);
		newWords.push(newWord);
		setAddingWords(newWords);
		setWordId(prev => prev + 1);
		setEng("");
		setKor("");
	}

	const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const {target: {value: day}} = event;
		setDay(day);
	}

  return (
    <>
      <div>
        <ul>
          {addingWords.map((word) => (
            <li key={word.id}>
							<div>
								<span>{word.day}</span>
								<span>{word.eng}</span>
								<span>{word.kor}</span>
							</div>
						</li>
          ))}
        </ul>
      </div>
      <div>
				<select value={day} onChange={onSelectChange}>
					{days.map((mday) => (
						<option key={mday.id} value={mday.day}>
							{mday.day}
						</option>
					))}
				</select>
        <input value={eng} name="eng" onChange={inputChange} placeholder="단어를 입력하세요." required />
        <input value={kor} name="kor" onChange={inputChange} placeholder="뜻을 입력하세요." required />
				<button onClick={createWord}>추가하기</button>
      </div>

			<form>
				<input type="submit" value="생성하기"/>
			</form>
    </>
  );
};

export default CreateWordList;
