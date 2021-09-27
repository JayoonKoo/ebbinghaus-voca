import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<Link to="/">
				<h1>Ebbinghaus-voca</h1>
			</Link>
			<ul className="header__create">
				<li>
					<Link 
						to="/create_word"
						className="header__create-word">
						단어 추가하기
					</Link>
				</li>
				<li>
					<Link 
						to="/create_day"
						className="header__create-day">
						Day 추가하기
					</Link>
				</li>
			</ul>
		</header>
	)
}
