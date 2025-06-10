var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import { config } from "../config/config.js";
export default function DBConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("config : ", config);
            yield mongoose.connect(config.DB_URL);
            console.log("db is connected successfully");
        }
        catch (error) {
            console.log("DBConnection error : ", error);
        }
    });
}
