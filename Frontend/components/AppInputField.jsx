const AppInputField = ({ label, id, type = "text", value, onChange, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded-md outline-0"
        {...props}
      />
    </div>
  );
}

export default AppInputField
