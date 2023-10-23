import { useState } from "react";
import "./App.css";

function App() {
  // const [age, setAge] = useState("");
  // const [feet, setFeet] = useState("");
  // const [inches, setInches] = useState("");
  // const [weight, setWeight] = useState("");

  const [bmi, setbmi] = useState("");

  function calculateBMIUS(age, weight, feet, inches, unit) {
    // Calculate BMI using imperial units (feet, inches, and pounds)
    if (!age || !feet || !weight) return;
    const heightInInches = feet * 12 + inches;
    const bmiValue = (weight / (heightInInches * heightInInches)) * 703;
    setbmi(bmiValue);
  }

  function calculateBMImetric(age, weight, centi) {
    if (!age || !centi || !weight) return;
    const heightInInches = centi / 2.54;

    const weightInPounds = weight * 2.20462;

    const bmiValue = (weightInPounds / (heightInInches * heightInInches)) * 703;
    setbmi(bmiValue);
  }

  return (
    <div className="h-full sm:h-screen ">
      <Formbmi
        bmi={bmi}
        setbmi={calculateBMIUS}
        setbmimetric={calculateBMImetric}
      />
      <Result bmi={bmi} />
    </div>
  );
}

export default App;

function Formbmi({ bmi, setbmi, setbmimetric }) {
  const [age, setAge] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");

  const [centi, setcenti] = useState("");

  const [unit, setunit] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unit) {
      if (!age || !feet || !weight) return;
      setbmi(age, weight, feet, inches);
      console.log(bmi);
    } else {
      if (!age || !centi || !weight) return;
      setbmimetric(age, weight, centi);
    }
  };

  function handleusunit() {
    setunit(() => true);
    setAge("");
    setInches("");
    setWeight("");
    setFeet("");
  }

  function handlemetricunit() {
    setunit(() => false);
    setAge("");
    setcenti("");
    setWeight("");
  }

  return (
    <div className=" h-[50%] flex flex-col md:flex-row justify-center p-5">
      <div className=" md:p-5 lg:p-10 p-5 text-center md:text-start md:flex md:items-center">
        <h1 className="hidden md:block md:text-5xl lg:text-6xl  text-2xl">
          BMI <br /> CALCULATOR
        </h1>
        <h1 className="block md:hidden text-3xl">BMI CALCULATOR</h1>
      </div>
      <div className=" p-6 flex flex-col gap-8 justify-center ">
        <div className="flex gap-4 justify-center items-center">
          <button className="button" onClick={handleusunit}>
            US UNIT
          </button>
          <button className="button" onClick={handlemetricunit}>
            METRIC UNIT
          </button>
        </div>
        <form
          className=" flex flex-col sm:grid sm:grid-cols-[auto_auto] md:grid-cols-[auto_auto] lg:grid-cols-[auto_20rem]  md:gap-6 gap-3  "
          onSubmit={handleSubmit}
        >
          <label>Age</label>
          <input
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => {
              const value = e.target.value;
              // Check if the input is empty or non-numeric
              if (value === "" || isNaN(value) || value < 0) {
                // If it's empty or non-numeric, set the state to an empty string
                setAge("");
              } else {
                // If it's a valid number, parse it to a number and set the state
                setAge(Number(value));
              }
            }}
          />
          <label>Height</label>
          {unit ? (
            <div className="flex gap-3">
              <input
                className="w-1/2"
                placeholder="Feet"
                type="number"
                value={feet}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || isNaN(value) || value < 0) {
                    setFeet("");
                  } else {
                    setFeet(Number(value));
                  }
                }}
              />
              <input
                className="w-1/2"
                placeholder="Inches"
                type="number"
                value={inches}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || isNaN(value) || value < 0) {
                    setInches("");
                  } else {
                    setInches(Number(value));
                  }
                }}
              />
            </div>
          ) : (
            <input
              className=""
              placeholder=" in cm"
              type="number"
              value={centi}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || isNaN(value) || value < 0) {
                  setcenti("");
                } else {
                  setcenti(Number(value));
                }
              }}
            />
          )}

          <label>Weight</label>
          <input
            placeholder={`${unit ? "weight in pounds" : "weight in Kilograms"}`}
            type="number"
            value={weight}
            step="any"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || isNaN(value) || value < 0) {
                setWeight("");
              } else {
                setWeight(parseFloat(value));
              }
            }}
          />
          <button className="button col-start-2 col-end-3" type="submit">
            Calculate
          </button>
        </form>
      </div>
    </div>
  );
}

function Result({ bmi }) {
  return (
    <div className="h-[50%] bg-black flex flex-col justify-center text-white gap-4 md:gap-9  p-10">
      <h2 className="text-2xl md:text-3xl">
        {bmi
          ? `Your BMI is ${bmi.toFixed(2)} kg/m2`
          : "Enter details to calculate the BMI - Results will be displayed here"}
      </h2>
      <p className="md:text-base">
        The Body Mass Index (BMI) Calculator can be used to calculate BMI value
        and corresponding weight status while taking age into consideration. Use
        the "Metric Units" tab for the International System of Units or the "US
        Units" tab for US (pound based) unit.
      </p>
      <h3 className="text-xl md:text-2xl">BMI Range</h3>
      <ul className="text-sm md:text-base">
        <li>➡️ Underweight: BMI less than 18.5</li>
        <li>➡️ Normal weight: BMI from 18.5 to 24.9</li>
        <li>➡️ Overweight: BMI from 25 to 29.9</li>
        <li>➡️ Obesity: BMI 30 or higher</li>
      </ul>
    </div>
  );
}
