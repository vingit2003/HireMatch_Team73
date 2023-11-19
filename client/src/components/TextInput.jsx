import React from "react";

const TextInput = React.forwardRef(
  ({ type, placeholder, styles, label, register, name, error }, ref) => {
    return (
      <div className='flex flex-col mt-2'>
        <p className='text-gray-600 text-sm mb-1 '>{label}</p>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          className={`rounded border border-[#01332f] focus:outline-none text-base px-4 py-2 ${styles}`}
          {...register}
          aria-invalid={error ? "true" : "false"}
        />
        {error && <span className='text-xs text-red-500 mt-0.5 '>{error}</span>}
      </div>
    );
  }
);

export default TextInput;
