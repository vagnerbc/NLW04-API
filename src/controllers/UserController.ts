import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import * as yup from 'yup'
import { AppError } from "../errors/AppError"
import { UserRepository } from "../repositories/UserRepository"

class UserController {

    async create(req: Request, res: Response) {
        const { name, email } = req.body

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }

        const userRepository = getCustomRepository(UserRepository)

        const userAlreadyExists = await userRepository.findOne({ email })

        if (userAlreadyExists) {
            throw new AppError("User already exists!")
        }

        const user = userRepository.create({ name, email })

        await userRepository.save(user)

        return res.status(201).json(user)
    }

    async show(req: Request, res: Response) {
        const repository = getCustomRepository(UserRepository)

        const users = await repository.find();

        return res.status(200).json(users)
    }
}

export { UserController }
