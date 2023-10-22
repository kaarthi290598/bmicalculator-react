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
    <div className="flex flex-col h-screen">
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
  const [inches, setInches] = useState(0);
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
    setInches(0);
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
    <div className="lg:h-1/2 w-[full] flex flex-col md:flex-row justify-center">
      <div className="flex items-center justify-center p-10">
        <h1 className="hidden md:block md:text-6xl text-2xl">
          BMI <br /> CALCULATOR
        </h1>
        <h1 className="block md:hidden text-4xl">BMI CALCULATOR</h1>
      </div>
      <div className=" p-6 flex flex-col gap-8 justify-center items-center ">
        <div className="flex gap-4">
          <button className="button" onClick={handleusunit}>
            US UNIT
          </button>
          <button className="button" onClick={handlemetricunit}>
            METRIC UNIT
          </button>
        </div>
        <form
          className="grid md:grid-cols-[40%_60%] md:gap-6 gap-3 w-full"
          onSubmit={handleSubmit}
        >
          <label>Age</label>
          <input
            placeholder="Age"
            type="text"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
          <label>Height</label>
          {unit ? (
            <div className="flex gap-3">
              <input
                className="w-1/2"
                placeholder="Feet"
                type="text"
                value={feet}
                onChange={(e) => setFeet(Number(e.target.value))}
              />
              <input
                className="w-1/2"
                placeholder="Inches"
                type="text"
                value={inches}
                onChange={(e) => setInches(Number(e.target.value))}
              />
            </div>
          ) : (
            <div className="w-full">
              <input
                className="w-full"
                placeholder=" in cm"
                type="text"
                value={centi}
                onChange={(e) => setcenti(Number(e.target.value))}
              />
            </div>
          )}

          <label>Weight</label>
          <input
            placeholder="Weight"
            type="number"
            value={weight}
            step="any"
            onChange={(e) => setWeight(parseFloat(e.target.value))}
          />
          <button className="button" type="submit">
            Calculate
          </button>
        </form>
      </div>
    </div>
  );
}

function Result({ bmi }) {
  return (
    <div className="lg:h-1/2 bg-black flex flex-col text-white gap-6 p-16">
      <h2 className="text-3xl">
        {bmi
          ? `Your BMI is ${bmi.toFixed(2)} kg/m2`
          : "Enter details to calculate the BMI - Results will be displayed here"}
      </h2>
      <p className="text-base">
        The Body Mass Index (BMI) Calculator can be used to calculate BMI value
        and corresponding weight status while taking age into consideration. Use
        the "Metric Units" tab for the International System of Units or the
        "Other Units" tab to convert units into either US or metric units.
      </p>
      <ul className="text-base">
        <li>Healthy BMI range: 18.5 kg/m2 - 25 kg/m2</li>
        <li>Healthy weight for the height: 128.9 lbs - 174.2 lbs</li>
        <li>BMI Prime: 0.92</li>
        <li>Ponderal Index: 12.9 kg/m3</li>
      </ul>
    </div>
  );
}
