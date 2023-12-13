import React, {useState, useContext} from 'react';

export const layouts = {
    default: "default",
    thanksGiving: "thanksGiving"
};

const LayoutContext = React.createContext({
    layout: layouts.default,
    setLayout: () => {}
});

const LayoutProvider = ({children}) => {
    const [layout, setLayout] = useState(layouts.default)
    return <LayoutContext.Provider value={{layout: layout, setLayout: setLayout}}>{children}</LayoutContext.Provider>
};

export {LayoutContext, LayoutProvider};

export function useLayout() {
    return useContext(LayoutContext)
}