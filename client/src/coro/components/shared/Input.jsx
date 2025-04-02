import PropTypes from "prop-types";

const Input = ({ text, handleText, placeHolder, nameRef, extraStyle = "", type = "text" }) => {
  const styles = `py-2 pl-2 rounded-xl border-2 
                    border-blue-300 focus:outline-sky-500 ${extraStyle}`;

  const onChange = (event) => {
    handleText(event); // Aquí se pasa el evento al handler.
  };

  return (
    <input
      type={type} // Permite usar diferentes tipos de entrada (por ejemplo, "password").
      placeholder={placeHolder}
      className={styles}
      value={text}
      onChange={onChange}
      name={nameRef}
    />
  );
};

Input.propTypes = {
  text: PropTypes.string,
  handleText: PropTypes.func.isRequired,
  placeHolder: PropTypes.string.isRequired,
  nameRef: PropTypes.string,
  extraStyle: PropTypes.string,
  type: PropTypes.string, // Definimos "type" como un string.
};

export default Input;
