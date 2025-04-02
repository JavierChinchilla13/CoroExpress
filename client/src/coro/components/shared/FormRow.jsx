import PropTypes from "prop-types";

const FormRow = ({ type, name, value, handleChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-3xl"
        placeholder="Password"
      />
    </div>
  );
};

// Definir los PropTypes
FormRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string, // Opcional, si no se pasa, usará el valor por defecto
};

export default FormRow;
