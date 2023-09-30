import { FC } from "react";
import { percentages, repetitions } from "../utils/data";

interface ICalculateTrainingWeek {
  trainingWeights: number;
  index: number;
}

const CalculateTrainingWeek: FC<ICalculateTrainingWeek> = ({ trainingWeights, index }) => {
  return (
    <div key={index} className="calcTrain__item">
      <p className="calcTrain__item-text">
        <span className="calcTrain__item-span">Неделя:</span> {index + 1}
      </p>
      <p className="calcTrain__item-text">
        <span className="calcTrain__item-span">Вес:</span> {trainingWeights} кг
      </p>
      <p className="calcTrain__item-text">
        <span className="calcTrain__item-span">Процент от ПМ:</span>{" "}
        {percentages[index]}%
      </p>
      <p className="calcTrain__item-text">
        <span className="calcTrain__item-span">Количество повторений:</span>{" "}
        {repetitions[index]}
      </p>
    </div>
  );
};

export default CalculateTrainingWeek;
