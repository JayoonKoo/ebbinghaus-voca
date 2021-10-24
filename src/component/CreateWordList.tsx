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
	const wordUrl = "http://localhost:3001/words";
  const [days] = useFetch<IWord>(url);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    name === "kor" ? setKor(value) : setEng(value);
  };

  const createWord = () => {
		if (!eng || !kor) {
			alert("입력란을 채워주세요.");
			return;
		}
    const newWord: IWord = {
      id: wordId,
      day: Number(day),
      eng,
      kor,
      isDone: false,
    };

    const newWords = addingWords.slice(0);
    newWords.push(newWord);
    setAddingWords(newWords);
    setWordId((prev) => prev + 1);
    setEng("");
    setKor("");
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value: day },
    } = event;
    setDay(day);
  };

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			for (let word of addingWords) {
				const {day, eng, kor, isDone} = word;
				await fetch(wordUrl, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						day: Number(day),
						eng,
						kor,
						isDone,
					})
				})
			}
			setAddingWords([]);
			setWordId(0);
			setEng("");
			setKor("");
		} catch (error) {
			console.log(error);
		}
	}

  return (
    <>
      <div className="adding">
        <ul className="adding__list">
          {addingWords.map((word) => (
            <li className="adding__item" key={word.id}>
              <div className="adding__item--word">
                <span className="adding__day">{word.day}</span>
                <span className="adding__eng">{word.eng}</span>
                <span className="adding__kor">{word.kor}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="create-form">
        <select value={day} onChange={onSelectChange} className="day-select">
          {days.map((mday) => (
            <option key={mday.id} value={mday.day}>
              {mday.day}
            </option>
          ))}
        </select>
        <input
          value={eng}
					type="text"
          name="eng"
          onChange={inputChange}
          placeholder="단어를 입력하세요."
          required={true}
					className="input-eng input"
        />
        <input
          value={kor}
					type="text"
          name="kor"
          onChange={inputChange}
          placeholder="뜻을 입력하세요."
          required={true}
					className="input-kor input"
        />
        <button onClick={createWord} className="add-btn btn">추가</button>
      </div>

      <form onSubmit={onSubmit}>
        <input type="submit" value="생성하기" className="btn list-submit-btn"/>
      </form>
    </>
  );
};

export default CreateWordList;
