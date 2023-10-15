import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { IApproach, IWorkout } from "./types";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/FirebaseConfig";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

const AddWorkoutModal: React.FC<{
  open: boolean;
  onClose: () => void;
  setWorkouts: (workouts: IWorkout[]) => void;
}> = (props) => {
  const [date, setDate] = useState<string>("");
  const [user] = useAuthState(auth);
  const [weight, setWeight] = useState<string>("");
  const [repetitions, setRepetitions] = useState<string>("");
  const [approaches, setApproaches] = useState<IApproach[]>([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    if (user) {
      const q = query(
        collection(db, "workout"),
        where("uid", "==", user.uid),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(q);
      const workoutData: IWorkout[] = [];

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const approaches = await loadApproaches(doc.id);
        workoutData.push({
          id: doc.id,
          date: data.date,
          approaches: approaches,
        });
      }

      props.setWorkouts(workoutData);
    }
  };

  const loadApproaches = async (workoutId: string) => {
    const q = query(
      collection(db, `workout/${workoutId}/approach`),
      orderBy("index", "asc")
    );
    const querySnapshot = await getDocs(q);
    const approachData: IApproach[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as IApproach;
      approachData.push(data);
    });

    return approachData;
  };

  const addWorkout = async () => {
    try {
      const workoutData = {
        uid: user?.uid,
        date: date,
      };

      const workoutRef = await addDoc(collection(db, "workout"), workoutData);

      approaches.forEach(async (approach) => {
        await addDoc(collection(db, `workout/${workoutRef.id}/approach`), {
          weight: approach.weight,
          repetitions: approach.repetitions,
          index: approach.index,
        });
      });

      setDate("");
      setWeight("");
      setRepetitions("");
      setApproaches([]);

      loadWorkouts();
    } catch (error) {
      console.error("Ошибка при добавлении тренировки:", error);
    }
  };

  const addApproach = () => {
    if (weight && repetitions) {
      const newApproach = { weight, repetitions, index: approaches.length };
      setApproaches([...approaches, newApproach]);
      setWeight("");
      setRepetitions("");
    }
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Добавление тренировки
          </Typography>
          <Button
            onClick={() => {
              addWorkout();
              props.onClose();
            }}
            autoFocus
            color="inherit"
          >
            Добавить тренировку
          </Button>
        </Toolbar>
      </AppBar>

      <DialogContent style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          className="input-modal"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          className="input-modal"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          label="Вес снаряда"
        />
        <TextField
          className="input-modal"
          type="number"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
          label="Количество повторений"
        />
        <List>
          {approaches.map((approach, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Подход ${index + 1}: Вес - ${
                  approach.weight
                }, Повторения - ${approach.repetitions}`}
              />
            </ListItem>
          ))}
        </List>
        <Button variant="outlined" color="primary" onClick={addApproach}>
          Добавить подход
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkoutModal;
