    function getGrades(inputSelector) {
      const inputElement = document.querySelector(inputSelector);
      if (!inputElement) {
        console.error(`No input element found for selector: ${inputSelector}`);
        return [];
      }
      
      const grades = inputElement.value;
      if (!grades) return [];

      const gradesArray = grades.split(",");
      const cleanGrades = gradesArray
        .map(grade => grade.trim().toUpperCase())
        .filter(grade => grade.length > 0);

      console.log(cleanGrades);
      return cleanGrades;
    }

    function lookupGrade(grade) {
      switch (grade) {
        case "A": return 4;
        case "B": return 3;
        case "C": return 2;
        case "D": return 1;
        case "F": return 0;
        default: return null;
      }
    }

    function calculateGpa(grades) {
      const gradePoints = grades
        .map(grade => lookupGrade(grade))
        .filter(points => points !== null);

      if (gradePoints.length === 0) {
        return "N/A";
      }

      const total = gradePoints.reduce((sum, val) => sum + val, 0);
      const gpa = total / gradePoints.length;
      return gpa.toFixed(2);
    }

    function outputGpa(gpa, selector) {
      const outputElement = document.querySelector(selector);
      if (!outputElement) {
        console.error(`No output element found for selector: ${selector}`);
        return;
      }
      outputElement.innerText = `GPA: ${gpa}`;
    }

    function clickHandler() {
      const grades = getGrades("#grades");
      const gpa = calculateGpa(grades);
      outputGpa(gpa, "#output");
    }

    document.addEventListener("DOMContentLoaded", () => {
      const btn = document.querySelector("#submitButton");
      if (btn) {
        btn.addEventListener("click", clickHandler);
      } else {
        console.error("Submit button not found in DOM!");
      }
    });