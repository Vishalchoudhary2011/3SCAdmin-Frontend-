import * as React from "react";
import "./style/chooser.css";
export const Chooser = (props) => {
  return (
    <div>
      <label className="lang_label">
        {props.label}:
        <select
          style={{
            width: 250,
            marginLeft: 10,
          }}
          value={props.value}
          onChange={props.onChange}
        >
          {props.options.map((option, key) => (
            <option key={key} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
