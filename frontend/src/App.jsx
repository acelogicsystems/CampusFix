import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-layout">
      <Sidebar/>

      <main className="main-content">
        <h1>Welcome to CampusFix</h1>
        <p>Your Campus maintenance dashboard.</p>
      </main>
    </div>
  );
}

export default App;