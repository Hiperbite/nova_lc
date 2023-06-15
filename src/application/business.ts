import moment from "moment"
import { Event, EventSchedule, EventType } from "../models/index"

export async function canCreateEnrollment(type: string) {

    const today = moment(moment().format('YYYY-MM-DD'));

    const myType = await EventType.findOne({ where: { code: type } })
    const event = await Event.findOne(
        {
            include: [EventType, EventSchedule],
            where: { 'typeId': myType?.id, isActive: true }
        }
    )
    let schedule = event?.schedules
    if (!event || !schedule) {
        return { success: false, message: ['não existe nenhum evento activo'] }
    }

    schedule = schedule?.filter((s: EventSchedule) => {
        const _start = moment(moment(s.start).format('YYYY-MM-DD'));
        const _end = moment(moment(s.end).format('YYYY-MM-DD'));
        const is = today.isSameOrBefore(_end) && today.isSameOrAfter(_start)
        return is;
    })

    if (schedule.length === 0) {
        return { success: false, message: ['o periodo de inscrição já passou'] , data:[]}
    }

    schedule = schedule?.filter((s: EventSchedule) => s.isActive)
    if (schedule.length === 0) {
        return { success: false, message: ['não existe nenhum evento activo'] , data:[]}
    }


    return { success: true, message: [], data: schedule }
}

