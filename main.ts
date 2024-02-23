// Malumotlarni Local Storage ga saqlash funksiyasi
function saveToLocalStorage(): void {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// Sahifani yuklaganda ishchilarni chiqarish
window.addEventListener("load", () => {
  // localStorage'dan ma'lumotlarni olish
  const savedEmployees = localStorage.getItem("employees");
  if (savedEmployees) {
    employees = JSON.parse(savedEmployees);
    displayEmployees(employees);
  }
});

// Ishchini tahrirlash funksiyasi
function editEmployee(index: number): void {
  const employee = employees[index];

  // Ishchining malumotlarini inputlarga joylash
  (document.getElementById("firstName") as HTMLInputElement).value =
    employee.firstName;
  (document.getElementById("lastName") as HTMLInputElement).value =
    employee.lastName;
  (document.getElementById("address") as HTMLInputElement).value =
    employee.address;
  (document.getElementById("birthDate") as HTMLInputElement).value =
    employee.birthDate.toISOString().split("T")[0];
  (document.getElementById("position") as HTMLSelectElement).value =
    employee.position;
  (document.getElementById("typePosition") as HTMLSelectElement).value =
    employee.typePosition;
  (document.getElementById("salary") as HTMLInputElement).value =
    employee.salary.toString();
  (document.getElementById("isMarried") as HTMLInputElement).checked =
    employee.isMarried;

  // Saqlash tugmasini o'zgartirish
  const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
  saveButton.style.display = "inline-block";
  // Saqlash tugmasiga yangi hodisa qo'shish
  saveButton.onclick = () => saveEditedEmployee(index);
}

// Tahrir qilinayotgan malumotlarni saqlash funksiyasi
function saveEditedEmployee(index: number): void {
  // Tahrir qilinayotgan malumotlarni inputlardan olish
  const firstName = (document.getElementById("firstName") as HTMLInputElement)
    .value;
  const lastName = (document.getElementById("lastName") as HTMLInputElement)
    .value;
  const address = (document.getElementById("address") as HTMLInputElement)
    .value;
  const birthDate = new Date(
    (document.getElementById("birthDate") as HTMLInputElement).value
  );
  const position = (document.getElementById("position") as HTMLSelectElement)
    .value as "ReactJs Developer" | "NodeJs Developer" | "Go Developer";
  const typePosition = (
    document.getElementById("typePosition") as HTMLSelectElement
  ).value as "junior" | "middle" | "senior";
  const salary = parseFloat(
    (document.getElementById("salary") as HTMLInputElement).value
  );
  const isMarried = (document.getElementById("isMarried") as HTMLInputElement)
    .checked;

  // Tahrir qilinayotgan malumotlarni saqlash
  employees[index] = {
    firstName,
    lastName,
    address,
    birthDate,
    position,
    typePosition,
    salary,
    isMarried,
  };

  // Saqlash tugmasini yopish
  const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
  saveButton.style.display = "none";

  // Ishchilarni qaytadan chiqarish
  displayEmployees(employees);

  // Malumotlarni Local Storage ga saqlash
  saveToLocalStorage();
}

// Malumotlarni Local Storage ga saqlash funksiyasi
function saveToLocalStorage(): void {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// Ishchilar uchun interfeys
interface Employee {
  firstName: string;
  lastName: string;
  address: string;
  birthDate: Date;
  position: "ReactJs Developer" | "NodeJs Developer" | "Go Developer";
  typePosition: "junior" | "middle" | "senior";
  salary: number;
  isMarried: boolean;
}

// Ishchilarni saqlash uchun massiv
let employees: Employee[] = [];

// Ishchini qo'shish funksiyasi
function addEmployee(
  firstName: string,
  lastName: string,
  address: string,
  birthDate: Date,
  position: "ReactJs Developer" | "NodeJs Developer" | "Go Developer",
  typePosition: "junior" | "middle" | "senior",
  salary: number,
  isMarried: boolean
): void {
  const newEmployee: Employee = {
    firstName,
    lastName,
    address,
    birthDate,
    position,
    typePosition,
    salary,
    isMarried,
  };
  employees.push(newEmployee);
}

// Ishchilarni chiqarish funksiyasi
function displayEmployees(employees: Employee[]): void {
  const employeeListDiv = document.querySelector("#employeeList");
  employeeListDiv.innerHTML = "";
  employees.forEach((employee, index) => {
    const employeeDiv = document.createElement("div");
    employeeDiv.textContent = `${employee.firstName} ${employee.lastName}, ${employee.position}, ${employee.salary}`;

    // 'Delete' tugmasini qo'shamiz
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteEmployee(index));

    // 'Edit' tugmasini qo'shamiz
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editEmployee(index));

    // Ishchini chiqarish diviga 'delete' va 'edit' tugmalarni qo'shamiz
    employeeDiv.appendChild(deleteButton);
    employeeDiv.appendChild(editButton);

    employeeListDiv.appendChild(employeeDiv);
  });
}

// Ishchini o'chirish funksiyasi
function deleteEmployee(index: number): void {
  employees.splice(index, 1);
  displayEmployees(employees);
}

// Ishchilarni qidirish va filtr qilish funksiyasi
function searchAndFilter(): void {
  const searchName = (
    document.getElementById("searchName") as HTMLInputElement
  ).value.toLowerCase();
  const filterType = (
    document.getElementById("filterType") as HTMLSelectElement
  ).value;
  const filterMarried = (
    document.getElementById("filterMarried") as HTMLSelectElement
  ).value;

  let filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchName) ||
      employee.lastName.toLowerCase().includes(searchName)
  );

  if (searchName === "") {
    displayEmployees(filteredEmployees);
    return;
  }

  if (filterType) {
    filteredEmployees = filteredEmployees.filter(
      (employee) => employee.typePosition === filterType
    );
  }

  if (filterMarried !== "") {
    filteredEmployees = filteredEmployees.filter(
      (employee) => employee.isMarried.toString() === filterMarried
    );
  }

  displayEmployees(filteredEmployees);
}

// Maoshni tartiblash
function sortBySalary(): void {
  const sortedEmployees = employees.slice().sort((a, b) => a.salary - b.salary);
  displayEmployees(sortedEmployees);
}

// Ishchilarni qo'shish tugmasi
const employeeForm = document.getElementById("employeeForm");
employeeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const firstName = (document.getElementById("firstName") as HTMLInputElement)
    .value;
  const lastName = (document.getElementById("lastName") as HTMLInputElement)
    .value;
  const address = (document.getElementById("address") as HTMLInputElement)
    .value;
  const birthDate = new Date(
    (document.getElementById("birthDate") as HTMLInputElement).value
  );
  const position = (document.getElementById("position") as HTMLSelectElement)
    .value as "ReactJs Developer" | "NodeJs Developer" | "Go Developer";
  const typePosition = (
    document.getElementById("typePosition") as HTMLSelectElement
  ).value as "junior" | "middle" | "senior";
  const salary = parseFloat(
    (document.getElementById("salary") as HTMLInputElement).value
  );
  const isMarried = (document.getElementById("isMarried") as HTMLInputElement)
    .checked;

  addEmployee(
    firstName,
    lastName,
    address,
    birthDate,
    position,
    typePosition,
    salary,
    isMarried
  );
  displayEmployees(employees);
  (event.target as HTMLFormElement).reset();
});

// Sahifani yuklaganda ishchilarni chiqarish
window.addEventListener("load", () => {
  // localStorage'dan ma'lumotlarni olish
  const savedEmployees = localStorage.getItem("employees");
  if (savedEmployees) {
    employees = JSON.parse(savedEmployees);
    displayEmployees(employees);
  }
});
