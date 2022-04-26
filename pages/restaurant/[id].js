import { Grid } from "@nextui-org/react";

import RestaurantHome from '@components/Restaurant/RestaurantHome';
import Header from '@components/Header';
import Footer from '@components/Footer';
import {API} from "aws-amplify";
import {getListOfRestaurantsId, getRestaurant} from "../../src/graphql/queries";

export default function RestaurantHomePage({restaurant}) {

	return (
		<>
			<Header restaurant={restaurant} />
			<Grid.Container css={{ background: "#fcfcfc" }} justify="center">
				<Grid xs={1} />
				<Grid xs={10}>
					<RestaurantHome restaurant={restaurant}/>
				</Grid>
				<Grid xs={1} />
			</Grid.Container>
			<Footer />
		</>
	)

}

export const getStaticProps = async ({params}) => {
	const id = params.id;
	let data = null;
	try {
		const postData = await API.graphql({
			query: getRestaurant,
			variables: {id: id},
			authMode: "API_KEY"
		})

		data = postData.data.getRestaurant;
	} catch (error) {

	}

	return {
		props: {
			restaurant: data,
		},
		// - At most once every 10 seconds
		revalidate: 10, // In seconds
	}
}

export const getStaticPaths = async () => {
	let paths = []
	try{
		const postData = await API.graphql({
			query: getListOfRestaurantsId,
			authMode: "API_KEY"
		})
		paths = postData.data.listRestaurants.items.map((item) => {
			return {
				params: {
					id: item.id
				}
			}
		}).filter(({ params }) => !!params.id);

	} catch (e) {
		console.error(e)
	}
	return {
		paths: paths,
		fallback: false
	}
}
