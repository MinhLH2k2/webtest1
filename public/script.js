document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refreshBtn');
    const viewEmployeeBtn = document.getElementById('viewEmployeeBtn');
    const empTable = document.getElementById('empTable');
    const employeeDetails = document.getElementById('employeeDetails');
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');
    let selectedEmployee = null;
    var emp_counter = 0;

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/employees');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const displayEmployees = (employees) => {
        // Remove current data from table
        for (let i = emp_counter; i > 0; i--) {
            document.getElementById('empTable').deleteRow(i);
        }
        // Reset employee counter
        emp_counter = 0;
        // Add new data to table
        employees.forEach(employee => {
            emp_counter += 1;
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            td1.textContent = employee.ID;
            td2.textContent = employee.LAST_NAME + ' ' + employee.NAME;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.addEventListener('click', () => {
                // Remove highlight from previous employee
                document.querySelectorAll('#empTable tr').forEach(tr => tr.classList.remove('highlighted'));
                // Highlight new employee
                tr.classList.add('highlighted');
                selectedEmployee = employee;
            })
            empTable.appendChild(tr);
        });
            
    };

    const refreshEmployees = async () => {
        try {
            const response = await fetch('/employees');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayEmployees(data);
            alert("Refreshed!");
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    refreshBtn.addEventListener('click', refreshEmployees);

    viewEmployeeBtn.addEventListener('click', () => {
        if (selectedEmployee) {
            employeeDetails.innerHTML = `
                <h2>${selectedEmployee.LAST_NAME} ${selectedEmployee.NAME}</h2>
                <table id="detailsTable">
                    <tr>
                        <td width="25%">Loại tài khoản</th>
                        <td width="75%">${selectedEmployee.USER_TYPE}</td>
                    </tr>
                    <tr>
                        <td>Giới tính</th>
                        <td>${selectedEmployee.PERSONAL_GENDER}</td>
                    </tr>
                    <tr>
                        <td>Ngày sinh</th>
                        <td>${selectedEmployee.PERSONAL_BIRTHDAY}</td>
                    </tr>
                    <tr>
                        <td>Email</th>
                        <td>${selectedEmployee.EMAIL}</td>
                    </tr>
                    <tr>
                        <td>Tài khoản đang hoạt động</th>
                        <td>${selectedEmployee.ACTIVE}</td>
                    </tr>
                    <tr>
                        <td>Lần đăng nhập cuối</th>
                        <td>${selectedEmployee.LAST_LOGIN}</td>
                    </tr>
                    
                </table>
            `;
            employee.style.display = 'block';
        } else {
            alert('Please select an employee first.');
        }
    });

    closeDetailsBtn.addEventListener('click', () => {
        employee.style.display = 'none';
    });

    // Initial fetch
    fetchEmployees();
});
