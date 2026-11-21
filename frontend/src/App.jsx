import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";

function App() {
  return (
    <div className="app-layout">
      <Sidebar/>

      <main className="main-content">
        <Header/>
        <Stats />
      </main>
    </div>
  );
}

export default App;