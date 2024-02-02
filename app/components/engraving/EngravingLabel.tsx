import EngravingContext from "@/app/contexts/EngravingContext";
import EngravingReduction from "@/app/contexts/EngravingReduction";
import { getReduction } from "@/app/libs/getItemData";
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

interface IParams {
    engraving: string;
    value: number;
}

const EngravingLabel: React.FC<IParams> = ({
    engraving,
    value,
}) => {
    const isReduce = useContext(EngravingReduction);
    const engravingContextData = useContext(EngravingContext);
    if (isReduce) {
        const reductions = getReduction();
        engraving = reductions[engraving];
    } else {
        engraving = engravingContextData[engraving];
    }
    const level = Math.floor(value / 5) > 3 ? 3 : Math.floor(value / 5);
    const label = `Lv. ${level} ${engraving}`;
    let textColor = '';
    if (!isReduce) {
        if (value >= 15) {
            textColor = 'text-yellow-400';
        } else if (value >= 5) {
            textColor = 'text-zinc-200';
        } else {
            textColor = 'text-zinc-600';
        }
    } else {
        if (value >= 5) {
            textColor = 'text-orange-700';
        } else {
            textColor = 'text-zinc-600';
        }
    }
    
    return (
        <Box className={`font-semibold ${textColor}`}>
            {label}
        </Box>
    )
}

export default EngravingLabel;