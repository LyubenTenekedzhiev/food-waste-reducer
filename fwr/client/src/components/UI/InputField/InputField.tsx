import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect, Field, FieldProps } from "formik";

interface InputFieldProps {
  name: string;
  label: string;
  rowsMax?: number;
  type?: string;
}

function InputField({ name, label, rowsMax = 1, type }: InputFieldProps) {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }: FieldProps) => (
        <TextField
          className='InputField'
          id={name}
          helperText={meta.touched ? meta.error : ""}
          error={meta.touched && Boolean(meta.error)}
          label={label}
          fullWidth
          type={type}
          multiline={rowsMax > 1}
          rowsMax={rowsMax}
          {...field}
        />
      )}
    </Field>
  );
}

export default connect<InputFieldProps>(InputField);
