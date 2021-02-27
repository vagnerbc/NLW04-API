import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { SurveyRepository } from "../repositories/SurveyRepository"

class SurveyController {

    async create(req: Request, res: Response) {
        const { title, description } = req.body

        const repository = getCustomRepository(SurveyRepository)

        const survey = repository.create({ title, description })

        await repository.save(survey)

        return res.status(201).json(survey)
    }

    async show(req: Request, res: Response) {
        const repository = getCustomRepository(SurveyRepository)

        const surveys = await repository.find()

        return res.status(200).json(surveys)
    }
}

export { SurveyController }