import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { IEmpleado } from "./types";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const Empleado: React.FC<{ id_empelado: string }> = ({ id_empelado }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [employee, setEmployee] = useState<IEmpleado>();
  const [country, setCountry] = useState(employee?.country_name);
  const [state, setState] = useState(employee?.state_name);
  const [city, setCity] = useState(employee?.city_name);
  const [tempCountries, setTempCountries] = useState<{country_name: any; id_country: number}[]>();
  const [countries, setCountries] = useState<{ label: any; value: number; }[]>()
  const [states, setStates] = useState<{ label: any; value: number; }[]>();
  const [cities, setCities] = useState<{ label: any; value: number; }[]>();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("Actualizando...");
    setConfirmLoading(true);

    const optionsPutEmployee = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: `{
        "id_empelado":${Number(id_empelado)},
        "id_country":${country},
        "id_state": ${state},
        "id_city": ${city}
      }`,
    };

    fetch("http://localhost:3000/update", optionsPutEmployee)
    .then((response) => response.json())
    //.then((response) => console.log(response))
    //.catch((err) => console.error(err));

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1200);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const handleChangeCountry = (e:any) => {
    setCountry(e)    
  };
  const handleChangeState = (e:any) => {
    setState(e)    
  };
  const handleChangeCity = (e:any) => {
    setCity(e)    
  };

  useEffect(() => {
    const optionsEmployee = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{"id_empelado":${Number(id_empelado)}}`,
    };

    fetch("http://localhost:3000/employee_data", optionsEmployee)
    .then((response) => response.json())
    .then((response) => setEmployee(response.employee_data))
    .catch((err) => console.error(err));

    const optionsCountry = { method: "POST" };

    fetch("http://localhost:3000/country", optionsCountry)
      .then((response) => response.json())
      .then((response) => setTempCountries(response.countries))
      .catch((err) => console.error(err));

      const countriesToUpload = tempCountries?.map(country => ({label: country.country_name, value: country.id_country}))

    setCountries(countriesToUpload);
  }, [id_empelado]);

  useEffect(() => {
    const optionsState = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{"id_country":${country}}`,
    };

    fetch("http://localhost:3000/state", optionsState)
    .then((response) => response.json())
    .then((response) => setStates(response.states?.map((state: { state_name: any; id_state: any; }) => ({label: state.state_name, value: state.id_state}))))
    .catch((err) => console.error(err));

  }, [country])

  useEffect(() => {
    const optionsCity = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{"id_state":${state}}`,
    };

    fetch("http://localhost:3000/city", optionsCity)
    .then((response) => response.json())
    .then((response) => setCities(response.cities?.map((city: { city_name: any; id_city: any; }) => ({label: city.city_name, value: city.id_city}))))
    .catch((err) => console.error(err));

  }, [state])
  
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Buscar
      </Button>
      <Modal
        title="EMPLEADO"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {employee == undefined ? (
          <Spin tip="Loading..." size="large">
            <div className="content" />
          </Spin>
        ) : (
          <>
            <div className="ant-form-item css-dev-only-do-not-override-1fviqcj">
              <div className="ant-row ant-form-item-row css-dev-only-do-not-override-1fviqcj">
                <div className="ant-col ant-form-item-label css-dev-only-do-not-override-1fviqcj">
                  Id Empleado:
                </div>
                <div className="ant-col ant-form-item-control css-dev-only-do-not-override-1fviqcj">
                  123
                </div>
              </div>
            </div>
            <div className="ant-form-item css-dev-only-do-not-override-1fviqcj">
              <div className="ant-row ant-form-item-row css-dev-only-do-not-override-1fviqcj">
                <div className="ant-col ant-form-item-label css-dev-only-do-not-override-1fviqcj">
                  First Name:
                </div>
                <div className="ant-col ant-form-item-control css-dev-only-do-not-override-1fviqcj">
                  {employee.first_name}
                </div>
              </div>
            </div>
            <div className="ant-form-item css-dev-only-do-not-override-1fviqcj">
              <div className="ant-row ant-form-item-row css-dev-only-do-not-override-1fviqcj">
                <div className="ant-col ant-form-item-label css-dev-only-do-not-override-1fviqcj">
                  Last Name:
                </div>
                <div className="ant-col ant-form-item-control css-dev-only-do-not-override-1fviqcj">
                  {employee.last_name}
                </div>
              </div>
            </div>
            <div className="ant-form-item css-dev-only-do-not-override-1fviqcj">
              <div className="ant-row ant-form-item-row css-dev-only-do-not-override-1fviqcj">
                <div className="ant-col ant-form-item-label css-dev-only-do-not-override-1fviqcj">
                  Job Title:
                </div>
                <div className="ant-col ant-form-item-control css-dev-only-do-not-override-1fviqcj">
                  {employee.job_title}
                </div>
              </div>
            </div>
            <Form
              form={form}
              initialValues={{ layout: formLayout }}
              onValuesChange={onFormLayoutChange}
              style={{ maxWidth: 600 }}
            >
              <Form.Item label="Country">
                <Select
                  defaultValue={employee.country_name}
                  style={{ width: 200 }}
                  onChange={e => handleChangeCountry(e)}
                  options={countries}
                />
              </Form.Item>
              <Form.Item label="State">
                <Select
                  defaultValue={employee.state_name}
                  style={{ width: 200 }}
                  onChange={e => handleChangeState(e)}
                  options={states}
                />
              </Form.Item>
              <Form.Item label="City">
                <Select
                  defaultValue={employee.city_name}
                  style={{ width: 200 }}
                  onChange={e => handleChangeCity(e)}
                  options={cities}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default Empleado;
