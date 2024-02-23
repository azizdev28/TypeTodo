// Malumotlarni Local Storage ga saqlash funksiyasi
function saveToLocalStorage() {
    localStorage.setItem("employees", JSON.stringify(employees));
}
// Sahifani yuklaganda ishchilarni chiqarish
window.addEventListener("load", function () {
    // localStorage'dan ma'lumotlarni olish
    var savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
        employees = JSON.parse(savedEmployees);
        displayEmployees(employees);
    }
});
// Ishchini tahrirlash funksiyasi
function editEmployee(index) {
    var employee = employees[index];
    // Ishchining malumotlarini inputlarga joylash
    document.getElementById("firstName").value =
        employee.firstName;
    document.getElementById("lastName").value =
        employee.lastName;
    document.getElementById("address").value =
        employee.address;
    document.getElementById("birthDate").value =
        employee.birthDate.toISOString().split("T")[0];
    document.getElementById("position").value =
        employee.position;
    document.getElementById("typePosition").value =
        employee.typePosition;
    document.getElementById("salary").value =
        employee.salary.toString();
    document.getElementById("isMarried").checked =
        employee.isMarried;
    // Saqlash tugmasini o'zgartirish
    var saveButton = document.getElementById("saveButton");
    saveButton.style.display = "inline-block";
    // Saqlash tugmasiga yangi hodisa qo'shish
    saveButton.onclick = function () { return saveEditedEmployee(index); };
}
// Tahrir qilinayotgan malumotlarni saqlash funksiyasi
function saveEditedEmployee(index) {
    // Tahrir qilinayotgan malumotlarni inputlardan olish
    var firstName = document.getElementById("firstName")
        .value;
    var lastName = document.getElementById("lastName")
        .value;
    var address = document.getElementById("address")
        .value;
    var birthDate = new Date(document.getElementById("birthDate").value);
    var position = document.getElementById("position")
        .value;
    var typePosition = document.getElementById("typePosition").value;
    var salary = parseFloat(document.getElementById("salary").value);
    var isMarried = document.getElementById("isMarried")
        .checked;
    // Tahrir qilinayotgan malumotlarni saqlash
    employees[index] = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        birthDate: birthDate,
        position: position,
        typePosition: typePosition,
        salary: salary,
        isMarried: isMarried,
    };
    // Saqlash tugmasini yopish
    var saveButton = document.getElementById("saveButton");
    saveButton.style.display = "none";
    // Ishchilarni qaytadan chiqarish
    displayEmployees(employees);
    // Malumotlarni Local Storage ga saqlash
    saveToLocalStorage();
}
// Malumotlarni Local Storage ga saqlash funksiyasi
function saveToLocalStorage() {
    localStorage.setItem("employees", JSON.stringify(employees));
}
// Ishchilarni saqlash uchun massiv
var employees = [];
// Ishchini qo'shish funksiyasi
function addEmployee(firstName, lastName, address, birthDate, position, typePosition, salary, isMarried) {
    var newEmployee = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        birthDate: birthDate,
        position: position,
        typePosition: typePosition,
        salary: salary,
        isMarried: isMarried,
    };
    employees.push(newEmployee);
}
// Ishchilarni chiqarish funksiyasi
function displayEmployees(employees) {
    var employeeListDiv = document.querySelector("#employeeList");
    employeeListDiv.innerHTML = "";
    employees.forEach(function (employee, index) {
        var employeeDiv = document.createElement("div");
        employeeDiv.textContent = "".concat(employee.firstName, " ").concat(employee.lastName, ", ").concat(employee.position, ", ").concat(employee.salary);
        // 'Delete' tugmasini qo'shamiz
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () { return deleteEmployee(index); });
        // 'Edit' tugmasini qo'shamiz
        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () { return editEmployee(index); });
        // Ishchini chiqarish diviga 'delete' va 'edit' tugmalarni qo'shamiz
        employeeDiv.appendChild(deleteButton);
        employeeDiv.appendChild(editButton);
        employeeListDiv.appendChild(employeeDiv);
    });
}
// Ishchini o'chirish funksiyasi
function deleteEmployee(index) {
    employees.splice(index, 1);
    displayEmployees(employees);
}
// Ishchilarni qidirish va filtr qilish funksiyasi
function searchAndFilter() {
    var searchName = document.getElementById("searchName").value.toLowerCase();
    var filterType = document.getElementById("filterType").value;
    var filterMarried = document.getElementById("filterMarried").value;
    var filteredEmployees = employees.filter(function (employee) {
        return employee.firstName.toLowerCase().includes(searchName) ||
            employee.lastName.toLowerCase().includes(searchName);
    });
    if (searchName === "") {
        displayEmployees(filteredEmployees);
        return;
    }
    if (filterType) {
        filteredEmployees = filteredEmployees.filter(function (employee) { return employee.typePosition === filterType; });
    }
    if (filterMarried !== "") {
        filteredEmployees = filteredEmployees.filter(function (employee) { return employee.isMarried.toString() === filterMarried; });
    }
    displayEmployees(filteredEmployees);
}
// Maoshni tartiblash
function sortBySalary() {
    var sortedEmployees = employees.slice().sort(function (a, b) { return a.salary - b.salary; });
    displayEmployees(sortedEmployees);
}
// Ishchilarni qo'shish tugmasi
var employeeForm = document.getElementById("employeeForm");
employeeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var firstName = document.getElementById("firstName")
        .value;
    var lastName = document.getElementById("lastName")
        .value;
    var address = document.getElementById("address")
        .value;
    var birthDate = new Date(document.getElementById("birthDate").value);
    var position = document.getElementById("position")
        .value;
    var typePosition = document.getElementById("typePosition").value;
    var salary = parseFloat(document.getElementById("salary").value);
    var isMarried = document.getElementById("isMarried")
        .checked;
    addEmployee(firstName, lastName, address, birthDate, position, typePosition, salary, isMarried);
    displayEmployees(employees);
    event.target.reset();
});
// Sahifani yuklaganda ishchilarni chiqarish
window.addEventListener("load", function () {
    // localStorage'dan ma'lumotlarni olish
    var savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
        employees = JSON.parse(savedEmployees);
        displayEmployees(employees);
    }
});
