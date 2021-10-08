import React, { useState } from "react";
import { useParams } from "react-router";

interface IProps {
	onSubmitWord?(): void;
}

const CreateWord = ({onSubmitWord}: IProps) => {
  const { day } = useParams<{ day: string | undefined }>();
  const [eng, setEng] = useState("");
  const [kor, setKor] = useState("");
  const wordUrl = `http://localhost:3001/words`;

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

		fetch(`${wordUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				day: Number(day),
				eng,
				kor,
				isDone: false,
			}),
		}).then((res) => {
			if (res.ok) {
				setEng("");
				setKor("");
				if (typeof onSubmitWord === "function") {
					onSubmitWord();
				}
			}
		});

  }

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
