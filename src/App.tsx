import Home from "./views/Home/Home";
import DefaultLayout from "./layout/DefaultLayout";
import { Switch, Route } from "react-router-dom";
import Fixture from "./views/Fixture/Fixture";
import Results from "./views/Results/Results";

const App = () => (
  <DefaultLayout>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/fixture">
        <Fixture />
      </Route>
      <Route exact path="/results">
        <Results />
      </Route>
    </Switch>
  </DefaultLayout>
);

export default App;
