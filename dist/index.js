"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const connectDB_1 = require("./connectDB");
const user_1 = __importDefault(require("./routes/user"));
const property_1 = __importDefault(require("./routes/property"));
const reviews_1 = __importDefault(require("./routes/reviews"));
const ratings_1 = __importDefault(require("./routes/ratings"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const favourites_1 = __importDefault(require("./routes/favourites"));
const images_1 = __importDefault(require("./routes/images"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/uploads", express_1.default.static("uploads"));
app.use("/user", user_1.default);
app.use("/property", property_1.default);
app.use("/reviews", reviews_1.default);
app.use("/ratings", ratings_1.default);
app.use("/bookings", bookings_1.default);
app.use("/favourites", favourites_1.default);
app.use("/images", images_1.default);
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    (0, connectDB_1.connect)();
    console.log(`listening on port ${PORT}`);
});
