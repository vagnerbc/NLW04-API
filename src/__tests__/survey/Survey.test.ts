import request from "supertest";
import { app } from "../../app";
import createConnection from '../../database'

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it("Should be able to create a new survey ", async () => {
        const response = await request(app).post("/surveys").send({
            title: 'Test',
            description: 'description test'
        })

        expect(response.status).toBe(201)

    })

    it("Should be able to get all surveys", async () => {
        const response = await request(app).get("/surveys")

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1)
    })

})