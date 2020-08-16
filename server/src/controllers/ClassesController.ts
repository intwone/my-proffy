import { Request, Response } from 'express';
 
import database from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string; 
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if(!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeInMinutos = convertHourToMinutes(time);
    
    const classes = await database('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutos])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutos])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.* '])

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const { 
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
    const trx = await database.transaction();
  
    try {
      const insertedUserIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      })
    
      const user_id = insertedUserIds[0];
    
      const insertedClasseIds = await trx('classes').insert({
        subject,
        cost,
        user_id
      })
    
      const class_id = insertedClasseIds[0];
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      })
    
      await trx('class_schedule').insert(classSchedule);
    
      // make changes to the database
      await trx.commit(); 
    
      return response.status(201).send(); // HTTP: 201 - Create successfully
    } catch(err) {
      await trx.rollback();
  
      return response.status(400).json({ // HTTP: 400 - Bad request
        erro: 'Unexpected error while create new class'
      })
    }
  }
}