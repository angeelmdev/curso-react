import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
}

const syncWithDatebaseMiddleware: Middleware = store => next => action => {
    const { type, payload } = action
    // fase 1
    const previosState = store.getState() as RootState

    next(action)

    //fase 2
    if (type === 'users/deleteUserById') {
        const userIdToRemove = payload
        const userToRemove = previosState.users.find(user => user.id === userIdToRemove)

        fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                toast.success(`Usuaurio ${payload} eliminado correctamente`)
            }
        })
        .catch(() => {
            toast.error(`Error deleting user ${userIdToRemove}`)
            if (userToRemove) store.dispatch(rollbackUser(userToRemove))
            console.log('error')
        })
    }
}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: [syncWithDatebaseMiddleware, persistanceLocalStorageMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
