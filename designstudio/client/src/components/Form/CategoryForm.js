import React from "react";
import {
  CForm,
  CCol,
  CFormInput,
  CFormFeedback,
  CButton,
} from "@coreui/react";

const CategoryForm = ({ handleSubmit, value, setValue, validated }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12}>
        <CFormInput
          type="text"
          value={value}
          onChange={handleChange}
          name="name"
          feedbackValid="Looks good!"
          id="validationCustom01"
          placeholder="Enter category name"
          required
          pattern="^[a-zA-Z\s]*$"
        />
        <CFormFeedback invalid>
          {value.trim() === "" ? "Name is required." : "Name should not contain numbers."}
        </CFormFeedback>
        
      </CCol>
      <CCol md={12}>
        <CButton color="primary" type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>
  );
};

export default CategoryForm;
