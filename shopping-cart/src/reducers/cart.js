export const cartInitialState = JSON.parse(localStorage.getItem('cart')) || [];

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

// update localStorage whenever the cart changes
export const updateLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;
    
    switch (actionType) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const { id } = actionPayload
            const productInCartindex = state.findIndex(item => item.id === id)

            if (productInCartindex >= 0) {
                const newState = structuredClone(state)
                newState[productInCartindex].quantity += 1
                updateLocalStorage(newState)
                return newState
            }

            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ];

            updateLocalStorage(newState)
            return newState;
        }

        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            const { id } = actionPayload
            const newState = state.filter(item => item.id !== id)
            updateLocalStorage(newState)
            return newState
        }

        case CART_ACTION_TYPES.CLEAR_CART: {
            updateLocalStorage([])
            return []
        }
    }

    return state;
}