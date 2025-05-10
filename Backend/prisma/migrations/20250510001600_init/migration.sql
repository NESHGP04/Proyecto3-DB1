-- CreateEnum
CREATE TYPE "estado_citas" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "auditoria_citas" (
    "id" SERIAL NOT NULL,
    "id_cita" INTEGER,
    "accion" TEXT,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditoria_citas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria_consultas" (
    "id" SERIAL NOT NULL,
    "id_consulta" INTEGER,
    "accion" TEXT,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditoria_consultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria_medicos" (
    "id" SERIAL NOT NULL,
    "id_medico" INTEGER,
    "accion" TEXT,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditoria_medicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria_pacientes" (
    "id" SERIAL NOT NULL,
    "id_paciente" INTEGER,
    "accion" TEXT,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditoria_pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bitacora" (
    "id_bitacora" SERIAL NOT NULL,
    "fecha_hora" TIMESTAMP(6),
    "id_usuario" INTEGER,
    "tabla_afectada" VARCHAR(100),
    "operacion" VARCHAR(100),

    CONSTRAINT "bitacora_pkey" PRIMARY KEY ("id_bitacora")
);

-- CreateTable
CREATE TABLE "citas" (
    "id_cita" SERIAL NOT NULL,
    "id_medico" INTEGER,
    "id_paciente" INTEGER,
    "id_clinica" INTEGER,
    "fecha" TIMESTAMP(6),
    "estado" "estado_citas",

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id_cita")
);

-- CreateTable
CREATE TABLE "clinica" (
    "id_clinica" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "direccion" TEXT,

    CONSTRAINT "clinica_pkey" PRIMARY KEY ("id_clinica")
);

-- CreateTable
CREATE TABLE "consultas" (
    "id_consulta" SERIAL NOT NULL,
    "id_cita" INTEGER,
    "diagnostico" TEXT,

    CONSTRAINT "consultas_pkey" PRIMARY KEY ("id_consulta")
);

-- CreateTable
CREATE TABLE "factura_detalle" (
    "id_factura_detalle" SERIAL NOT NULL,
    "id_factura_maestro" INTEGER,
    "descripcion" VARCHAR(255),
    "cantidad" INTEGER,
    "precio_unitario" DECIMAL(10,2),

    CONSTRAINT "factura_detalle_pkey" PRIMARY KEY ("id_factura_detalle")
);

-- CreateTable
CREATE TABLE "factura_maestro" (
    "id_factura_maestro" SERIAL NOT NULL,
    "id_paciente" INTEGER,
    "id_cita" INTEGER,
    "fecha_emision" DATE,
    "total" DECIMAL(10,2),

    CONSTRAINT "factura_maestro_pkey" PRIMARY KEY ("id_factura_maestro")
);

-- CreateTable
CREATE TABLE "medicos" (
    "id_medico" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "especialidad" VARCHAR(100),
    "telefono" VARCHAR(100),

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id_medico")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id_paciente" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "fecha_nacimiento" DATE,
    "direccion" TEXT,
    "telefono" VARCHAR(100),
    "id_clinica" INTEGER NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id_paciente")
);

-- CreateTable
CREATE TABLE "tratamiento_detalle" (
    "id_tratamiento_detalle" SERIAL NOT NULL,
    "id_tratamiento_maestro" INTEGER,
    "medicamento" VARCHAR(100),
    "dosis" VARCHAR(50),
    "frecuencia" VARCHAR(50),

    CONSTRAINT "tratamiento_detalle_pkey" PRIMARY KEY ("id_tratamiento_detalle")
);

-- CreateTable
CREATE TABLE "tratamiento_maestro" (
    "id_tratamiento_maestro" SERIAL NOT NULL,
    "id_consulta" INTEGER,
    "fecha_inicio" DATE,
    "fecha_fin" DATE,

    CONSTRAINT "tratamiento_maestro_pkey" PRIMARY KEY ("id_tratamiento_maestro")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuarios" SERIAL NOT NULL,
    "nombre_usuario" VARCHAR(100),
    "clave_hash" VARCHAR(255),
    "id_clinica" INTEGER,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuarios")
);

-- AddForeignKey
ALTER TABLE "auditoria_citas" ADD CONSTRAINT "auditoria_citas_id_cita_fkey" FOREIGN KEY ("id_cita") REFERENCES "citas"("id_cita") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auditoria_consultas" ADD CONSTRAINT "auditoria_consultas_id_consulta_fkey" FOREIGN KEY ("id_consulta") REFERENCES "consultas"("id_consulta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auditoria_medicos" ADD CONSTRAINT "auditoria_medicos_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "medicos"("id_medico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auditoria_pacientes" ADD CONSTRAINT "auditoria_pacientes_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id_paciente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bitacora" ADD CONSTRAINT "bitacora_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuarios") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "medicos"("id_medico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id_paciente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "clinica"("id_clinica") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_id_cita_fkey" FOREIGN KEY ("id_cita") REFERENCES "citas"("id_cita") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "factura_detalle" ADD CONSTRAINT "factura_detalle_id_factura_maestro_fkey" FOREIGN KEY ("id_factura_maestro") REFERENCES "factura_maestro"("id_factura_maestro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "factura_maestro" ADD CONSTRAINT "factura_maestro_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "pacientes"("id_paciente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "factura_maestro" ADD CONSTRAINT "factura_maestro_id_cita_fkey" FOREIGN KEY ("id_cita") REFERENCES "citas"("id_cita") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "clinica"("id_clinica") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tratamiento_detalle" ADD CONSTRAINT "tratamiento_detalle_id_tratamiento_maestro_fkey" FOREIGN KEY ("id_tratamiento_maestro") REFERENCES "tratamiento_maestro"("id_tratamiento_maestro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tratamiento_maestro" ADD CONSTRAINT "tratamiento_maestro_id_consulta_fkey" FOREIGN KEY ("id_consulta") REFERENCES "consultas"("id_consulta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "clinica"("id_clinica") ON DELETE NO ACTION ON UPDATE NO ACTION;
