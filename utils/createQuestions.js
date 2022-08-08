const inquirer = require('inquirer');

async function createQuestions() {
    // call query to get employee first/last names
    // call query to get role titles
    // call query to get department titles
    // call query to get manager first/last names

    return await [
        {
            type: 'list',
            name: 'actions',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'Add an Employee',
                'Update an Employee',
                'Remove an Employee',
                new inquirer.Separator(),
                'View Roles',
                'Add a Role',
                'Remove a Role',
                new inquirer.Separator(),
                'View Departments',
                'Add A Department',
                'Remove a Department',
                'View Payroll Budgets',
                new inquirer.Separator(),
                'Quit',
                new inquirer.Separator()
            ]
        },
        {
            type: 'list',
            name: 'employeeViews',
            message: 'Which view of employees would you like to see?',
            choices: [
                'All Employees',
                'By Role',
                'By Manager'
            ],
            when: ({ actions }) => {
                if (actions === 'View Employees') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'byRolesSelect',
            message: 'Select a role to view a list of employees:',
            choices: [
                'A list of all available roles will be displayed here.'
            ],
            when: ({ employeeViews }) => {
                if (employeeViews === 'By Role') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'byManagersSelect',
            message: 'Select a manager to view employees under them:',
            choices: [
                'A list of all available managers will be displayed here.'
            ],
            when: ({ employeeViews }) => {
                if (employeeViews === 'By Manager') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'input',
            name: 'firstName',
            message: "Enter the employee's first name: ",
            validate: firstNameInput => {
                if (firstNameInput && firstNameInput.length < 31 && firstNameInput.search(/[^a-zA-Z\']/g) === -1) {
                    return true;
                } else {
                    console.log("Please enter a valid name that's no longer than 30 characters.");
                    return false;
                }
            },
            when: ({ actions }) => {
                if (actions === 'Add an Employee') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Enter the employee's last name: ",
            validate: lastNameInput => {
                if (lastNameInput && lastNameInput.length < 31 && lastNameInput.search(/[^a-zA-Z'-]/g) === -1) {
                    return true;
                } else {
                    console.log("Please enter a valid name that's no longer than 30 characters.");
                    return false;
                }
            },
            when: ({ actions }) => {
                if (actions === 'Add an Employee') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'assignRole',
            message: "What is the employee's role?",
            choices: ['A list of all available roles will be here'],
            when: ({ actions }) => {
                if (actions === 'Add an Employee') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'assignManager',
            message: "Which manager will this employee report to?",
            choices: ['A list of all available managers will be here'],
            when: ({ actions }) => {
                if (actions === 'Add an Employee') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'employeeChoice',
            message: 'Which employee would you like to update?',
            choices: ['A list of employees will go here.'],
            when: ({ actions }) => {
                if (actions === 'Update an Employee') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'updateChoice',
            message: 'Which value would you like to update?',
            choices: [
                "Change Employee's Role",
                "Change Employee's Manager"
            ],
            when: ({ actions }) => {
                if (actions === 'Update an Employee') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'changeRole',
            message: "What is the employee's new role?",
            choices: ['A list of all available roles will be here'],
            when: ({ updateChoice }) => {
                if (updateChoice === "Change Employee's Role") {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'changeManager',
            message: "Which manager will this employee report to?",
            choices: ['A list of all available managers will be here'],
            when: ({ updateChoice }) => {
                if (updateChoice === "Change Employee's Manager") {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'removeEmployee',
            message: 'Which employee would you like to remove?',
            choices: ['A list of employees will go here'],
            when: ({ actions }) => {
                if (actions === 'Remove an Employee') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'roleViews',
            message: 'Which view of employee roles would you like to see?',
            choices: [
                'All Roles',
                'By Department'
            ],
            when: ({ actions }) => {
                if (actions === 'View Roles') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'rolesByDepartment',
            message: "Choose a department to see its roles:",
            choices: ['A list of all roles will go here'],
            when: ({ viewRoles }) => {
                if (viewRoles === 'By Department') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'input',
            name: 'roleTitle',
            message: "Enter the role's title: ",
            validate: roleTitleInput => {
                if (roleTitleInput && roleTitleInput.length < 31 && roleTitleInput.search(/[^a-zA-Z/-\s]/g) === -1) {
                    return true;
                } else {
                    console.log("Please enter a valid role title that's no more than 30 characters long.");
                    return false;
                }
            },
            when: ({ actions }) => {
                if (actions === 'Add a Role') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: "Which department does this role belong to?",
            choices: ['A list of all available departments will go here'],
            when: ({ actions }) => {
                if (actions === 'Add a Role') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'removeRole',
            message: 'Which role would you like to remove?',
            choices: ['A list of roles will go here'],
            when: ({ actions }) => {
                if (actions === 'Remove a Role') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'input',
            name: 'departmentName',
            message: "Enter the department's name: ",
            validate: departmentNameInput => {
                if (departmentNameInput && departmentNameInput.length < 31 && departmentNameInput.search(/[^a-zA-Z/-\s]/g) === -1) {
                    return true;
                } else {
                    console.log("Please enter a valid department name that's no more than 30 characters long.");
                    return false;
                }
            },
            when: ({ actions }) => {
                if (actions === 'Add A Department') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'removeDepartment',
            message: 'Which department would you like to remove?',
            choices: ['A list of all departments will go here'],
            when: ({ actions }) => {
                if (actions === 'Remove a Department') {
                    return true;
                }
                return false;
            }
        },
        {
            type: 'list',
            name: 'departmentPayroll',
            message: "Choose a department to see its roles:",
            choices: ['A list of all roles will go here'],
            when: ({ payrollViews }) => {
                if (payrollViews === 'View Payroll Budgets') {
                    return true;
                }
                return false;
            }
        }
    ];
}

module.exports = createQuestions;
