import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Survey } from "./Survey";

@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    // @OneToMany()
    // survey_id: Survey

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { User }