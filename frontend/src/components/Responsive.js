import React from "react";
import { useMediaQuery } from "react-responsive";

const Responsive = ({ element: Component, ...props }) => {

    const responsiveInfo = {
        isDesktop: useMediaQuery({ minWidth: 1024 }),
        isMobile: useMediaQuery({ maxWidth: 620 }),
        isTablet : useMediaQuery({ minWidth: 621, maxWidth: 1023 }),
    }
    return <Component {...props} responsiveInfo={responsiveInfo} />
}

export default Responsive;