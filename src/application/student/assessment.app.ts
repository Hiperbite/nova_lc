import { boolean } from 'zod';
import _ from "lodash";
import { Assessment } from "../../models/index";
type ResultType = {
    value?: number,
    result?: number,
    caption?: string,// 'Reprovado'| 'Despensado'|'Exame'| 'Recurso'| 'Aprovado',
    average?: number,
    originalValue?: number,
    isActive?: boolean
}


//                0             1             2        3          4
const captions = ['Reprovado', 'Despensado', 'Exame', 'Recurso', 'Aprovado', '']

const resultEnrollment = (assess: any/*Assessment[]*/) => {

    const assessments = JSON.parse(JSON.stringify(assess));
    //const assessments=assess;
    assessments.forEach((assessment: Assessment) => assessment.value = assessment.value * Number(assessment.type?.value?.replace('%', '')) / 100)
    const newGroup = _.groupBy(assessments, 'discipline.code')
    const myGroup = Object.keys(newGroup).map((key: string) => {
        /**
         * para pr1 e pr2
            se a media for  < 7 -> reporvado
            se a mdeia for de 7 a 14 -> exame
            se a media for >= 14 e cadeira for despensavel -> aprovado

            para exames
            se a nota for < 10 -> recurso 
            se a nota for >= 10 -> aprovado

            para recurso
            se a nota for < 10 -> reprovado 
            se a nota for >= 10 -> aprovado
         */
        let step = 0;
        let values: any = {};
        assess
            .filter((as: Assessment) => as.discipline?.code === key)
            .forEach((as: Assessment) => {
                values[`${as.type?.code}`] = as.value
            })
        let result: ResultType = {};

        let normalAssessment = newGroup[key]
            .filter((a: Assessment) => ['PR1', 'PR2'].includes(a.type?.code ?? ''))

        let resultNormal: ResultType = { isActive: normalAssessment.length > 1, result: 5 };
        const normal = normalAssessment.reduce((sum: number, a: Assessment) => a.value + sum, 0)

        values['PRM'] = normal
        /*
         * para pr1 e pr2
         * se a media for  < 7 -> reporvado
         */
        if (normal < 7) {
            resultNormal = { ...resultNormal, value: normal, result: 0, caption: captions[0], average: normal }

        }
        /*
         * para pr1 e pr2
         * se a media for >= 14 e cadeira for despensavel -> aprovado
         */
        else if (normal > 14) {
            resultNormal = { ...resultNormal, value: normal, result: 0, caption: captions[1], average: normal }
        }

        /*
         * para pr1 e pr2
         * se a 7 < media < 14  Exame
         */
        else if (normal < 14) {
            resultNormal = { ...resultNormal, value: normal, result: 2, caption: captions[2], average: normal }
        }
        result = { ...result, ...resultNormal }

        if ([0, 1, 4].includes(resultNormal.result ?? 0)) {
            result = { ...result, ...resultNormal }
        }
        if (normalAssessment.length < 2) {
            result = { ...result, ...resultNormal, result: 5, caption: captions[5], }
        }
        let examAssessment = newGroup[key]
            .filter((a: Assessment) => ['EX'].includes(a.type?.code ?? ''))

        let resultExam: ResultType = { isActive: (examAssessment.length > 0 && resultNormal.result === 2), originalValue: assess?.filter((x: Assessment) => x.type?.code === 'EX')[0].value };
        const exam = examAssessment.reduce((sum: number, a: Assessment) => a.value + sum, 0)

        if (resultExam.isActive) {
            values['EXM'] = normal + exam
        }
        /*
         * para exames
         * se a nota for < 10 -> recurso 
         * se a nota for >= 10 -> aprovado
         */
        if (normal + exam < 10) {
            resultExam = { ...resultExam, value: exam, average: (normal + exam), result: 3, caption: captions[3], }
        } else {
            resultExam = { ...resultExam, value: exam, average: (normal + exam), result: 4, caption: captions[4], }
        }

        if (resultExam.isActive) {
            result = { ...result, ...resultExam }
            step = 1
        }

        let resourceAssessment = newGroup[key]
            .filter((a: Assessment) => ['RC'].includes(a.type?.code ?? ''))
        let resultResource: ResultType = { isActive: (resourceAssessment.length > 0 && resultExam.result === 3), originalValue: assess?.filter((x: Assessment) => x.type?.code === 'RC')[0]?.value };
        const resource = resourceAssessment.reduce((sum: number, a: Assessment) => a.value + sum, 0)
        values['RCM'] = resource
        /*
         * para exames
         * se a nota for < 10 -> recurso 
         * se a nota for >= 10 -> aprovado
         */
        if (resource < 10) {
            resultResource = { ...resultResource, value: resource, result: 0, caption: captions[0], average: resource }
        } else {
            resultResource = { ...resultResource, value: resource, result: 4, caption: captions[4], average: resource }
        }

        if (resultResource.isActive) {
            result = { ...result, ...resultResource }
            step = 2
        }
        values['RESULT'] = result.caption
        values['FINAL'] = result.result

        const final = { normal: resultNormal, exam: resultExam, resource: resultResource, ...result, step }
        return { key: newGroup[key][0].discipline, ass: newGroup[key], result: final, ...values }
    })
    return myGroup;
}
const resultDiscipline = (assess: any/*Assessment[]*/) => {

    const assessments = JSON.parse(JSON.stringify(assess));
    //const assessments=assess;
    assessments.forEach((assessment: Assessment) => assessment.value = assessment.value * Number(assessment.type?.value?.replace('%', '')) / 100)
    const newGroup = _.groupBy(assessments, 'enrollment.code')
    const myGroup = Object.keys(newGroup).map((key: string) => {
        /**
         * para pr1 e pr2
            se a media for  < 7 -> reporvado
            se a mdeia for de 7 a 14 -> exame
            se a media for >= 14 e cadeira for despensavel -> aprovado

            para exames
            se a nota for < 10 -> recurso 
            se a nota for >= 10 -> aprovado

            para recurso
            se a nota for < 10 -> reprovado 
            se a nota for >= 10 -> aprovado
         */
        let step = 0;
        let values: any = {};
        assess
            .filter((as: Assessment) => as.discipline?.code === key)
            .forEach((as: Assessment) => {
                values[`${as.type?.code}`] = as.value
            })
        let result: ResultType = {};

        let normalAssessment = newGroup[key]
            .filter((a: Assessment) => ['PR1', 'PR2'].includes(a.type?.code ?? ''))

        let resultNormal: ResultType = { isActive: normalAssessment.length > 1, result: 5 };
        const normal = normalAssessment.reduce((sum: number, a: Assessment) => a.value + sum, 0)

        values['PRM'] = normal
        /*
         * para pr1 e pr2
         * se a media for  < 7 -> reporvado
         */
        if (normal < 7) {
            resultNormal = { ...resultNormal, value: normal, result: 0, caption: captions[0], average: normal }

        }
        /*
         * para pr1 e pr2
         * se a media for >= 14 e cadeira for despensavel -> aprovado
         */
        else if (normal > 14) {
            resultNormal = { ...resultNormal, value: normal, result: 0, caption: captions[1], average: normal }
        }

        /*
         * para pr1 e pr2
         * se a 7 < media < 14  Exame
         */
        else if (normal < 14) {
            resultNormal = { ...resultNormal, value: normal, result: 2, caption: captions[2], average: normal }
        }
        result = { ...result, ...resultNormal }

        if ([0, 1, 4].includes(resultNormal.result ?? 0)) {
            result = { ...result, ...resultNormal }
        }
        if (normalAssessment.length < 2) {
            result = { ...result, ...resultNormal, result: 5, caption: captions[5], }
        }
        let examAssessment = newGroup[key]
            .filter((a: Assessment) => ['EX'].includes(a.type?.code ?? ''))

        let resultExam: ResultType = { isActive: (examAssessment.length > 0 && resultNormal.result === 2), originalValue: assess?.filter((x: Assessment) => x.type?.code === 'EX')[0].value };
        const exam = examAssessment.reduce((sum: number, a: Assessment) => a.value + sum, 0)

        if (resultExam.isActive) {
            values['EXM'] = normal + exam
        }
        /*
         * para exames
         * se a nota for < 10 -> recurso 
         * se a nota for >= 10 -> aprovado
         */
        if (normal + exam < 10) {
            resultExam = { ...resultExam, value: exam, average: (normal + exam), result: 3, caption: captions[3], }
        } else {
            resultExam = { ...resultExam, value: exam, average: (normal + exam), result: 4, caption: captions[4], }
        }

        if (resultExam.isActive) {
            result = { ...result, ...resultExam }
            step = 1
        }

        let resourceAssessment = newGroup[key]
            .filter((a: Assessment) => ['RC'].includes(a.type?.code ?? ''))
        let resultResource: ResultType = { isActive: (resourceAssessment.length > 0 && resultExam.result === 3), originalValue: assess?.filter((x: Assessment) => x.type?.code === 'RC')[0]?.value };
        const resource = resourceAssessment.reduce((sum: number, a: Assessment) => a.value + sum, 0)
        values['RCM'] = resource
        /*
         * para exames
         * se a nota for < 10 -> recurso 
         * se a nota for >= 10 -> aprovado
         */
        if (resource < 10) {
            resultResource = { ...resultResource, value: resource, result: 0, caption: captions[0], average: resource }
        } else {
            resultResource = { ...resultResource, value: resource, result: 4, caption: captions[4], average: resource }
        }

        if (resultResource.isActive) {
            result = { ...result, ...resultResource }
            step = 2
        }
        values['RESULT'] = result.caption
        values['FINAL'] = result.result

        const final = { normal: resultNormal, exam: resultExam, resource: resultResource, ...result, step }
        return { key: newGroup[key][0].enrollment, ass: newGroup[key], result: final, ...values }
    })
    return myGroup;
}

export const AssessmentApp = {
    resultEnrollment,
    resultDiscipline
}
