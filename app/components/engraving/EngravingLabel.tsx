import { Box } from "@chakra-ui/react";
import React from "react";

interface IParams {
    engraving: string;
    value: number;
}

const EngravingLabel: React.FC<IParams> = ({
    engraving,
    value,
}) => {
    const level = Math.floor(value / 5);
    const label = `Lv. ${level} ${engraving}`;
    return (
        <Box className={`font-semibold ${value >= 15 ? 'text-yellow-400' : value < 5 ? 'text-gray-600' : ''}`}>
            {label}
        </Box>
    )
}

export default EngravingLabel;