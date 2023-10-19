import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';

function App() {
  return (
    <div className="container p-3">
    <div>
      <Navbar />
      <Card />
    </div>

      <div className="row">
        <div className="col-md-6">
        <Card />
        </div>
        <div className="col-md-6">
        <Card />
      </div>
    </div>
    </div>
  );
}
export default App;
