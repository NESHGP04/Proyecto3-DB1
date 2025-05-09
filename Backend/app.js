const express = require('express'); 
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express(); 
const prisma = new PrismaClient(); 
const port = 3000;  

// Middleware
app.use(cors());
app.use(express.json());

//------------------------------------------------------------------
// Inicio de constantes  para validar el formato/existencia de los elementos necesarios para el correcto funcionamiento de la db

//verificar el formato de las fechas
const isValidDate = (dateStr) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
};

 // Verificar si el medico existe
const isValidMedico = async(id) => {
    const medico = await prisma.medicos.findUnique({
        where:{id_medico:parseInt(id)}
    });
    return Boolean(medico);
}

// Verificar si el paciente existe
const isValidPaciente = async(id) => {
    const paciente = await prisma.pacientes.findUnique({
        where:{id_paciente:parseInt(id)}
    });
    return Boolean(paciente);
}

// Verificar si la clinica existe
const isValidClinica = async(id) => {
    const clinica = await prisma.clinica.findUnique({
        where:{id_clinica:parseInt(id)}
    });
    return Boolean(clinica);
}

// Verificar si la clinica existe
const isValidCita = async(id) => {
    const cita = await prisma.citas.findUnique({
        where:{id_cita:parseInt(id)}
    });
    return Boolean(cita);
}
// Verificar si la consulta existe
const isValidConsulta = async(id) => {
    const consulta = await prisma.consultas.findUnique({
        where:{id_consulta:parseInt(id)}
    });
    return Boolean(consulta);
}

// Fin de constantes
//---------------------------------------------------------

//Inicio Endponts POST 

