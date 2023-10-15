import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddWorkoutModal from "../components/diary/AddWorkoutModal";
import WorkoutList from "../components/diary/WorkoutList";
import { IWorkout } from "../components/diary/types";

const DiaryPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <div className="container">
      <Button
        variant="contained"
        color="primary"
        onClick={openModalHandler}
        sx={{ marginBottom: 4 }}
      >
        Открыть модальное окно
      </Button>

      <h2>Добавленные тренировки:</h2>
      <WorkoutList workouts={workouts} />

      <AddWorkoutModal
        open={openModal}
        onClose={closeModalHandler}
        setWorkouts={setWorkouts}
      />
    </div>
  );
};

export default DiaryPage;
