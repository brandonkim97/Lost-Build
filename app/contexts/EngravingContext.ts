import React, { createContext } from 'react';

interface IParams {
    [key: string]: string;
}

const EngravingContext = createContext<IParams>({});

export default EngravingContext;
