import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemsState {
  items: Item[];
  selectedItems: number[];
}

const initialState: ItemsState = {
  items: [
    { id: 1, code: "GMI-555-BALL", name: "GMI-555-BALL", brand: "555", type: "Ball-Joint", warehouse: "Tamansari", stock: 100 },
    { id: 2, code: "GMI-212-UNIT", name: "GMI-212-UNIT", brand: "212UNIT", type: "Ball-Joint", warehouse: "Tamansari", stock: 120 },
    { id: 3, code: "GMI-123-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 4, code: "GMI-124-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 5, code: "GMI-125-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 6, code: "GMI-126-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 7, code: "GMI-127-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 8, code: "GMI-128-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 9, code: "GMI-129-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 10, code: "GMI-130-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 11, code: "GMI-131-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 12, code: "GMI-132-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 13, code: "GMI-133-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 14, code: "GMI-134-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
    { id: 15, code: "GMI-135-BALL", name: "GMI-123-BALL", brand: "123-TIPE", type: "Ball-Joint", warehouse: "Tamansari", stock: 122 },
  ],
  selectedItems: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      if (state.selectedItems.includes(itemId)) {
        state.selectedItems = state.selectedItems.filter((id) => id !== itemId);
      } else {
        state.selectedItems.push(itemId);
      }
    },
    selectAllItems: (state) => {
      if (state.selectedItems.length === state.items.length) {
        state.selectedItems = [];
      } else {
        state.selectedItems = state.items.map((item) => item.id);
      }
    },
    clearSelection: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, selectAllItems, clearSelection } = itemsSlice.actions;
export default itemsSlice.reducer;
