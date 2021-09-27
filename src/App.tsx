import {BrowserRouter, Route, Switch } from 'react-router-dom'
import DayList from './component/DayList';
import Header from './component/Header';

function App() {
  return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/">
					<DayList />
				</Route>
				<Route path="/words/:day">
					<h1>단어 페이지 입니다.</h1>
				</Route>
				<Route path="/create_word/:day?">
					<h1>단어 생성 페이지입니다.</h1>
				</Route>
				<Route path="/create_day">
					<h1>날짜 생성 페이지입니다.</h1>
				</Route>
				<Route>
					<h1>잘못된 url 입니다.</h1>
				</Route>
			</Switch>
		</BrowserRouter>
  );
}

export default App;
