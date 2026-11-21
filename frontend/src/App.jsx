import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import RecentIssues from "./components/RecentIssues";

function App() {
  return (
    <div className="app-layout">
      <Sidebar/>

      <main className="main-content">
        <Header/>
        <Stats />
        <RecentIssues />
      </main>
    </div>
  );
}

export default App;