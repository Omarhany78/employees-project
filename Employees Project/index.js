class Employee {
  static employees = localStorage.getItem("employees")
    ? JSON.parse(localStorage.getItem("employees"))
    : [];
  static employeesNum = 0;

  constructor(firstName, lastName, age, exYears, job, workHours) {
    Employee.employeesNum++;
    this.score = 0;
    this.id = Employee.employeesNum;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.userName = `${this.firstName}${this.lastName}${this.id}`;
    this.email = `${this.userName}@company.com`;
    this.job = job;
    this.exYears = exYears;

    this.level = this.determineLevel(exYears);
    this.salary = this.determineSalary(this.level);
    this.salary += this.salaryOnJob(this.job);
    this.workHours = workHours;
    this.workType = this.determineWorkType(workHours);

    this.jobPass();
  }

  jobPass() {
    if (this.job === "full-stack" || this.job === "cyber-security") {
      this.score += 1.5;
    } else if (this.job === "data-scientist" || this.job === "back-end") {
      this.score += 1;
    } else {
      this.score += 0.5;
    }
    if (this.age <= 18) {
      this.score -= 3;
    } else if (this.age > 18 && this.age <= 25) {
      this.score += 1;
    } else if (this.age > 25 && this.age <= 30) {
      this.score += 0.5;
    }
    if (this.level != "Junior") {
      this.score += 1;
    }

    if (this.score >= 2) {
      Employee.employees.push(this);
      window.localStorage.setItem(
        "employees",
        JSON.stringify(Employee.employees)
      );
    }
  }

  salaryOnJob(job) {
    switch (job) {
      case "front-end":
        return 0;
      case "back-end":
        return 500;
      case "full-stack":
        return 1000;
      case "mobile":
        return 500;
      case "cyber-security":
        return 3000;
      case "data-scientist":
        return 1000;
      default:
        return 0;
    }
  }

  determineLevel(exYears) {
    if (exYears < 2) {
      return "Junior";
    } else if (exYears >= 2 && exYears < 5) {
      return "MidLevel";
    } else if (exYears >= 5 && exYears < 10) {
      return "Senior";
    } else {
      return "Expert";
    }
  }

  determineSalary(level) {
    switch (level) {
      case "Junior":
        return 4000;
      case "MidLevel":
        return 6000;
      case "Senior":
        return 8000;
      case "Expert":
        return 10000;
      default:
        return 0;
    }
  }

  determineWorkType(workHours) {
    if (workHours === 4) {
      this.salary /= 2;
      return "Half-Time";
    } else if (workHours === 8) {
      return "Full-Time";
    } else {
      return "Undefined";
    }
  }

  salaryIncrease() {
    this.salary += 1000;
  }

  salaryDecrease() {
    this.salary -= 1000;
  }

  static checkThenRemove(username) {
    let array = Employee.employees;
    for (let i = 0; i < array.length; i++) {
      if (array[i].userName === username) {
        Employee.employees.splice(i, 1);
        window.localStorage.setItem(
          "employees",
          JSON.stringify(Employee.employees)
        );
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById("form");
  if (formElement) {
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();
      let firstName = document.getElementById("firstName").value;
      let lastName = document.getElementById("lastName").value;
      let age = Number(document.getElementById("age").value);
      let job = document.getElementById("job").value;
      let exYears = Number(document.getElementById("exYears").value);
      let workHours = Number(document.getElementById("workHours").value);

      console.log(
        "We will send you an email within 24 hours to tell you whether you are accepted or not"
      );

      let counter = setTimeout(createEmployee, 5000);

      function createEmployee() {
        let employeesLength = Employee.employees.length;
        let employee = new Employee(
          firstName,
          lastName,
          age,
          exYears,
          job,
          workHours
        );
        let employeesLengthafter = Employee.employees.length;
        if (employeesLength !== employeesLengthafter) {
          console.log(`Hi, ${employee.firstName} ${employee.lastName}`);
          console.log(`I am very happy to tell you that you are accepted!`);
          console.log(`You will start work tomorrow`);
          console.log(`Your Salary will be ${employee.salary}`);
          console.log(
            `Your username is ${employee.userName} and your email is ${employee.email}`
          );
        } else {
          console.log("Sorry, You are rejected");
        }
        console.log(Employee.employees);
      }
    });
  }

  console.log(Employee.employees);
});
