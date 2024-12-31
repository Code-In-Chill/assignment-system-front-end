import 'react';
import Header from "./header/Header.jsx";

// eslint-disable-next-line react/prop-types
const AssignmentSystem = ({children}) => {
    return (
        <>
            <Header/>

            {children}
        </>
    );
};

export default AssignmentSystem;