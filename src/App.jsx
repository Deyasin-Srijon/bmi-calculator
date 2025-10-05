import { useState } from "react";

function App() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  // Validation of Height & Weight to prevent unrealistic data
  const isValidInput = (height, weight) => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (age > 19) return h >= 120 && h <= 272 && w >= 30 && w <= 600;
    else return h >= 100 && h <= 200 && w >= 15 && w <= 120;
  };

  // Based on BMI feedback will be given to user
  const getAdultBMIFeedBack = (bmi) => {
    if (bmi < 16) return "You are Severely Underweight!";
    if (bmi < 18.5) return "You are Underweight.";
    if (bmi < 25) return "You are in Healthy weight.";
    if (bmi < 30) return "You are Overweight.";
    if (bmi < 35) return "You are Moderately Obese.";
    if (bmi < 40) return "You are Severely Obese!";
    return "You are Morbidly Obese!";
  };
  const getChildBMIFeedBack = (bmi) => {
    if (bmi < 14) return "You are Underweight!";
    if (bmi < 18) return "You are in Healthy weight.";
    if (bmi < 22) return "You are Overweight!";
    return "You are Obese!";
  };

  // For Calculate BMI
  const bmiCalculator = (e) => {
    let feed;
    e.preventDefault();

    if (!isValidInput(height, weight)) {
      setFeedback(
        age > 19
          ? "⚠ Please enter a realistic height (120–272 cm) and weight (30–600 kg)."
          : "⚠ Please enter a realistic height (100–200 cm) and weight (15-120 kg)."
      );
      setBMI(null);
      return;
    }

    const heightInMeter = parseFloat(height) / 100;
    const calculatedBMI = parseFloat((weight / heightInMeter ** 2).toFixed(2));
    setBMI(calculatedBMI);
    if (age > 19)
      feed = getAdultBMIFeedBack(calculatedBMI);
    else 
      feed = getChildBMIFeedBack(calculatedBMI);
    setFeedback(feed);
    feed.includes("Healthy")
      ? setMessage("")
      : age > 19
      ? setMessage(" BMI in range of 18.5-24.9 is Normal")
      : setMessage(" BMI in range of 14-18 is Normal");
  };

  // For Reset The Values
  const reload = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setBMI(null);
    setMessage("");
    setFeedback("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          BMI Calculator
        </h2>

        <form onSubmit={bmiCalculator} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>
          {/* Weight Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              placeholder="Enter Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Height Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              placeholder="Enter Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between space-x-4">
            <button
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              type="submit"
            >
              Submit
            </button>
            <button
              type="button"
              className="flex-1 border border-purple-500 text-purple-500 hover:bg-purple-50 font-semibold py-2 px-4 rounded-lg transition duration-300"
              onClick={reload}
            >
              Reload
            </button>
          </div>
        </form>

        {/* Results */}
        <div className="mt-6 text-center">
          {bmi !== null && (
            <h3 className="text-lg font-bold text-gray-700">
              Your BMI is: <span className="text-purple-600">{bmi}</span>
            </h3>
          )}
          <p
            className={`mt-2 text-sm font-medium ${
              feedback.includes("⚠") || feedback.includes("!")
                ? "text-red-500"
                : "text-gray-600"
            }`}
          >
            {feedback}{message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
