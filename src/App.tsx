import React, { ChangeEvent, useState } from "react";

type Color =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "purple"
  | "orange"
  | "black"
  | "white";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: { [key: number]: string };
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const initialParamValues = props.model.paramValues.reduce(
      (acc, paramValue) => {
        acc[paramValue.paramId] = paramValue.value;
        return acc;
      },
      {} as { [key: number]: string }
    );

    this.state = {
      paramValues: initialParamValues,
    };
  }

  public getModel(): Model {
    const paramValues = Object.entries(this.state.paramValues).map(
      ([key, value]) => ({
        paramId: Number(key),
        value,
      })
    );

    return {
      paramValues,
      colors: [], // Можно расширить функциональность, добавив цвета
    };
  }

  private handleChange =
    (paramId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        paramValues: {
          ...this.state.paramValues,
          [paramId]: event.target.value,
        },
      });
    };

  styles = {
    inputContainer: {
      marginBottom: "15px",
    },
    inputLabel: {
      fontWeight: "bold",
      display: "block",
      marginBottom: "5px",
    },
    inputField: {
      marginLeft: "15px",

      padding: "8px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      transition: "border-color 0.25s",
    },
    inputFieldFocus: {
      borderColor: "#007bff",
      outline: "none",
    },
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        <h3>Классовый компонент</h3>
        {params.map((param) => (
          <div key={param.id} style={this.styles.inputContainer}>
            <label style={this.styles.inputLabel}>
              {param.name}:
              <input
                type="text"
                value={paramValues[param.id] || ""}
                onChange={this.handleChange(param.id)}
                style={this.styles.inputField}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#007bff")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
              />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

const ParamEditorFC: React.FC<Props> = ({ params, model }) => {
  const initialParamValues = model.paramValues.reduce((acc, paramValue) => {
    acc[paramValue.paramId] = paramValue.value;
    return acc;
  }, {} as { [key: number]: string });

  const [paramValues, setParamValues] = useState<{ [key: number]: string }>(
    initialParamValues
  );

  const handleChange =
    (paramId: number) => (event: ChangeEvent<HTMLInputElement>) => {
      setParamValues({
        ...paramValues,
        [paramId]: event.target.value,
      });
    };

  const getModel = (): Model => {
    const newParamValues = Object.entries(paramValues).map(([key, value]) => ({
      paramId: Number(key),
      value,
    }));

    return {
      paramValues: newParamValues,
      colors: model.colors,
    };
  };

  // Объект стилей
  const styles = {
    paramInput: {
      padding: "8px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      marginLeft: "15px",
      marginBottom: "5px",
    },
    submitButton: {
      padding: "10px 15px",
      backgroundColor: "#9E9E9E",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "15px",
    },
  };

  return (
    <div>
      <h3>Функциональный компонент</h3>
      {params.map((param) => (
        <div key={param.id}>
          <label htmlFor={`param-${param.id}`}>{param.name}:</label>
          <input
            id={`param-${param.id}`}
            type="text"
            value={paramValues[param.id] || ""}
            onChange={handleChange(param.id)}
            style={styles.paramInput}
          />
        </div>
      ))}
      <button
        style={styles.submitButton}
        onClick={() => console.log(getModel())}
      >
        Сохранить изменения
      </button>
    </div>
  );
};

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [], // Можно дополнить цветами
};

export default function App() {
  return (
    <div style={{ marginLeft: "20px" }}>
      <h1>Редактор параметров</h1>
      <ParamEditor params={params} model={model} />
      <br />
      <h1>Редактор параметров</h1>
      <ParamEditorFC params={params} model={model} />
    </div>
  );
}
