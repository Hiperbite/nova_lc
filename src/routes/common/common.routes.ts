import express from "express";
import { ModelCtor } from "sequelize-typescript";
import { ModelApi } from "../../api/common/common.api";


import {
  AcademicDegree,
  Address,
  Assessment,
  AssessmentType,
  Career,
  Category,
  Contact,
  Course,
  CurricularPlan,
  Discipline,
  Document,
  EventType,
  Notification,
  Person,
  PlanItem,
  Semester,
  Ticket,
  TicketState,
  TicketType,
  TimeTable,
  Event,
  EventSchedule
} from "../../models/index";
import { DefaultRepository as Repository } from "../../repository/index";

const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);
// asyncHandler(
const router = express.Router();

interface modelsType {
  key: string;
  model: any;
}

const models: modelsType[] = [
  { key: "contacts", model: Contact },
  { key: "address", model: Address },

  { key: "categories", model: Category },
  { key: "careers", model: Career },

  { key: "persons", model: Person },
  { key: "documents", model: Document },
  { key: "courses", model: Course },
  { key: "curricular-plans", model: CurricularPlan },
  { key: "disciplines", model: Discipline },
  { key: "semesters", model: Semester },
  { key: "plan-items", model: PlanItem },
  { key: "time-tables", model: TimeTable },

  { key: "assessments", model: Assessment },
  { key: "assessment-types", model: AssessmentType },
  { key: "academic-degrees", model: AcademicDegree },
  { key: "notifications", model: Notification },

  { key: "tickets", model: Ticket },
  { key: "ticket-states", model: TicketState },
  { key: "ticket-types", model: TicketType },

  { key: "events", model: Event },
  { key: "event-schedules", model: EventSchedule },
  { key: "event-types", model: EventType},
];

models.forEach(({ model, key }: modelsType) => {
  let api = new ModelApi<typeof model>(new Repository(model.scope('default')));
  router
    .post(
      `/commons/${key}/`,
      // validateResource(createStudentSchema),
      asyncHandler(api.create)
    )

    .put(
      `/commons/${key}/:id`,
      // validateResource(updateStudentSchema),
      asyncHandler(api.update)
    )

    .delete(
      `/commons/${key}/:id`,
      // validateResource(updateStudentSchema),
      asyncHandler(api.delete)
    )

    .get(`/commons/${key}/:id`, asyncHandler(api.find))

    .get(`/commons/${key}/`, asyncHandler(api.findBy));
});

export default router;
