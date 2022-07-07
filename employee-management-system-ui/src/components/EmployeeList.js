import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from "../services/EmployeeService";
import Employee from "./Employee";

const EmployeeList = () => {

    const navigate = useNavigate();

    // Checks to see if the data is loaded or not
    const [loading, setLoading] = useState(true);
    // Saves the list of employees we are getting from the back-end API
    const [employees, setEmployees] = useState(null);

    useEffect(() => {
        // Uses asynchrnous method because it may take time to load all the data
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await EmployeeService.getEmployees();
                setEmployees(response.data);
            } catch(error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const deleteEmployee = (e, id) => {
        e.preventDefault();
        EmployeeService.deleteEmployee(id).then(() => {
            if (employees) {
                setEmployees((prevElement) => {
                    // returns only the employees that weren't deleted
                    return prevElement.filter((employee) => employee.id !== id);
                });
            }
        });
    };

    return (
        <div className="container mx-auto my-6">
            <div className="h-12">
                <button
                    onClick={() => navigate("/addEmployee")}
                    className="rounded bg-slate-600 text-white px-6 py-2 font-semibold">
                    Add Employee
                </button>
            </div>
            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                                First Name
                            </th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                                Last Name
                            </th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                                Email ID
                            </th>
                            <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {/*If not loading, display table data*/}
                    {!loading && (
                    <tbody className="bg-white">
                            {employees.map((employee) => (
                                <Employee
                                    employee={employee}
                                    deleteEmployee={deleteEmployee}
                                    key={employee.id}/>
                            ))}
                    </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;