import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react"
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { Suspense, useContext } from "react";
import { AbilityStone, Accessory, Book } from "../types";
import { Card } from "@/components/ui/card";
import PuffLoader from "react-spinners/PuffLoader";

const LazyListContent = React.lazy(() => import('./ListContent'));

interface IParams {
    data: Accessory[] | Book[] | AbilityStone[];
    setItemData: (e: any) => void;
}



const List: React.FC<IParams> = ({
    data,
    setItemData,
}) => {

    return (
        <Card>
            <ScrollArea className='border rounded p-3 h-[500px] mt-4'>
                <Suspense fallback={<Loading /> }>
                    <LazyListContent data={data} setItemData={setItemData} />
                </Suspense>
            </ScrollArea>
        </Card>
    )
}

const Loading = () => {
    return (
        <Box className='flex h-[450px] place-content-center items-center'>
            <PuffLoader color="#ffffff" />
        </Box>
    )
}

export default List;