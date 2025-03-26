import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Lead } from '@app/models';

const LeadSchema = z.object({
  _id: z.string().optional(),
  // Campos requeridos
  full_name: z.string().min(1, "El nombre completo es requerido"),
  first_name: z.string().min(1, "El nombre es requerido"),
  last_name: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Email inválido"),
  interestProgram: z.string().min(1, "El programa es requerido"),

  // Campos opcionales
  mobile_phone: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  
  // No se validan pero se lleva la trazabilidad
  incremental: z.number().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted: z.boolean().optional(),
  deletedAt: z.date().optional(),
  trackings: z.array(z.any()).optional()
});

export const validateLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Primero validamos la estructura de los datos
    await LeadSchema.parseAsync(req.body);

    // Luego validamos la regla de negocio de email único por programa
    const { email, interestProgram, _id } = req.body;

    // Construimos la consulta
    const query: any = {
      email,
      interestProgram,
      deleted: false
    };

    // Si es una actualización, excluimos el documento actual
    if (_id) {
      query._id = { $ne: _id };
    }

    // Buscamos si existe un lead con el mismo email y programa
    const existingLead = await Lead.findOne(query).lean();

    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: "Ya existe un registro con este email para el programa seleccionado"
      });
    }

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
}; 