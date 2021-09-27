import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<h1>Ebbinghaus-voca</h1>
			<ul className="header__period">
				<li>
					<button>1Day</button>
				</li>
				<li>
					<button>7Day</button>
				</li>
				<li>
					<button>30Day</button>
				</li>
				<li>
					<button>180Day</button>
				</li>
				<li>
					<Link to="/create_word">
						단어 추가하기
					</Link>
				</li>
			</ul>
		</header>
	)
}
