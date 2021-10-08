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
        <input
          value={eng}
					type="text"
          name="eng"
          onChange={inputChange}
          placeholder="단어를 입력하세요."
          required={true}
        />
        <input
          value={kor}
					type="text"
          name="kor"
          onChange={inputChange}
          placeholder="뜻을 입력하세요."
          required={true}
        />
        <button onClick={createWord}>추가하기</button>
      </div>

      <form onSubmit={onSubmit}>
        <input type="submit" value="생성하기" />
      </form>
    </>
  );
};

export default CreateWordList;
