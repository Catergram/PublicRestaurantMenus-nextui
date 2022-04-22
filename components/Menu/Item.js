import {Col, Grid, Card} from "@nextui-org/react";

import Progress from "@components/Progress";
import MenuItemFooter from "./ItemFooter";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function ItemContent(props) {
	const router = useRouter()
	const { id } = router.query
	const { cardPointFile=[] } = props;
	const [active, setActive] = useState(0)
	const activeSlide = (index) => {
		setActive(index)
	}

	const next = () => {
		if (active < cardPointFile.length - 1) {
			activeSlide(active + 1)
		} else {
			activeSlide(0)
		}
	}

	useEffect(() => {
		let timer = setInterval(next, 5000)
		return () => clearInterval(timer)
	}, [active])

	return (
		<Grid xs={12} sm={4} xl={3} md={3}>
			<Card cover css={{ border: 'none' }}>
				<Card.Header
					css={{
						position: 'absolute',
					}}
				>
					{[...Array(cardPointFile.length).keys()].map((key) => (
						<Progress key={key} active={key === active} />
					))}
				</Card.Header>
				{cardPointFile.map((image, key) => (
					<Card.Image
						key={key}
						width="100%"
						height="100%"
						// height={340}
						src={`https://dgh3t0irkf4qk.cloudfront.net/public/${image.key}`}
						autoResize={false}
						active={`${key === active}`}
						className="cursor-pointer"
						alt="Card image background"
						containerCss={{
							d: key === active ? 'block' : 'none',
							height: "100%",
							maxHeight: "100vh",
							'@xsMax': {
								br: 0,
								minHeight: '40vh',
							},
						}}
						onClick={() => {
							// router.push('/story')
							router.push(`/restaurant/${id}/items/${props.id}`)
						}}
					/>
				))}
				<Card.Footer css={{ position: "absolute", zIndex: 1, bottom: 5 }}>
					<Col>
						<MenuItemFooter item={props}  />
					</Col>
				</Card.Footer>
			</Card>
		</Grid>
	);
}
