import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IApproach, IWorkout } from "./types";
import { IconButton } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

const WorkoutList: React.FC<{ workouts: IWorkout[], onDeleteWorkout: (workout: IWorkout) => void }> = ({ workouts }) => {
  const handleDeleteWorkout = async (id: string) => {
    const workoutDoc = doc(db, "workout", id);
    await deleteDoc(workoutDoc);
  };

  return (
    <List className="workout__list">
      {workouts.map((workout, index) => (
        <ListItem
          className="workout__item"
          key={index}
          sx={{ border: "1px solid #ccc", marginBottom: 2 }}
        >
          <ListItemText
            className="workout__item-text"
            primary={`Дата: ${workout.date}`}
          />
          <List className="approache__list">
            {workout.approaches.map((approach: IApproach, aIndex: number) => (
              <ListItem className="approache__item" key={aIndex}>
                <ListItemText
                  primary={`Подход ${aIndex + 1}: Вес - ${
                    approach.weight
                  }, Пов - ${approach.repetitions}`}
                />
              </ListItem>
            ))}
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDeleteWorkout(workout.id)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </List>
        </ListItem>
      ))}
    </List>
  );
};

export default WorkoutList;
