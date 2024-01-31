import vine from "@vinejs/vine";
import { CustomErrorHandler } from "./CustomErrorReporter.js";
vine.errorReporter =()=> new CustomErrorHandler()
export const newsSchema = vine.object({
    title: vine.string().minLength(5).maxLength(190),
    content: vine.string().minLength(10).maxLength(30000),
})