import router from 'express';
import { 
    addChat,
    getAllConnections 
} from '../controllers/chat.controller.js';
import authentication from "../middlewares/authentication.middleware.js";


const chatRouter = router.Router();

chatRouter.route('/addChat').post(
    authentication,
    addChat
);

// chatRouter.route('/').get(getAllConnections);


export default chatRouter;