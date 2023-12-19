import "./App.css";
import HomePage from "./components/Home/HomePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="app">
      <nav>
        <Navbar />
      </nav>
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;
