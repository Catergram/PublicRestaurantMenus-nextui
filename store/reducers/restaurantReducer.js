import { GET_RESTAURANT, RESTAURANT_ERROR } from "../types";

const initialState = {
	data: {
		menus: [],
		file: []
	},
	loading: true,
};

const restaurantReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_RESTAURANT:
			return {
				...state,
				data: action.payload,
				loading: false,
			};

		case RESTAURANT_ERROR:
			return {
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default restaurantReducer;