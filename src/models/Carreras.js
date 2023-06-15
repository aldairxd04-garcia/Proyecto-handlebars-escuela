import { Schema, model } from "mongoose";

const carreraEsquema = new Schema(
    {
        matricula: {
            type: String,
            required: true,
        },
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        siglas: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
        modalidad: {
            type: String,
            required: true,
        },
        periodo: {
            type: String,
            required: true,
        },
        opcion: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model("Carreras", carreraEsquema);