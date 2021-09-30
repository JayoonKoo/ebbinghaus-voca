import useFetch from "hooks/useFetch";
import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import { IDay } from "types";

const CreateWord = () => {
  const { day } = useParams<{ day: string | undefined }>();
  const [eng, setEng] = useState("");
  const [kor, setKor] = useState("");
  const dayUrl = `http://localhost:3001/days`;
  const wordUrl = `http://localhost:3001/words`;
  const [days] = useFetch<IDay>(dayUrl);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let formDay: string;
    if (typeof day === "string") {
      formDay = day;
    } else if (dRef.current) {
      formDay = dRef.current.value;
    } else {
      console.log("날짜를 설정해야 합니다.");
      return;
    }

		fetch(`${wordUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				day: Number(formDay),
				eng,
				kor,
				isDone: false,
			}),
		}).then((res) => {
			if (res.ok) {
				setEng("");
				setKor("");
			}
		});
  }

  const dRef = useRef<HTMLSelectElement>(null);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {target: {name, value}} = event;
		if (name === "eng") {
			setEng(value);
		} else {
			setKor(value);
		}
	};

  return (
    <>
      <form onSubmit={onSubmit}>
        {day === undefined ? (
          <select ref={dRef}>
            {days.map((mday) => (
              <option key={mday.id} value={mday.day}>
                {mday.day}
              </option>
            ))}
          </select>
        ) : null}
        <input
          name="eng"
          value={eng}
          onChange={onInputChange}
          type="text"
          placeholder="영어 입력"
          required={true}
        />
        <input
					name="kor"
          value={kor}
          onChange={onInputChange}
          type="text"
          placeholder="한글 입력"
          required={true}
        />
        <input type="submit" value="생성" />
      </form>
    </>
  );
};

export default CreateWord;
