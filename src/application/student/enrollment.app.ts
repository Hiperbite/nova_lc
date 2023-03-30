import { Op } from "sequelize"

const filters = {
    basicQuery: ({ code, name, classeId, periodId, year, studentId }: any) => {

        const queryStudent: any = {}

        const queryStudentPerson: any = {}

        const query: any = { current: true }

        if (studentId)
            query.studentId = studentId;

        const queryClass: any = {}

        if (name && name !== 'undefined' && name.length > 3)
            queryStudentPerson[Op.or] = [
                { ['$lastName$']: { [Op.like]: `%${name}%` } },
                { ['$firstName$']: { [Op.like]: `%${name}%` } },
            ]

        if (code && code.length > 5 && code.length < 8)
            queryStudent.code = code


        if (classeId && classeId !== "*")
            query.classeId = classeId

        if (Number(year) > 0 && Number(year) <= 5)
            queryClass.semester = { [Op.in]: [Number(year) * 2, Number(year) * 2 - 1] }

        if (periodId && periodId !== "*")
            queryClass.periodId = periodId

        return { query, queryClass, queryStudent, queryStudentPerson }

    }
}


export const EnrollmentApp = {
    filters
}
