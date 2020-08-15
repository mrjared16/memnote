import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVisibleSearchForm } from "../../noteSlice";
import Modal from "antd/lib/modal/Modal";
import { Formik, Form, FastField } from "formik";
import InputField from "../../../../components/InputField";
import "./SearchForm.scss";
import { SearchOutlined } from "@ant-design/icons";
import Button from '../Button';

function SearchForm(props) {
  const visible = useSelector((state) => state.note.visibleSearchForm);
  const dispatch = useDispatch();

  const initialValues = {
    keyword: "",
  };

  const handleCancel = () => {
    dispatch(setVisibleSearchForm(false));
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <Modal
      closable={false}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formikProps) => {
          return (
            <Form className='search-form'>
              <FastField
                component={InputField}
                name="keyword"
                placeholder="Search"
              />
              <Button
                label="Search"
                className="search-btn-submit"
                type="submit"
              />
              
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default SearchForm;
