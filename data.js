// Mock Data
// Mock Data
const db = {
    semesters: [
        { id: 1, name: 'Semester 1' },
        { id: 2, name: 'Semester 2' },
        { id: 3, name: 'Semester 3' },
        { id: 4, name: 'Semester 4' },
        { id: 5, name: 'Semester 5' },
        { id: 6, name: 'Semester 6' },
        { id: 7, name: 'Semester 7' },
        { id: 8, name: 'Semester 8' }
    ],
    departments: [
        { id: 'cs', name: 'Computer Science', icon: 'fa-laptop-code', info: 'Programming, AI, Data Science' },
        { id: 'mech', name: 'Mechanical Eng', icon: 'fa-gears', info: 'Thermodynamics, Machines' },
        { id: 'civil', name: 'Civil Engineering', icon: 'fa-building', info: 'Structure, Surveying' },
        { id: 'ee', name: 'Electrical Eng', icon: 'fa-bolt', info: 'Circuits, Power Systems' },
        { id: 'ec', name: 'Electronics', icon: 'fa-microchip', info: 'VLSI, Embedded Systems' },
        { id: 'chem', name: 'Chemical Eng', icon: 'fa-flask', info: 'Organic, Process Eng' }
    ],
    subjects: {
        'cs': [
            { id: 'dsa', name: 'Data Structures', code: 'CS201', units: 5 },
            { id: 'os', name: 'Operating Systems', code: 'CS202', units: 5 },
            { id: 'dbms', name: 'Database Management', code: 'CS203', units: 4 },
            { id: 'cn', name: 'Computer Networks', code: 'CS204', units: 5 },
            { id: 'ai', name: 'Artificial Intelligence', code: 'CS301', units: 4 }
        ],
        'mech': [
            { id: 'thermo', name: 'Thermodynamics', code: 'ME201', units: 5 },
            { id: 'fm', name: 'Fluid Mechanics', code: 'ME202', units: 5 }
        ],
        'ee': [
            { id: 'circuit', name: 'Circuit Theory', code: 'EE201', units: 5 }
        ]
    }
};

