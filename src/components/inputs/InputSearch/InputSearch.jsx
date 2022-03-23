import React from "react";
import "./InputSearch.scss";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search-24px.svg";

const InputSearch = ({ variant, label, value, onSearchChange }) => {
  const searchJSX = (
    <>
      <div className="input__search-wrapper">
        <label htmlFor={`${label}`} className="input__label h3">
          {label}
          <span className="input__icon-search">{<SearchIcon />}</span>
          <input
            name={label}
            className={`input__field input__search p-medium input__${variant}`}
            placeholder="Search..."
            type="text"
            onChange={onSearchChange}
          />
        </label>
      </div>
    </>
  );

  return variant === "search" && searchJSX;
};

export default InputSearch;
