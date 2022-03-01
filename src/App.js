import './App.css';
import Header from './components/Header';
import Figure from './components/Figure'

function App() {
  return (
    <>
      <Header />
      <div className = "game-container">
        <Figure />
      </div>
    </>
  );
}

export default App;
