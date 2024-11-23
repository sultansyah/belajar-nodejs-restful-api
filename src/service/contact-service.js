import { createContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

const create = async (user, request) => {
    const contact = validate(createContactValidation, request)
    contact.username = user.username

    return await prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

export default {
    create
}