import { FC, useState } from "react";

interface ICalculateMaxProps {
  weight: string;
  reps: string;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  setReps: React.Dispatch<React.SetStateAction<string>>;
}

const CalculateMax: FC<ICalculateMaxProps> = ({
  weight,
  reps,
  setWeight,
  setReps,
}) => {
  const [brzyckiMax, setBrzyckiMax] = useState<string>("");
  const [epleyMax, setEpleyMax] = useState<string>("");
  const [landerMax, setLanderMax] = useState<string>("");

  const calculateMaxes = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const weightParseFloat = parseFloat(weight);
    const repsParseInt = parseInt(reps);

    if (!isNaN(weightParseFloat) && !isNaN(repsParseInt)) {
      const brzycki: number = weightParseFloat / (1.0278 - 0.0278 * repsParseInt);
      const epley: number = (1 + repsParseInt * 0.033) * weightParseFloat;
      const lander: number = weightParseFloat / (1.013 - 0.0267123 * repsParseInt);

      setBrzyckiMax(brzycki.toFixed(2));
      setEpleyMax(epley.toFixed(2));
      setLanderMax(lander.toFixed(2));
    }
  };

  return (
    <section className="calcMax">
      <div className="container">
        <div className="calcMax__inner">
          <h2 className="calcMax__title">Расчет одноповторного максимума</h2>
          <form onSubmit={calculateMaxes} className="calcMax__form">
            <div className="calcMax__form-wrap">
              <label className="calcMax__label" htmlFor="weight">
                Вес:
              </label>
              <input
                className="calcMax__input"
                id="weight"
                type="number"
                min={0}
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                placeholder="кг"
              />
            </div>
            <div className="calcMax__form-wrap calcMax__form-wrapLast">
              <label className="calcMax__label" htmlFor="reps">
                Количество повторов:
              </label>
              <input
                className="calcMax__input"
                id="reps"
                type="number"
                min={0}
                value={reps}
                onChange={(e) => {
                  setReps(e.target.value);
                }}
                placeholder="кол-во"
              />
            </div>
            <div className="calcMax__btns">
              <button className="calcMax__btn btn" type="submit">
                Рассчитать ПМ
              </button>
            </div>
          </form>

          <table className="calcMax__table">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="calcMax__table-header calcMax__table-header-none"
                >
                  &nbsp;
                </th>
                <th scope="col" className="calcMax__table-header">
                  Бжицки
                </th>
                <th scope="col" className="calcMax__table-header">
                  Эпли
                </th>
                <th scope="col" className="calcMax__table-header">
                  Лэндера
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="calcMax__table-header calcMax__table-header-none">
                  Т. Максимум
                </th>
                <td data-label="Бжицки" className="calcMax__table-cell">
                  {brzyckiMax}
                </td>
                <td data-label="Эпли" className="calcMax__table-cell">
                  {epleyMax}
                </td>
                <td data-label="Лэндера" className="calcMax__table-cell">
                  {landerMax}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CalculateMax;
