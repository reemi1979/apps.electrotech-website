// src/pages/About/AchievementPhotos.js

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const imageList = [
	`${process.env.PUBLIC_URL}/photos/achievements/a.jpg`,
	`${process.env.PUBLIC_URL}/photos/achievements/b.jpg`,
	`${process.env.PUBLIC_URL}/photos/achievements/c.jpg`,
	`${process.env.PUBLIC_URL}/photos/achievements/d.jpg`,
	`${process.env.PUBLIC_URL}/photos/achievements/e.jpg`,
	`${process.env.PUBLIC_URL}/photos/achievements/f.jpg`,
	`${process.env.PUBLIC_URL}/photos/achievements/g.jpg`,
	`${process.env.PUBLIC_URL}/photos/achievements/h.jpg`,
];

const AchievementsPhotos = () => {
	const [index, setIndex] = useState(0);

	
	useEffect(() => {
		const interval = setInterval(() => {
		setIndex((prev) => (prev + 1) % imageList.length);
		}, 3000); // change every 3 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<Box
		sx={{
			width: '100%',
			maxWidth: 1000,
			height: 'auto',
			aspectRatio: '2 / 1',
			overflow: 'hidden',
			borderRadius: 4,
			mx: 'auto',
			mb: 4,
			position: 'relative',
		}}
		>
		<Box
			sx={{
			display: 'flex',
			width: `${imageList.length * 100}%`,
			transform: `translateX(-${index * (100 / imageList.length)}%)`,
			transition: 'transform 1s ease',
			}}
		>
			{imageList.map((src, i) => (
			<Box
				key={i}
				component="img"
				src={src}
				alt={`slide-${i}`}
				sx={{
				width: `${100 / imageList.length}%`,
				height: 'auto',
				objectFit: 'cover',
				}}
			/>
			))}
		</Box>
		</Box>
	);
};

export default AchievementsPhotos;
