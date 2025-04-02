import logo from "../../../assets/logo.png";
import PropTypes from "prop-types";

const Logo = ({ extraStyle = "" }) => {
  return <img src={logo} alt="logo.png" className={`${extraStyle}`} />;
};

Logo.propTypes = {
  extraStyle: PropTypes.string,
};

export default Logo;
