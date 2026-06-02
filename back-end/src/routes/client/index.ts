
import { Router } from "express";
import { ServiceController } from "../../controllers/client/ServiceController.js";
import { ProposalClientController } from "../../controllers/client/ProposalController.js";
import { authenticateToken } from "../../middleware/authMiddleware.js";

const router = Router();

// Rotas de serviços (criados por clientes)
router.post("/services", authenticateToken, ServiceController.criar);
router.get("/services", authenticateToken, ServiceController.listarMeus);
router.get("/services/all", authenticateToken, ServiceController.listarTodos);

// Rotas de propostas recebidas
router.get("/proposals/received", authenticateToken, ProposalClientController.listarPropostasRecebidas);
router.patch("/proposals/:id/accept", authenticateToken, ProposalClientController.aceitarProposta);
router.patch("/proposals/:id/reject", authenticateToken, ProposalClientController.recusarProposta);

export default router;
