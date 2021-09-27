import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './component/Header';

function App() {
  return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/">
					<h1>메인 페이지 입니다.</h1>
				</Route>
				<Route path="/words">
					<h1>단어 페이지 입니다.</h1>
				</Route>
				<Route path="/create_word">
					<h1>단어 생성 페이지입니다.</h1>
				</Route>
				<Route>
					<h1>잘못된 url 입니다.</h1>
				</Route>
			</Switch>
		</BrowserRouter>
  );
}

export default App;
