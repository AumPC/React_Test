import React from 'react';
import StackedForm from './StackedForm';
import HorizontalForm from './HorizontalForm';
import FormElements from './FormElements';
import UploadFile from "../../../components/jsx/uploadFile";

const RegularForms = () => (
  <div>
    <div className="row">
      <div className="col-md-6">
        <UploadFile />
      </div>
    </div>
  </div>
);

export default RegularForms;