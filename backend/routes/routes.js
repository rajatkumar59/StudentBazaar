import express from "express";
import { signup, login, verifyEmail } from "../controllers/AuthController.js";
import { sellItem, updateItem } from "../controllers/SellController.js";
import {
  dashboardListItems,
  totalNumberOfItems,
} from "../controllers/DashboardController.js";
import { ItemDetailsController } from "../controllers/ItemDetailsController.js";
import { ProfileDetails } from "../controllers/ProfileController.js";
import { ItemsListedByAdmin } from "../controllers/AdminListingsController.js";
import { DeleteItem } from "../controllers/DeleteItemController.js";
import { TakeOrder } from "../controllers/TakeOrderController.js";
import { searchItem } from "../controllers/SearchController.js";
import { ShowOrders } from "../controllers/ShowOrdersController.js";
import { ShowMyOrders } from "../controllers/ShowOrdersController.js";
import { DeleteOrder } from "../controllers/DeleteOrderController.js";
import { EditProfile } from "../controllers/EditProfileController.js";

const router = express.Router();

router.get("/api/count", totalNumberOfItems);
router.post("/api/auth/signup", signup);
router.post("/api/auth/login", login);
router.get("/verify-email", verifyEmail);
router.post("/api/sell", sellItem);
router.post("/api/search", searchItem);
router.post("/api/dashboard", dashboardListItems);
router.post("/api/itemDetails", ItemDetailsController);
router.post("/api/profile", ProfileDetails);
router.get("/api/itemsListedByAdmin", ItemsListedByAdmin);
router.post("/api/updateItem", updateItem);
router.post("/api/deleteItem", DeleteItem);
router.post("/api/takeOrder", TakeOrder);
router.get("/api/showOrders", ShowOrders);
router.post("/api/showMyOrders", ShowMyOrders);
router.post("/api/deleteOrder", DeleteOrder);
router.post("/api/editProfile", EditProfile);

export default router;
