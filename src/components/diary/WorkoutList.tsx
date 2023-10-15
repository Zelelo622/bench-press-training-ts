import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IApproach, IWorkout } from "./types";

const WorkoutList: React.FC<{ workouts: IWorkout[] }> = ({ workouts }) => {
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
                  primary={`Подход ${aIndex + 1}: Вес - ${approach.weight}, Пов - ${
                    approach.repetitions
                  }`}
                />
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  );
};

export default WorkoutList;
