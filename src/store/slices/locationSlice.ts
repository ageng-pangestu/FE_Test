import { createSlice } from "@reduxjs/toolkit";

interface LocationState {
  locations: ILocation[];
}

const initialState: LocationState = {
  locations: [
    { locationName: "Jakarta", warehouse: "Gudang 1", type: "Type 1", volume: 700, description: "PCS" },
    { locationName: "Depok", warehouse: "Gudang 2", type: "Type 2", volume: 700, description: "PCS" },
  ],
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
});

export const {} = locationSlice.actions;
export default locationSlice.reducer;
