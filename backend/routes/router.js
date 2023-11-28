import express from "express";
import userRouter from "./userRoutes.js";
import projectRouter from "./projectRoutes.js";
import columnRouter from "./columnRoutes.js";
import cardRouter from "./cardRoutes.js";
import taskRouter from "./taskRoutes.js";
import commentRouter from "./commentRoutes.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/column", columnRouter);
router.use("/card", cardRouter);
router.use("/task", taskRouter);
router.use("/comment", commentRouter);

export default router;