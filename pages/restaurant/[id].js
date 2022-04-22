import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@nextui-org/react";

import RestaurantHome from '@components/Restaurant/RestaurantHome';
import Header from '@components/Header';
import Footer from '@components/Footer';
import {getRestaurantData} from "../../store/actions/restaurantAction";

export default function IndexPage() {
	const dispatch = useDispatch();
	const restaurant = useSelector((state) => state.restaurant.data);
	//
	useEffect(() => {
		dispatch(getRestaurantData());
	}, [dispatch]);

	if(!restaurant.name){
		return(<>Loading</>)
	}
	return (
		<>
			<Header />
			<Grid.Container css={{ background: "#fcfcfc" }} justify="center">
				<Grid xs={1} />
				<Grid xs={10}>
					<RestaurantHome />
				</Grid>
				<Grid xs={1} />
			</Grid.Container>
			<Footer />
		</>
	)

}