// se hace un post para las clinicas
app.post('/clinicas', async (req, res) => {
    const { nombre, direccion } = req.body;

    if (!nombre || !direccion) {
        return res.status(400).json({ error: 'Son requeridos: nombre, direccion' });
    }
    try {
        const newClinica = await prisma.clinica.create({// se llama prisma para conectar con la db
            data: {
                nombre,
                direccion, 
            }
        });

        res.status(201).json({
            message: 'Nueva clínica creada con éxito',
            clinica: newClinica
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la clínica' });
    }
});

// se hace un post para las medicos
app.post('/medicos', async (req, res) => {
    const { nombre, especialidad,telefono, } = req.body;

    if (!nombre || !especialidad || !telefono) {
        return res.status(400).json({ error: 'Son requeridos: nombre, especialidad, telefono' });
    }
    try {
        const newMedico= await prisma.medicos.create({// se llama prisma para conectar con la db
            data: {
                nombre,
                especialidad, 
                telefono,
            }
        });
   
        res.status(201).json({
            message: 'Nuevo medico creada con éxito',
            medico: newMedico
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el medico' });
    }
});

// se hace un post para las citas

app.post('/cita', async (req, res) => {
  const { id_medico, id_paciente, fecha } = req.body;

  // Validar campos requeridos
  if (!id_medico || !id_paciente || !fecha ) {
    return res.status(400).json({
      error: 'Son requeridos: id_medico, id_paciente, fecha '
    });
  }

  // Validar formato de fecha
  if (!isValidDate(fecha)) {
    return res.status(400).json({
      error: 'La fecha debe estar en formato YYYY-MM-DD'
    });
  }
// Validar existencia de pacientes y medicos
  const medicoExistente = await isValidMedico(id_medico);
  const pacienteExistente = await isValidPaciente(id_paciente);

    if (!medicoExistente) {
    return res.status(404).json({ error: `No existe un médico con ID ${id_medico}` });
  }

  if (!pacienteExistente) {
    return res.status(404).json({ error: `No existe un paciente con ID ${id_paciente}` });
  }

  try {
    // Crear paciente
    const newCita = await prisma.citas.create({
      data: {
        id_medico: parseInt(id_medico),
        id_paciente: parseInt(id_paciente),
        fecha: new Date(fecha),

      }
    });

    return res.status(201).json({
      message: 'Nueva cita creado con éxito',
      cita: newCita
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la cita' });
  }
});

// se hace un post para los pacientes
app.post('/pacientes', async (req, res) => {
  const { nombre, fecha_nacimiento, direccion, telefono, id_clinica } = req.body;

  // Validar campos requeridos
  if (!nombre || !fecha_nacimiento || !direccion || !telefono || !id_clinica) {
    return res.status(400).json({
      error: 'Son requeridos: nombre, fecha_nacimiento, direccion, telefono, id_clinica'
    });
  }

  // Validar formato de fecha
  if (!isValidDate(fecha_nacimiento)) {
    return res.status(400).json({
      error: 'La fecha debe estar en formato YYYY-MM-DD'
    });
  }

const clinicaExistente = await isValidClinica(id_clinica);

    if (!clinicaExistente) {
    return res.status(404).json({ error: `No existe una clinica con ID ${id_clinica }` });
  }

  try {

    // Crear paciente
    const newPaciente = await prisma.pacientes.create({
      data: {
        nombre,
        fecha_nacimiento: new Date(fecha_nacimiento),
        direccion,
        telefono,
        id_clinica: parseInt(id_clinica),
      }
    });

    return res.status(201).json({
      message: 'Nuevo paciente creado con éxito',
      paciente: newPaciente
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el paciente' });
  }
});

// se hace un post para consultas


app.post('/consulta', async (req, res) => {
    const { id_cita, diagnostico } = req.body;

    if (!id_cita || !diagnostico) {
        return res.status(400).json({ error: 'Son requeridos: id_cita, diagnostico ' });
    }

// Validar existencia de citas
    const citaExistente = await isValidCita(id_cita);

    if (!citaExistente) {
    return res.status(404).json({ error: `No existe una cita con ID ${id_cita }` });
  }

    try {
        const newConsulta = await prisma.consultas.create({// se llama prisma para conectar con la db
            data: {
                id_cita: parseInt(id_cita),
                diagnostico, 
            }
        });

        res.status(201).json({
            message: 'Nueva consulta creada con éxito',
            clinica: newConsulta
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la consula' });
    }
});

// se hace un post para tratamientos (maestro y detalles)
app.post('/tratamientos', async (req, res) => {
  const { id_consulta, fecha_inicio, fecha_fin, detalles } = req.body;

  if (!id_consulta || !fecha_inicio || !fecha_fin || !Array.isArray(detalles) || detalles.length === 0) {
    return res.status(400).json({
      error: 'Se requieren id_consulta, fecha_inicio, fecha_fin y al menos un detalle'
    });
  }
    // Validar formato de fecha
  if (!isValidDate(fecha_inicio&&fecha_fin)) {
    return res.status(400).json({
      error: 'La fecha debe estar en formato YYYY-MM-DD'
    });
  }
// verificar si la consulta existe
const consultaExistente = await isValidConsulta(id_consulta);

    if (!consultaExistente) {
    return res.status(404).json({ error: `No existe una consulta con ID ${id_consulta }` });
  }

  try {
    const nuevoTratamiento = await prisma.tratamiento_maestro.create({
      data: {
        id_consulta: parseInt(id_consulta),
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        tratamiento_detalle: {
          create: detalles.map(det => ({
            medicamento: det.medicamento,
            dosis: det.dosis,
            frecuencia: det.frecuencia
          }))
        }
      },
      include: {
        tratamiento_detalle: true
      }
    });

    res.status(201).json({
      message: 'Tratamiento creado con éxito',
      tratamiento: nuevoTratamiento
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar tratamiento' });
  }
});


// se hace un post para la factura(maestra y detalles) 

app.post('/factura', async (req, res) => {
  const { id_paciente, fecha_emision, total, detalle } = req.body;

  if (!id_paciente || !fecha_emision || !total || !detalle || !Array.isArray(detalle) || detalle.length === 0) {
    return res.status(400).json({ error: 'Se requieren id_paciente, fecha_emision, total y al menos un detalle' });
  }

  // Validar existencia de pacientes
  const pacienteExistente = await isValidPaciente(id_paciente);

  if (!pacienteExistente) {
    return res.status(404).json({ error: `No existe un paciente con ID ${id_paciente}` });
  }

  try {

    const newFactura = await prisma.factura_maestro.create({
      data: {
        id_paciente: parseInt(id_paciente),
        fecha_emision: new Date(fecha_emision),
        total: parseFloat(total),
        factura_detalle: {// se meten los campos necesarios para poder crear el factura detalles
          create: detalle.map(d => ({
            descripcion: d.descripcion,
            cantidad: d.cantidad,
            precio_unitario: d.precio_unitario
          }))
        }
      },
      include: {
        factura_detalle: true
      }
    });

    res.status(201).json({
      message: 'Factura creada con éxito',
      factura: newFactura
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la factura' });
  }
});

//fin Endpoints POST
//---------------------------------------------------------
// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor API en http://localhost:${PORT}`);
});
