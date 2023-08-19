const students = [
    {
      ID: 1,
      name: 'Alice',
      age: 21,
      grade: 'A',
      degree: 'Btech',
      email: 'alice@example.com'
    },
    {
      ID: 2,
      name: 'Bob',
      age: 22,
      grade: 'B',
      degree: 'MBA',
      email: 'bob@example.com'
    },
    {
      ID: 3,
      name: 'Charlie',
      age: 20,
      grade: 'C',
      degree:'Arts',
      email: 'charlie@example.com'
    }
  ];
  
  const studentList = document.getElementById('studentList');
  const studentForm = document.getElementById('studentData');
  const searchInput = document.getElementById('searchInput');
  
  function renderStudentTable() {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    
    for (const property in students[0]) {
      const th = document.createElement('th');
      th.textContent = property;
      headerRow.appendChild(th);
    }
    
    table.appendChild(headerRow);
    
    students.forEach(student => {
      const row = document.createElement('tr');
      
      for (const property in student) {
        const td = document.createElement('td');
        td.textContent = student[property];
        row.appendChild(td);
      }
      
      const editCell = document.createElement('td');
      const editIcon = document.createElement('span');
      editIcon.className = 'edit-icon';
      editIcon.textContent = 'Edit';
      editIcon.addEventListener('click', () => editStudent(student));
      editCell.appendChild(editIcon);
      row.appendChild(editCell);
      
      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteStudent(student));
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);
      
      table.appendChild(row);
    });
    
    studentList.innerHTML = '';
    studentList.appendChild(table);
  }
  
  function editStudent(student) {
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('grade').value = student.grade;
    document.getElementById('degree').value = student.degree;
    document.getElementById('email').value = student.email;
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Edit Student';
    submitBtn.removeEventListener('click', addStudent);
    submitBtn.addEventListener('click', () => updateStudent(student));
  }
  
  function updateStudent(student) {
    student.name = document.getElementById('name').value;
    student.age = parseInt(document.getElementById('age').value);
    student.grade = document.getElementById('grade').value;
    student.degree = document.getElementById('degree').value;
    student.email = document.getElementById('email').value;
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Add Student';
    submitBtn.removeEventListener('click', updateStudent);
    submitBtn.addEventListener('click', addStudent);
    
    renderStudentTable();
    clearForm();
  }
  
  function deleteStudent(student) {
    const studentIndex = students.indexOf(student);
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      renderStudentTable();
    }
  }
  
  function addStudent(event) {
    event.preventDefault();
    
    const newStudent = {
      ID: students.length + 1,
      name: document.getElementById('name').value,
      age: parseInt(document.getElementById('age').value),
      grade: document.getElementById('grade').value,
      degree: document.getElementById('degree').value,
      email: document.getElementById('email').value
    };
    
    students.push(newStudent);
    renderStudentTable();
    clearForm();
  }
  
  function searchStudents() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student => 
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.degree.toLowerCase().includes(searchTerm)
    );
    
    renderStudentTable(filteredStudents);
  }
  
  function clearForm() {
    studentForm.reset();
  }
  
  document.getElementById('submitBtn').addEventListener('click', addStudent);
  searchInput.addEventListener('input', searchStudents);
  
  renderStudentTable();
  