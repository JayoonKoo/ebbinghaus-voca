import useFetch from "hooks/useFetch";
import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import {IDay} from 'types';

const CreateWord = () => {
	const {day} = useParams<{day: string | undefined}>();
	const [isLoading, setIsLoading] = useState(true);
	const dayUrl = `http://localhost:3001/days`;
	const wordUrl = `http://localhost:3001/words`;
	const [days, ] = useFetch<IDay>(dayUrl);

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


		if (eng.current && kor.current) {
			const engWord = eng.current.value;
			const korWord = kor.current.value;
			fetch(`${wordUrl}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					day: Number(formDay),
					eng: engWord,
					kor: korWord,
					isDone: false
				})
			})
				.then(res => {
					if (res.ok) {
						setIsLoading(false);
					}
				})
		}
	}
	
	const eng = useRef<HTMLInputElement>(null);
	const kor = useRef<HTMLInputElement>(null);
	const dRef = useRef<HTMLSelectElement>(null);

	return (
		<>
		<form onSubmit={onSubmit}>
			{day === undefined ? 
			<select ref={dRef}>
				{days.map(mday => (
					<option key={mday.id} value={mday.day}>{mday.day}</option>
				))}
			</select>: null}
			<input ref={eng} type="text" placeholder="영어 입력" required={true}/>
			<input ref={kor} type="text" placeholder="한글 입력" required={true}/>
			<input type="submit" value="생성"/> 
		</form>
		</>
	)
}

export default CreateWord;
