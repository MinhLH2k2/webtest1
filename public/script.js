document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refreshBtn');
    const viewEmployeeBtn = document.getElementById('viewEmployeeBtn');
    const empTable = document.getElementById('empTable');
    const employeeDetails = document.getElementById('employeeDetails');
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');
    let selectedEmployee = null;

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
        employees.forEach(employee => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            td1.textContent = employee.ID;
            td2.textContent = employee.LAST_NAME + ' ' + employee.NAME;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.addEventListener('click', () => {
                // Xóa highlight nhân viên đang được chọn
                document.querySelectorAll('#empTable tr').forEach(tr => tr.classList.remove('highlighted'));
                // Highlight nhân viên đang được chọn
                tr.classList.add('highlighted');
                selectedEmployee = employee;
            })
            empTable.appendChild(tr);
        });
            
    };

    refreshBtn.addEventListener('click', fetchEmployees);

    viewEmployeeBtn.addEventListener('click', () => {
        if (selectedEmployee) {
            employeeDetails.innerHTML = `
                <div id="details">
                    <h2>${selectedEmployee.LAST_NAME} ${selectedEmployee.NAME}</h2>
                    <p>Loại tài khoản: ${selectedEmployee.USER_TYPE}</p>
                    <p>Giới tính: ${selectedEmployee.PERSONAL_GENDER}</p>
                    <p>Ngày sinh: ${selectedEmployee.PERSONAL_BIRTHDAY}</p>
                    <p>Email: ${selectedEmployee.EMAIL}</p>
                    <p>Tài khoản đang hoạt động: ${selectedEmployee.ACTIVE}</p>
                    <p>Lần đăng nhập cuối: ${selectedEmployee.LAST_LOGIN}</p>
                </div>
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
