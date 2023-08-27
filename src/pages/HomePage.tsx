import React, { FC, useEffect, useState } from "react";
import CalculateMax from "../components/CalculateMax";
import CalculateTraining from "../components/CalculateTraining";

interface ITrainingData {
  weight: string;
  reps: string;
  max: string;
}

const HomePage: FC = () => {
  const [weight, setWeight] = useState<string>(() => {
    const storedData = localStorage.getItem("trainingData");
    return storedData ? JSON.parse(storedData).weight : "";
  });

  const [reps, setReps] = useState<string>(() => {
    const storedData = localStorage.getItem("trainingData");
    return storedData ? JSON.parse(storedData).reps : "";
  });

  const [max, setMax] = useState<string>(() => {
    const storedData = localStorage.getItem("trainingData");
    return storedData ? JSON.parse(storedData).max : "";
  });

  useEffect(() => {
    const data: ITrainingData = { weight, reps, max };
    localStorage.setItem("trainingData", JSON.stringify(data));
  }, [weight, reps, max]);

  return (
    <main className="main">
      <div className="container">
        <h1 className="title">Тренировка по жиму лежа</h1>
      </div>
      <CalculateMax
        weight={weight}
        reps={reps}
        setWeight={setWeight}
        setReps={setReps}
      />
      <CalculateTraining max={max} setMax={setMax} />
    </main>
  );
};

export default HomePage;
