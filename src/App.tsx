import Home from "./views/Home/Home";
import DefaultLayout from "./layout/DefaultLayout";
import { Switch, Route } from "react-router-dom";
import Players from "./views/Players/Players";
import Table from "./views/Table/Table";
import MatchCentre from "./views/MatchCentre/MatchCentre";

const App = () => (
  <Switch>
    <Route exact path="/">
      <DefaultLayout fullHeader>
        <Home />
      </DefaultLayout>
    </Route>

    <Route exact path="/table">
      <DefaultLayout fullHeader>
        <Table />
      </DefaultLayout>
    </Route>
    <Route exact path="/players">
      <DefaultLayout fullHeader>
        <Players />
      </DefaultLayout>
    </Route>
    <Route exact path="/results/:matchId">
      <DefaultLayout fullHeader={false}>
        <MatchCentre />
      </DefaultLayout>
    </Route>
  </Switch>
);

export default App;
