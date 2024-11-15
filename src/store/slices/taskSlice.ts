import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasks: Item[];
  selectedLocations: ILocation[];
}

const initialState: TaskState = {
  tasks: [],
  selectedLocations: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Item[]>) => {
      state.tasks.push(...state.tasks, ...action.payload);
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
    addSelectedLocation: (state, action: PayloadAction<ILocation>) => {
      state.selectedLocations.push(action.payload);
    },
    removeLocation: (state, action: PayloadAction<{ itemCode: string; locationName: string }>) => {
      state.selectedLocations = state.selectedLocations.filter((location) => !(location.itemCode === action.payload.itemCode && location.locationName === action.payload.locationName));
    },
  },
});

export const { addTask, clearTasks, addSelectedLocation, removeLocation } = taskSlice.actions;
export default taskSlice.reducer;
