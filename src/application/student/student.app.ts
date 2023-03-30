import { Op } from "sequelize"

const filters = {
    basicQuery: ({ entryCode, name, desiredCourseId, gender, createdAt }: any) => {

        const queryPerson: any = {}

        const query: any = {}

        if (name && name !== 'undefined' && name.length > 3)
            queryPerson[Op.or] = [
                { ['$lastName$']: { [Op.like]: `%${name}%` } },
                { ['$firstName$']: { [Op.like]: `%${name}%` } },
            ]

        if (entryCode && entryCode.length > 5 && entryCode.length < 18)
            query.entryCode = entryCode

        if (gender && gender !== "*")
            queryPerson.gender = gender

        if (desiredCourseId && desiredCourseId !== "*")
            query.desiredCourseId = desiredCourseId

        return { query, queryPerson }

    }
}


export const StudentApp = {
    filters
}
