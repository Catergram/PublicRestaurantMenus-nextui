import { GET_RESTAURANT, RESTAURANT_ERROR } from "../types";
import { API } from 'aws-amplify';
import {getRestaurant} from "../../src/graphql/queries";

export const getRestaurantData = () => async (dispatch) => {
	try {
		const postData = await API.graphql({
			query: getRestaurant,
			variables: {id: '4c5f8cce-6fed-4c6e-ab89-447781cbcac6'},
			authMode: "API_KEY"
		})

		dispatch({
			type: GET_RESTAURANT,
			payload: postData.data.getRestaurant,
		});
	} catch (error) {
		dispatch({
			type: RESTAURANT_ERROR,
			payload: "error message",
		});
	}
};