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
    const { nombre, especialidad,telefono,id_clinica} = req.body;

    if (!nombre || !especialidad || !telefono ||!id_clinica) {
        return res.status(400).json({ error: 'Son requeridos: nombre, especialidad, telefono' });
    }
    const clinicaExistente = await isValidClinica(id_clinica);

    if (!clinicaExistente) {
    return res.status(404).json({ error: `No existe una clinica con ID ${id_clinica }` });
  }

    try {
        const newMedico= await prisma.medicos.create({// se llama prisma para conectar con la db
            data: {
                nombre,
                especialidad, 
                telefono,
                id_clinica:parseInt(id_clinica),
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

app.post('/citas', async (req, res) => {
  const { id_medico, id_paciente,id_clinica, fecha,estado } = req.body;

  // Validar campos requeridos
  if (!id_medico || !id_paciente || !fecha || !id_clinica) {
    return res.status(400).json({
      error: 'Son requeridos: id_medico, id_paciente, fecha, id_clinica '
    });
  }

  // Validar formato de fecha
  if (!isValidDate(fecha)) {
    return res.status(400).json({
      error: 'La fecha debe estar en formato YYYY-MM-DD'
    });
  }
// Validar existencia de pacientes, clionicas y medicos
  const medicoExistente = await isValidMedico(id_medico);
  const pacienteExistente = await isValidPaciente(id_paciente);
  const clinicaExistente = await isValidClinica(id_clinica);

    if (!clinicaExistente) {
    return res.status(404).json({ error: `No existe una clinica con ID ${id_clinica }` });
  }
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
        id_clinica:parseInt(id_clinica),
        estado:"PENDIENTE"

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


app.post('/consultas', async (req, res) => {
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

app.post('/facturas', async (req, res) => {
  const { id_paciente, fecha_emision, total,id_cita, detalle } = req.body;

  if (!id_paciente || !fecha_emision || !total||!id_cita || !detalle || !Array.isArray(detalle) || detalle.length === 0) {
    return res.status(400).json({ error: 'Se requieren id_paciente, fecha_emision, total y al menos un detalle' });
  }

  // Validar existencia de pacientes
  const pacienteExistente = await isValidPaciente(id_paciente);

  if (!pacienteExistente) {
    return res.status(404).json({ error: `No existe un paciente con ID ${id_paciente}` });
  }
    const citaExistente = await isValidCita(id_cita);

    if (!citaExistente) {
    return res.status(404).json({ error: `No existe una cita con ID ${id_cita }` });
  }

  try {

    const newFactura = await prisma.factura_maestro.create({
      data: {
        id_paciente: parseInt(id_paciente),
        fecha_emision: new Date(fecha_emision),
        total: parseFloat(total),
        id_cita: parseInt(id_cita),
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
// Se inician los Enpoints GET que llaman a todos los elementos  existentes

//Se obtienen las clionicas 
app.get('/clinicas', async (req, res) => {
    try {
        const clinicas = await prisma.clinica.findMany();// se llama prisma para conectar con la db

        res.json(clinicas);// se devuelve como json 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las clinicas' });
    }
});

//Se obtienen los medicos 
app.get('/medicos', async (req, res) => {
    try {
        const medicos = await prisma.medicos.findMany();// se llama prisma para conectar con la db

        res.json(medicos);// se devuelve como json 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los medicos' });
    }
});

//Se obtienen los pacientes 
app.get('/pacientes', async (req, res) => {
    try {
        const pacientes = await prisma.pacientes.findMany();// se llama prisma para conectar con la db

        res.json(pacientes);// se devuelve como json 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pacientes' });
    }
});

//Se obtienen los citas 
app.get('/citas', async (req, res) => {
    try {
        const citas = await prisma.citas.findMany();// se llama prisma para conectar con la db

        res.json(citas);// se devuelve como json 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
});

//Se obtienen las consultas 
app.get('/consultas', async (req, res) => {
    try {
        const consultas = await prisma.consultas.findMany();// se llama prisma para conectar con la db

        res.json(consultas);// se devuelve como json 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las consultas' });
    }
});

//Se obtienen los tratamientos 
app.get('/tratamientos', async (req, res) => {
  try {
    const tratamientos = await prisma.tratamiento_maestro.findMany({
      include: {
        tratamiento_detalle: true  // incluir todos los detalles relacionados
      }
    });

    res.json(tratamientos); // se devuelve como json 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los tratamientos' });
  }
});

//Se obtienen las facturas 
app.get('/facturas', async (req, res) => {
  try {
    const facturas = await prisma.factura_maestro.findMany({
      include: {
        factura_detalle: true  // incluir todos los detalles relacionados
      }
    });

    res.json(facturas); // se devuelve como json 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las facturas' });
  }
})
//fin Endpoints GET
//---------------------------------------------------------
// Se inician los Enpoints GET que llaman a todos los elementos especificos (GET by ID)
//Se obtienen las clinicas por medio del id
app.get('/clinicas/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const clinica = await prisma.clinica.findUnique({//se llama prisma para conectar con la db
            where: { id_clinica: id }// se indica que se busca por medio del id
        });

        if (!clinica) {
            return res.status(404).json({ error: 'clinica no encontrada' });// indica que el id no se  ha encontrado
        }

        res.json(clinica);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar la clinica' });
    }
});

//Se obtienen los medicos por medio del id
app.get('/medicos/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const medico = await prisma.medicos.findUnique({//se llama prisma para conectar con la db
            where: { id_medico: id }// se indica que se busca por medio del id
        });

        if (!medico) {
            return res.status(404).json({ error: 'medico no encontrada' });// indica que el id no se  ha encontrado
        }

        res.json(medico);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar el medico' });
    }
});

//Se obtienen los pacientes por medio del id
app.get('/pacientes/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const paciente = await prisma.pacientes.findUnique({//se llama prisma para conectar con la db
            where: { id_paciente: id }// se indica que se busca por medio del id
        });

        if (!paciente) {
            return res.status(404).json({ error: 'paciente no encontrada' });// indica que el id no se  ha encontrado
        }

        res.json(paciente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar el paciente' });
    }
});

//Se obtienen las citas por medio del id
app.get('/citas/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const cita = await prisma.citas.findUnique({//se llama prisma para conectar con la db
            where: { id_cita: id }// se indica que se busca por medio del id
        });

        if (!cita) {
            return res.status(404).json({ error: 'cita no encontrada' });// indica que el id no se  ha encontrado
        }

        res.json( cita);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar la cita' });
    }
});

