import vine from "@vinejs/vine";
export const registerSchema = vine.object({
    name:vine.string().minLength(2).maxLength(40),
    email:vine.string().email(),
    password:vine.string().minLength(6).maxLength(20).confirmed()
})  