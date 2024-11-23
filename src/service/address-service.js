import { createAddressValidation } from "../validation/address-validation.js"
import { getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { request } from "express"


const create = async (user, contactId, request) => {
    contactId = validate(getContactValidation, contactId)

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })

    if(totalContactInDatabase !== 1) {
        throw new ResponseError(404, "contact is not found")
    }

    const address = validate(createAddressValidation, request)
    address.contact_id = contactId

    return await prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    })
}

export default{
    create
}