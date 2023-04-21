import { Input } from "antd";
import React, { useState } from "react";
import Empleado from "./Empleado";

interface Props {}

const App = (props: Props) => {
    const [id, setId] = useState("")
  return (
    <>
      <h1> Location Modifier App </h1>

      <div>
        <Input value={id}
        onChange={ e => setId(e.target.value)}
        />
        <Empleado id_empelado={id}/>
      </div>
    </>
  );
};

export default App;
