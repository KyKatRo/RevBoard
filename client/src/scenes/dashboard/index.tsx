import { Box, useMediaQuery } from "@mui/material";
import Row1 from "@/scenes/dashboard/Row1.tsx";
import Row2 from "@/scenes/dashboard/Row2.tsx";
import Row3 from "@/scenes/dashboard/Row3.tsx";

const gridTemplateLarge = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d h f"
    "d h f"
    "d h e"
    "g h e"
    "g h j"
    "g h j"
`;

const gridTemplateSmall = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "h"
    "j"
    "j"
`;

const Dashboard = () => {
	const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
	return (
		<Box
			width={"100%"}
			height={"100%"}
			display={"grid"}
			gap={"1.5rem"}
			sx={
				isAboveMediumScreens
					? {
							gridTemplateColumns:
								"repeat(3, minmax(340px, 1fr))",
							gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
							gridTemplateAreas: gridTemplateLarge,
					  }
					: {
							gridAutoColumns: "1fr",
							gridAutoRows: "80px",
							gridTemplateAreas: gridTemplateSmall,
					  }
			}
		>
			<Row1 />
			<Row2 />
			<Row3 />
		</Box>
	);
};

export default Dashboard;
