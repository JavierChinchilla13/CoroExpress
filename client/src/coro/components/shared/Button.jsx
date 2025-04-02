import PropTypes from "prop-types";

const Button = ({
  children,
  ligthVariant = false,
  extraStyle,
  onClickFunc,
}) => {
  let styles = ligthVariant
    ? `rounded-md bg-white border border-blue-400  
            py-2 px-4 text-center text-lg transition-all 
            shadow-sm hover:shadow-lg text-slate-600 hover:text-white 
            hover:bg-blue-900 hover:border-blue-900 focus:text-white 
            focus:bg-blue-900 focus:border-blue-900 active:border-blue-400 
            active:text-white active:bg-blue-400 disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none`
    : `rounded-md bg-blue-300 border border-blue-300  
            py-2 px-4 text-center text-lg transition-all 
            shadow-sm hover:shadow-lg text-slate-600 hover:text-white 
            hover:bg-blue-400 hover:border-blue-400 focus:text-white 
            focus:bg-blue-400 focus:border-blue-400 active:border-blue-400 
            active:text-white active:bg-blue-400 disabled:pointer-events-none 
            disabled:opacity-50 disabled:shadow-none`;

  return (
    <button className={`${styles} ${extraStyle}`} onClick={onClickFunc}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.string,
  ligthVariant: PropTypes.bool,
  extraStyle: PropTypes.string,
  onClickFunc: PropTypes.func,
};

export default Button;
