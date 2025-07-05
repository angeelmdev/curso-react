import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_STATE = [
  {
    id: "1",
    name: "Ángel Moreno",
    email: "angel.moreno@example.com",
    github: "angeelmdev"
  },
  {
    id: "2",
    name: "Yazman Rodriguez",
    email: "yazman.rodriguez@example.com",
    github: "yazman"
  },
  {
    id: "3",
    name: "Eduardo Mendoza",
    email: "eduardo.mendoza@example.com",
    github: "mendoza"
  }
];

export type UserId = string 

export interface User {
    name: string
    email: string
    github: string
}

export interface UserWithId extends User {
    id: string
}

const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__state__");
    if (persistedState) {
        return JSON.parse(persistedState).users;
    }
    return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            state.push({ id, ...action.payload })
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id);
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
          const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
          if (!isUserAlreadyDefined) {
            state.push(action.payload)
          }
        }
    },
})

export default usersSlice.reducer;

export const { rollbackUser, addNewUser, deleteUserById } = usersSlice.actions;