//Se obtienen las consultas por medio del id
app.get('/consultas/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const consulta = await prisma.consultas.findUnique({//se llama prisma para conectar con la db
            where: { id_consulta: id }// se indica que se busca por medio del id
        });

        if (!consulta) {
            return res.status(404).json({ error: 'consulta no encontrada' });// indica que el id no se  ha encontrado
        }

        res.json( consulta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar la consulta' });
    }
});

//Se obtienen las facturas por medio del id
app.get('/facturas/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const factura = await prisma.factura_maestro.findUnique({
      where: { id_factura_maestro: id },
      include: {
        factura_detalle: true // incluir todos los detalles relacionados
      }
    });

    if (!factura) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    res.json(factura);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar la factura' });
  }
});

//Se obtienen los tratamientos por medio del id
app.get('/tratamientos/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const tratamiento = await prisma.tratamiento_maestro.findUnique({
      where: { id_tratamiento_maestro: id },
      include: {
        tratamiento_detalle: true // incluir todos los detalles relacionados
      }
    });

    if (!tratamiento) {
      return res.status(404).json({ error: 'tratamiento no encontrada' });
    }

    res.json(tratamiento);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar el tratamiento' });
  }
});
//fin Endpoints GET by ID
//---------------------------------------------------------


// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor API en http://localhost:${PORT}`);
});
