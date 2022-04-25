import { Grid } from "@nextui-org/react";

import RestaurantHome from '@components/Restaurant/RestaurantHome';
import Header from '@components/Header';
import Footer from '@components/Footer';
import {API} from "aws-amplify";
import {getListOfRestaurantsId, getListRestaurants, getRestaurant} from "../../src/graphql/queries";

export const getStaticPath = async () => {
	let paths = []
	try{
		const postData = await API.graphql({
			query: getListOfRestaurantsId,
			authMode: "API_KEY"
		})
		paths = postData.data.listRestaurants.items.map((item) => {
			return {
				id: item.id
			}
		});

	} catch (e) {
		console.error(e)
	}
	return {
		paths: paths,
		fallback: 'blocking'
	}
}

export const getServerSideProps = async (context) => {
	const id = context.params.id;
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
		}
	}
}

export default function IndexPage({restaurant}) {

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
