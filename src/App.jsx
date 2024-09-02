import { useState, useEffect } from "react";
import MoodChart from "./components/MoodChart";
import MoodInput from "./components/MoodInput";
import MoodList from "./components/MoodList";
import { getMoodsAPI, addMoodAPI } from "./services/apiService";
import "./App.css";

function App() {
  const [moods, setMoods] = useState([]);

  const updateMood = (id, updatedMood) => {
    setMoods((prevMoods) =>
      prevMoods.map((mood) => (mood.id === id ? updatedMood : mood))
    );
  };

  const deleteMood = (id) => {
    setMoods((prevMoods) => prevMoods.filter((mood) => mood.id !== id));
  };

  useEffect(() => {
    const fetchMoods = async () => {
      const moods = await getMoodsAPI();
      setMoods(moods);
    };

    fetchMoods();
  }, []);

  const addMood = async (mood) => {
    const newMood = await addMoodAPI(mood);
    setMoods([...moods, newMood]);
  };

  return (
    <div className="app">
      <div className="mood-header">
        <h1>Mood Tracker</h1>
        <MoodInput addMood={addMood} />
      </div>
      <div className="mood-container">
        <MoodList
          moods={moods}
          deleteMood={deleteMood}
          updateMood={updateMood}
        />
        <MoodChart moods={moods} />
      </div>
    </div>
  );
}

export default App;