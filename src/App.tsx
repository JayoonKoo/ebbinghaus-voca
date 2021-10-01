import {BrowserRouter, Route, Switch } from 'react-router-dom'
import DayList from 'component/DayList';
import Header from 'component/Header';
import WordList from 'component/WordList';
import CreateWord from 'component/CreateWord';

function App() {
  return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/">
					<DayList />
				</Route>
				<Route path="/words/:day">
					<WordList />
				</Route>
				<Route path="/create_word/:day?">
					<CreateWord />
				</Route>
				<Route>
					<h1>잘못된 url 입니다.</h1>
				</Route>
			</Switch>
		</BrowserRouter>
  );
}

export default App;
