"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRelationalFieldsMapper = exports.studentRelationalFields = exports.studentSearchableFields = exports.studentFilterableFields = void 0;
exports.studentFilterableFields = [
    'searchTerm',
    'studentId',
    'email',
    'contactNo',
    'gender',
    'bloodGroup',
    'gender',
    'academicFacultyId',
    'academicDepartmentId',
    'academicSemesterId',
];
exports.studentSearchableFields = [
    'firstName',
    'lastName',
    'middleName',
    'email',
    'contactNo',
    'studentId',
];
exports.studentRelationalFields = [
    'academicFacultyId',
    'academicDepartmentId',
    'academicSemesterId',
];
exports.studentRelationalFieldsMapper = {
    academicFacultyId: 'academicFaculty',
    academicDepartmentId: 'academicDepartment',
    academicSemesterId: 'academicSemester',
};
