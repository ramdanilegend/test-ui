import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
// hooks

// routes

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
    children: PropTypes.node,
};

export default function GuestGuard({ children }) {
    return <>{children}</>;
}
