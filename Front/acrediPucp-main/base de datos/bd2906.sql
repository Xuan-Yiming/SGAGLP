-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: acredipucp2-bd.cw5k214min6e.us-east-1.rds.amazonaws.com    Database: acredipucp2
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Actividad`
--

DROP TABLE IF EXISTS `Actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Actividad` (
  `idActividad` int NOT NULL AUTO_INCREMENT,
  `fidPropuesta` int NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `fidEstado` int NOT NULL,
  `evidencia` varchar(200) DEFAULT NULL,
  `responsable` varchar(200) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  `codigo` varchar(45) NOT NULL,
  `fidResponsable` int DEFAULT NULL,
  PRIMARY KEY (`idActividad`),
  KEY `fk_Actividad_Propuesta1_idx` (`fidPropuesta`),
  KEY `fk_Actividad_EstadoPlan_idx` (`fidEstado`),
  KEY `fk_Actividad_Responsable_idx` (`fidResponsable`),
  CONSTRAINT `fk_Actividad_Estado` FOREIGN KEY (`fidEstado`) REFERENCES `EstadoPlan` (`idEstadoPlan`),
  CONSTRAINT `fk_Actividad_Propuesta` FOREIGN KEY (`fidPropuesta`) REFERENCES `Propuesta` (`idPropuesta`),
  CONSTRAINT `fk_Actividad_Responsable` FOREIGN KEY (`fidResponsable`) REFERENCES `Usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `actualizarEstadoActividad` BEFORE UPDATE ON `Actividad` FOR EACH ROW BEGIN
	IF OLD.fidEstado = 1 AND NEW.fidEstado = 2 THEN
        SET NEW.fechaInicio = SYSDATE();
    END IF;
    IF OLD.fidEstado = 2 AND NEW.fidEstado = 1 THEN
        SET NEW.fechaInicio = null;
    END IF;
    IF OLD.fidEstado = 2 AND NEW.fidEstado = 3 THEN
        SET NEW.fechaFin = SYSDATE();
    END IF;
    IF OLD.fidEstado = 3 AND NEW.fidEstado = 2 THEN
        SET NEW.fechaFin = null;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Alumno`
--

DROP TABLE IF EXISTS `Alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Alumno` (
  `idAlumno` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idAlumno`)
) ENGINE=InnoDB AUTO_INCREMENT=341 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `AlumnosMuestra`
--

DROP TABLE IF EXISTS `AlumnosMuestra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AlumnosMuestra` (
  `idAlumnosMuestra` int NOT NULL AUTO_INCREMENT,
  `fidAlumno` int NOT NULL,
  `fidMuestraMedicion` int NOT NULL,
  `resultados` varchar(400) NOT NULL DEFAULT '"00000000000000000000000000000000000000000000000000000000000000000000"',
  `fechaCreacion` datetime NOT NULL,
  `fechamodificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idAlumnosMuestra`),
  KEY `fk_AlumnosMuestra_Alumno1_idx` (`fidAlumno`),
  KEY `fk_AlumnosMuestra_MuestraMedicion1_idx` (`fidMuestraMedicion`),
  CONSTRAINT `fk_AlumnosMuestra_Alumno1` FOREIGN KEY (`fidAlumno`) REFERENCES `Alumno` (`idAlumno`),
  CONSTRAINT `fk_AlumnosMuestra_MuestraMedicion1` FOREIGN KEY (`fidMuestraMedicion`) REFERENCES `MuestraMedicion` (`idMuestraMedicion`)
) ENGINE=InnoDB AUTO_INCREMENT=1075 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `ActualizarNumeroAlumnosTrigger` AFTER INSERT ON `AlumnosMuestra` FOR EACH ROW BEGIN
	call CalcularNumeroAlumnos(NEW.fidMuestraMedicion);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `ActualizarNumeroAlumnosTriggerUpdate` AFTER UPDATE ON `AlumnosMuestra` FOR EACH ROW BEGIN
	#Este trigger es para cuando desactives o vuelvas a activar un alumno
    IF NEW.activo <> OLD.activo THEN
		call CalcularNumeroAlumnos(NEW.fidMuestraMedicion);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `CodigosRecuperarContrasenia`
--

DROP TABLE IF EXISTS `CodigosRecuperarContrasenia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CodigosRecuperarContrasenia` (
  `idCodigosRecuperarContrasenia` int NOT NULL AUTO_INCREMENT,
  `fidUsuario` int NOT NULL,
  `codigo` varchar(100) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  PRIMARY KEY (`idCodigosRecuperarContrasenia`),
  KEY `fk_CodigoRecuperarContrasenia_Usuario_idx` (`fidUsuario`),
  CONSTRAINT `fk_CodigoRecuperarContrasenia_Usuario` FOREIGN KEY (`fidUsuario`) REFERENCES `Usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Competencia`
--

DROP TABLE IF EXISTS `Competencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Competencia` (
  `idCompetencia` int NOT NULL AUTO_INCREMENT,
  `fidEspecialidad` int NOT NULL,
  `fidObjetivoEducacional` int DEFAULT NULL,
  `descripcion` varchar(200) NOT NULL,
  `codigoCompetencia` varchar(45) NOT NULL,
  `evidencia` varchar(200) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idCompetencia`),
  KEY `fk_CompetenciaObjetivoEducacional_idx` (`fidObjetivoEducacional`),
  KEY `fk_CompetenciaEspecialidad_idx` (`fidEspecialidad`),
  CONSTRAINT `fk_CompetenciaEspecialidad` FOREIGN KEY (`fidEspecialidad`) REFERENCES `Especialidad` (`idEspecialidad`),
  CONSTRAINT `fk_CompetenciaObjetivoEducacional` FOREIGN KEY (`fidObjetivoEducacional`) REFERENCES `ObjetivoEducacional` (`idObjetivoEducacional`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CompetenciaXMuestra`
--

DROP TABLE IF EXISTS `CompetenciaXMuestra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CompetenciaXMuestra` (
  `idCompetenciaXMuestra` int NOT NULL AUTO_INCREMENT,
  `fidCompetencia` int NOT NULL,
  `fidMuestraMedicion` int NOT NULL,
  `evidenciaEnviada` tinyint(1) NOT NULL,
  `fidIndicador` int NOT NULL,
  PRIMARY KEY (`idCompetenciaXMuestra`),
  KEY `fk_CompetenciaXMuestra_Competencia1_idx` (`fidCompetencia`),
  KEY `fk_CompetenciaXMuestra_MuestraMedicion1_idx` (`fidMuestraMedicion`),
  CONSTRAINT `fk_CompetenciaXMuestra_Competencia1` FOREIGN KEY (`fidCompetencia`) REFERENCES `Competencia` (`idCompetencia`),
  CONSTRAINT `fk_CompetenciaXMuestra_MuestraMedicion1` FOREIGN KEY (`fidMuestraMedicion`) REFERENCES `MuestraMedicion` (`idMuestraMedicion`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DetalleCompetenciaXMuestra`
--

DROP TABLE IF EXISTS `DetalleCompetenciaXMuestra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetalleCompetenciaXMuestra` (
  `idDetalleCompetenciaXMuestra` int NOT NULL AUTO_INCREMENT,
  `fidCompetenciaXMuestra` int NOT NULL,
  `rutaEvidencia` varchar(400) DEFAULT NULL,
  `activo` tinyint NOT NULL,
  PRIMARY KEY (`idDetalleCompetenciaXMuestra`),
  KEY `FK_DETALLECOMPETENCIAMUESTRA_COMPETENCIAMUESTRA_idx` (`fidCompetenciaXMuestra`),
  CONSTRAINT `FK_DETALLECOMPETENCIAMUESTRA_COMPETENCIAMUESTRA` FOREIGN KEY (`fidCompetenciaXMuestra`) REFERENCES `CompetenciaXMuestra` (`idCompetenciaXMuestra`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DetalleEvidenciaActividad`
--

DROP TABLE IF EXISTS `DetalleEvidenciaActividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetalleEvidenciaActividad` (
  `idDetalleEvidenciaActividad` int NOT NULL AUTO_INCREMENT,
  `fidActividad` int NOT NULL,
  `rutaEvidenciaActividad` varchar(400) DEFAULT NULL,
  `activo` tinyint NOT NULL,
  PRIMARY KEY (`idDetalleEvidenciaActividad`),
  KEY `FK_DetalleEvidenciaActividad_idx` (`fidActividad`),
  CONSTRAINT `FK_DetalleEvidenciaActividad` FOREIGN KEY (`fidActividad`) REFERENCES `Actividad` (`idActividad`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EspacioMedicion`
--

DROP TABLE IF EXISTS `EspacioMedicion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EspacioMedicion` (
  `idEspacioMedicion` int NOT NULL AUTO_INCREMENT,
  `fidMedicion` int NOT NULL,
  `fidCicloAcademico` int NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `nombreCurso` varchar(50) NOT NULL,
  `fechaLimite` date DEFAULT NULL,
  `tipoMedicion` varchar(10) NOT NULL,
  `indicadoresConfigurados` tinyint(1) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idEspacioMedicion`),
  KEY `fidMedicion` (`fidMedicion`),
  KEY `fk_EspacioMedicion_CicloAcademico_idx` (`fidCicloAcademico`),
  CONSTRAINT `fk_EspacioMedicion_CicloAcademico` FOREIGN KEY (`fidCicloAcademico`) REFERENCES `cicloAcademico` (`idcicloAcademico`) ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=300 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EspacioXIndicador`
--

DROP TABLE IF EXISTS `EspacioXIndicador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EspacioXIndicador` (
  `idEspacioXIndicador` int NOT NULL AUTO_INCREMENT,
  `fidIndicador` int NOT NULL,
  `fidEspacioMedicion` int NOT NULL,
  `UsuarioCreacion` varchar(100) DEFAULT NULL,
  `FechaCreacion` datetime DEFAULT NULL,
  `UsuarioModificacion` varchar(100) DEFAULT NULL,
  `FechaModificacion` datetime DEFAULT NULL,
  `UsuarioAnulacion` varchar(100) DEFAULT NULL,
  `FechaAnulacion` datetime DEFAULT NULL,
  `activo` varchar(45) NOT NULL,
  `evidencia` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`idEspacioXIndicador`),
  KEY `fk_indicador_espacio_idx` (`fidIndicador`),
  KEY `fk_espacio_indxesp_idx` (`fidEspacioMedicion`),
  CONSTRAINT `fk_espacio_indxesp` FOREIGN KEY (`fidEspacioMedicion`) REFERENCES `EspacioMedicion` (`idEspacioMedicion`),
  CONSTRAINT `fk_indicador_indxesp` FOREIGN KEY (`fidIndicador`) REFERENCES `Indicador` (`idIndicador`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Especialidad`
--

DROP TABLE IF EXISTS `Especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Especialidad` (
  `idEspecialidad` int NOT NULL AUTO_INCREMENT,
  `fidFacultad` int NOT NULL,
  `codigoEspecialidad` varchar(10) NOT NULL,
  `nombreEspecialidad` varchar(60) NOT NULL,
  `correo` varchar(200) DEFAULT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  `idNivel` int DEFAULT NULL,
  PRIMARY KEY (`idEspecialidad`),
  KEY `fk_Especialidad_Facultad1_idx` (`fidFacultad`),
  KEY `fk_Nivel_idx` (`idNivel`),
  CONSTRAINT `fk_Especialidad_Facultad` FOREIGN KEY (`fidFacultad`) REFERENCES `Facultad` (`idFacultad`),
  CONSTRAINT `fk_Nivel` FOREIGN KEY (`idNivel`) REFERENCES `Parametros` (`idParametro`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EstadoPlan`
--

DROP TABLE IF EXISTS `EstadoPlan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EstadoPlan` (
  `idEstadoPlan` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idEstadoPlan`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Facultad`
--

DROP TABLE IF EXISTS `Facultad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Facultad` (
  `idFacultad` int NOT NULL AUTO_INCREMENT,
  `codigoFacultad` varchar(10) NOT NULL,
  `nombreFacultad` varchar(60) NOT NULL,
  `correo` varchar(200) DEFAULT NULL,
  `tieneEspecialidad` tinyint(1) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `idCreacion` int DEFAULT NULL,
  `idModificacion` int DEFAULT NULL,
  `idAnulacion` int DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idFacultad`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Indicador`
--

DROP TABLE IF EXISTS `Indicador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Indicador` (
  `idIndicador` int NOT NULL AUTO_INCREMENT,
  `fidCompetencia` int NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `niveles` int NOT NULL,
  `minimoAprobatorio` double NOT NULL,
  `porcentajeMinimo` double NOT NULL,
  `codigo` varchar(45) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idIndicador`),
  KEY `idCompetencia_idx` (`fidCompetencia`),
  CONSTRAINT `fk_Competencia` FOREIGN KEY (`fidCompetencia`) REFERENCES `Competencia` (`idCompetencia`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `IndicadorXMuestra`
--

DROP TABLE IF EXISTS `IndicadorXMuestra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IndicadorXMuestra` (
  `idIndicadorXMuestraMedicion` int NOT NULL AUTO_INCREMENT,
  `fidIndicador` int NOT NULL,
  `fidMuestraMedicion` int NOT NULL,
  `posicionResultado` int DEFAULT '0',
  `totalResultados` int DEFAULT '0',
  `promedio` decimal(6,2) DEFAULT '0.00',
  `porcentaje` decimal(6,2) DEFAULT '0.00',
  `totalesCumplidos` int DEFAULT '0',
  `numeroAlumnos` int DEFAULT '0',
  `usuarioCreacion` varchar(200) NOT NULL,
  `usuarioModificacion` varchar(200) DEFAULT NULL,
  `usuarioAnulacion` varchar(200) DEFAULT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  `evidencia` varchar(400) DEFAULT NULL,
  `fidParametroEnviado` int DEFAULT NULL,
  PRIMARY KEY (`idIndicadorXMuestraMedicion`),
  KEY `FK_IndicadorEspacioXMuestraMedicion_MuestraMedicion_idx` (`fidMuestraMedicion`),
  KEY `fk_IndicadorEspacioXMuestraMedicion_Indicador1_idx` (`fidIndicador`),
  KEY `fk_IndicadorXMuestraXParametros_idx` (`fidParametroEnviado`),
  CONSTRAINT `fk_IndicadorEspacioXMuestraMedicion_Indicador1` FOREIGN KEY (`fidIndicador`) REFERENCES `Indicador` (`idIndicador`),
  CONSTRAINT `FK_IndicadorEspacioXMuestraMedicion_MuestraMedicion` FOREIGN KEY (`fidMuestraMedicion`) REFERENCES `MuestraMedicion` (`idMuestraMedicion`),
  CONSTRAINT `fk_IndicadorXMuestraXParametros` FOREIGN KEY (`fidParametroEnviado`) REFERENCES `Parametros` (`idParametro`)
) ENGINE=InnoDB AUTO_INCREMENT=1058 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Logs`
--

DROP TABLE IF EXISTS `Logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `level` varchar(16) NOT NULL,
  `message` varchar(2048) NOT NULL,
  `meta` varchar(2048) NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=238562 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Medicion`
--

DROP TABLE IF EXISTS `Medicion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Medicion` (
  `idMedicion` int NOT NULL AUTO_INCREMENT,
  `fidEspecialidad` int NOT NULL,
  `fidCicloInicio` int NOT NULL,
  `fidCicloFin` int NOT NULL,
  `fidParametro` int DEFAULT NULL,
  `codigo` varchar(10) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `completada` tinyint(1) NOT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idMedicion`),
  KEY `fk_Medicion_Especialidad1_idx` (`fidEspecialidad`),
  KEY `fk_Medicion_cicloAcademico1_idx` (`fidCicloInicio`),
  KEY `fk_Medicion_cicloAcademico2_idx` (`fidCicloFin`),
  KEY `fk_Medicion_Parametro_idx` (`fidParametro`),
  CONSTRAINT `fk_Medicion_cicloAcademico1` FOREIGN KEY (`fidCicloInicio`) REFERENCES `cicloAcademico` (`idcicloAcademico`) ON UPDATE RESTRICT,
  CONSTRAINT `fk_Medicion_cicloAcademico2` FOREIGN KEY (`fidCicloFin`) REFERENCES `cicloAcademico` (`idcicloAcademico`) ON UPDATE RESTRICT,
  CONSTRAINT `fk_Medicion_Especialidad1` FOREIGN KEY (`fidEspecialidad`) REFERENCES `Especialidad` (`idEspecialidad`),
  CONSTRAINT `fk_Medicion_Parametro` FOREIGN KEY (`fidParametro`) REFERENCES `Parametros` (`idParametro`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MuestraMedicion`
--

DROP TABLE IF EXISTS `MuestraMedicion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MuestraMedicion` (
  `idMuestraMedicion` int NOT NULL AUTO_INCREMENT,
  `fidEspacioMedicion` int NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `enviado` tinyint(1) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechamodificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idMuestraMedicion`),
  KEY `fidEspacioMedicion` (`fidEspacioMedicion`),
  CONSTRAINT `fk_Muestra_Espacio` FOREIGN KEY (`fidEspacioMedicion`) REFERENCES `EspacioMedicion` (`idEspacioMedicion`)
) ENGINE=InnoDB AUTO_INCREMENT=486 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ObjetivoEducacional`
--

DROP TABLE IF EXISTS `ObjetivoEducacional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ObjetivoEducacional` (
  `idObjetivoEducacional` int NOT NULL AUTO_INCREMENT,
  `fidEspecialidad` int NOT NULL,
  `sumilla` varchar(130) DEFAULT NULL,
  `descripcion` varchar(300) NOT NULL,
  `codigoObjetivo` varchar(45) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idObjetivoEducacional`),
  KEY `fk_Objetivo_Especialidad_idx` (`fidEspecialidad`),
  CONSTRAINT `fk_Objetivo_Especialidad` FOREIGN KEY (`fidEspecialidad`) REFERENCES `Especialidad` (`idEspecialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Parametros`
--

DROP TABLE IF EXISTS `Parametros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Parametros` (
  `idParametro` int NOT NULL AUTO_INCREMENT,
  `niveles` varchar(2) NOT NULL,
  `minimoAprobatorio` varchar(2) NOT NULL,
  `porcentajeMinimo` double NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idParametro`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Perfil`
--

DROP TABLE IF EXISTS `Perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Perfil` (
  `idPerfil` int NOT NULL AUTO_INCREMENT,
  `fidUsuario` int NOT NULL,
  `nivelAcceso` int NOT NULL,
  `fidFacultad` int DEFAULT NULL,
  `fidEspecialidad` int DEFAULT NULL,
  `fidMuestra` int DEFAULT NULL,
  `esAsistente` int NOT NULL,
  `nombrePerfil` varchar(60) NOT NULL,
  `esAdministrador` tinyint(1) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `esAuditor` tinyint(1) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idPerfil`),
  KEY `fk_Perfil_Usuario1_idx` (`fidUsuario`),
  KEY `fk_Perfil_Facultad_idx` (`fidFacultad`),
  KEY `fk_Perfil_Especialidad_idx` (`fidEspecialidad`),
  KEY `fk_Perfil_Muestra_idx` (`fidMuestra`),
  CONSTRAINT `fk_Perfil_Especialidad` FOREIGN KEY (`fidEspecialidad`) REFERENCES `Especialidad` (`idEspecialidad`),
  CONSTRAINT `fk_Perfil_Facultad` FOREIGN KEY (`fidFacultad`) REFERENCES `Facultad` (`idFacultad`),
  CONSTRAINT `fk_Perfil_Muestra` FOREIGN KEY (`fidMuestra`) REFERENCES `MuestraMedicion` (`idMuestraMedicion`),
  CONSTRAINT `fk_Perfil_Usuario` FOREIGN KEY (`fidUsuario`) REFERENCES `Usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12396 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PlanMejora`
--

DROP TABLE IF EXISTS `PlanMejora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PlanMejora` (
  `idPlanMejora` int NOT NULL AUTO_INCREMENT,
  `fidEspecialidad` int NOT NULL,
  `fidEstado` int DEFAULT NULL,
  `codigo` varchar(45) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idPlanMejora`),
  KEY `fk_PlanMejora_Especialidad1_idx` (`fidEspecialidad`),
  KEY `fk_EstadoPlan_idx` (`fidEstado`),
  CONSTRAINT `fk_EstadoPlan` FOREIGN KEY (`fidEstado`) REFERENCES `EstadoPlan` (`idEstadoPlan`),
  CONSTRAINT `fk_PlanMejora_Especialidad` FOREIGN KEY (`fidEspecialidad`) REFERENCES `Especialidad` (`idEspecialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Propuesta`
--

DROP TABLE IF EXISTS `Propuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Propuesta` (
  `idPropuesta` int NOT NULL AUTO_INCREMENT,
  `fidPlanMejora` int NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `codigo` varchar(45) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idPropuesta`),
  KEY `fk_Propuesta_PlanMejora1_idx` (`fidPlanMejora`),
  CONSTRAINT `fk_Propuesta_PlanMejora` FOREIGN KEY (`fidPlanMejora`) REFERENCES `PlanMejora` (`idPlanMejora`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Rubrica`
--

DROP TABLE IF EXISTS `Rubrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rubrica` (
  `idRubrica` int NOT NULL AUTO_INCREMENT,
  `fidIndicador` int NOT NULL,
  `nivel` int NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idRubrica`),
  KEY `idIndicador_idx` (`fidIndicador`),
  CONSTRAINT `idIndicador` FOREIGN KEY (`fidIndicador`) REFERENCES `Indicador` (`idIndicador`)
) ENGINE=InnoDB AUTO_INCREMENT=2271 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `codigoPUCP` varchar(20) DEFAULT NULL,
  `apellidoPaterno` varchar(60) NOT NULL,
  `apellidoMaterno` varchar(60) DEFAULT NULL,
  `nombres` varchar(60) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `correo2` varchar(200) DEFAULT NULL,
  `celular` varchar(10) DEFAULT NULL,
  `contrasenia` varchar(200) NOT NULL,
  `rutaFoto` varchar(400) DEFAULT NULL,
  `fechaCreacion` datetime NOT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) NOT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  UNIQUE KEY `codigoPUCP_UNIQUE` (`codigoPUCP`)
) ENGINE=InnoDB AUTO_INCREMENT=435 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cicloAcademico`
--

DROP TABLE IF EXISTS `cicloAcademico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cicloAcademico` (
  `idcicloAcademico` int NOT NULL AUTO_INCREMENT,
  `anio` varchar(4) NOT NULL,
  `semestre` varchar(1) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `fechaCreacion` datetime DEFAULT NULL,
  `fechaModificacion` datetime DEFAULT NULL,
  `fechaAnulacion` datetime DEFAULT NULL,
  `usuarioCreacion` varchar(100) DEFAULT NULL,
  `usuarioModificacion` varchar(100) DEFAULT NULL,
  `usuarioAnulacion` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idcicloAcademico`)
) ENGINE=InnoDB AUTO_INCREMENT=23001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'acredipucp2'
--

--
-- Dumping routines for database 'acredipucp2'
--
/*!50003 DROP PROCEDURE IF EXISTS `ActivarEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ActivarEspecialidad`(
	in _idEsp int,
    in _fecha1 datetime,
    in _fecha2 datetime
)
begin
	update Especialidad set activo=1 where idEspecialidad = _idEsp and fechaAnulacion > _fecha1 and fechaAnulacion < _fecha2;
    update Medicion set activo=1 where fidEspecialidad = _idEsp and fechaAnulacion > _fecha1 and fechaAnulacion < _fecha2;
    #ya no verifica, solo le das un rango de datetimes pequenio
    update Perfil set activo =1 where fechaAnulacion > _fecha1 and fechaAnulacion < _fecha2 and idPerfil>=1;
    update Medicion set activo =1 where fechaAnulacion > _fecha1 and fechaAnulacion < _fecha2 and idMedicion>=1; 
    update EspacioMedicion set activo =1 where fechaAnulacion > _fecha1 and fechaAnulacion < _fecha2 and idEspacioMedicion>=1; 
    update MuestraMedicion set activo =1 where fechaAnulacion > _fecha1 and fechaAnulacion < _fecha2 and idMuestraMedicion>=1; 
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizaidUsuarioTablaTemporal` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ActualizaidUsuarioTablaTemporal`(
    in i int,
    in _idUsuario int
)
begin
	update tempCargaMasiva set fidUsuario=_idUsuario where idTemp=i;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarDatosAlumnos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ActualizarDatosAlumnos`()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE total_rows INT;
    DECLARE current_value INT;
    DECLARE _usuario VARCHAR(100);
	DECLARE _idAlumno INT;
    DECLARE _idAlumno2 INT;
    SET total_rows = (SELECT COUNT(*) FROM temp_Alumno);
    SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario inner join temp_Alumno on idUsuario=idUsuarioCreacion where idTemp=1);
    WHILE i <= total_rows DO
		set _idAlumno = (select ifnull((select a.idAlumno from Alumno a inner join temp_Alumno t on a.codigo=t.codigo where a.activo=1 and t.idTemp=i),"0") as result);
		if _idAlumno = 0 then
			INSERT INTO Alumno(idAlumno,codigo,nombre,fechaCreacion,usuarioCreacion,activo) 
			SELECT idAlumno, codigo, nombre, now(),_usuario,1 from temp_Alumno where idTemp=i;
			set _idAlumno=@@last_insert_id;
			INSERT INTO AlumnosMuestra(fidAlumno,fidMuestraMedicion,resultados,fechaCreacion,usuarioCreacion,activo)
			SELECT _idAlumno,fidMuestraMedicion,"000000000000000000000000000000000000000000000000000000",now(),_usuario,1 from temp_Alumno where idTemp=i;
		else
			set _idAlumno2 = (select ifnull((select a.fidAlumno from AlumnosMuestra a inner join temp_Alumno t on a.fidMuestraMedicion=t.fidMuestraMedicion where a.activo=1 and  a.fidMuestraMedicion=t.fidMuestraMedicion and a.fidAlumno=_idAlumno and t.idTemp=i),"0") as result);
			if _idAlumno2 = 0 then
				INSERT INTO AlumnosMuestra(fidAlumno,fidMuestraMedicion,resultados,fechaCreacion,usuarioCreacion,activo)
				SELECT _idAlumno,fidMuestraMedicion,"000000000000000000000000000000000000000000000000000000",now(),_usuario,1 from temp_Alumno where idTemp=i;
			end if;
        end if;
        SET i = i + 1;
    END WHILE;
    select true as t;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarDatosTabla` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ActualizarDatosTabla`()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE total_rows INT;
    DECLARE current_value INT;
    DECLARE _idCiclo INT;
	DECLARE _idUsuario INT;
    DECLARE _usuario VARCHAR(200);
    DECLARE _idEspacio INT;
    DECLARE _idMuestra INT;
     DECLARE _idMedicion INT;
    DECLARE asignada INT;
    DECLARE asignada2 INT;
    DECLARE _idIndicar INT;
    DECLARE _evaluar VARCHAR(10);
    DECLARE _evaluar2 VARCHAR(10);
    DECLARE _evaluar3 VARCHAR(10);
    DECLARE _evaind VARCHAR(10);
    SET total_rows = (SELECT COUNT(*) FROM temp_Med);
	SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario inner join temp_Med on idUsuario=idUsuarioCreacion where idTemp=1);
	INSERT INTO Medicion (fidEspecialidad,fidCicloInicio,fidCicloFin,codigo,usuarioCreacion,fechaCreacion,completada,activo)
	SELECT fidEspecialidad,cicloInicio,cicloFin,codigoMedicion,_usuario,now(),0,1 FROM temp_Med  where idTemp=1;
    SET _idMedicion = @@last_insert_id;
	SET _evaluar = (SELECT codigo FROM temp_Med where idTemp=1);
    IF _evaluar != '' then
    WHILE i <= total_rows DO
		SET _idUsuario = (select ifnull( (select idUsuario from Usuario inner join temp_Med on codigoPUCP=codDocente where idTemp=i ),"0") as result);
		SET _idCiclo = (select idcicloAcademico from cicloAcademico inner join temp_Med on nombre=periodo where idTemp=i );
        SET _idIndicar = (select ifnull( (select fidIndicador from temp_Med where idTemp=i ),"0") as result);
        UPDATE temp_Med
		SET idMedicion=_idMedicion,activo=1,esAuditor=0,esAdministrador=0,nivelAcceso=3,esAsistente=0,nombrePerfil="Responsable de Medición",
        fidUsuario = _idUsuario,fidCicloAcademico=_idCiclo, tipoMedicion="Directa", indicadoresConfigurados=0,
        fechaCreacion=now(), usuarioCreacion= _usuario where idTemp=i; 
        SET _idEspacio = (select ifnull((select distinct e.idEspacioMedicion from EspacioMedicion e inner join temp_Med t on  e.fidMedicion=t.idMedicion where e.codigo=t.codigo  and e.fidCicloAcademico=t.fidCicloAcademico and t.idTemp=i),"0") as result);
        UPDATE temp_Med SET idEspacioMedicion=_idEspacio where idTemp=i;
       if _idEspacio=0 then
			INSERT INTO EspacioMedicion(fidMedicion,fidCicloAcademico,codigo,nombreCurso,
			fechaLimite,tipoMedicion,fechaCreacion,usuarioCreacion,activo)
			SELECT  idMedicion,fidCicloAcademico,codigo,nombreCurso,fechaLimite,tipoMedicion,
			fechaCreacion,usuarioCreacion,activo FROM temp_Med where idTemp=i;
			SET _idEspacio = @@last_insert_id;
			UPDATE temp_Med SET idEspacioMedicion=_idEspacio where idTemp=i;
            SET _evaluar3 = (SELECT fidIndicador FROM temp_Med where idTemp=i);
			SET _evaluar2 = (SELECT horario FROM temp_Med where idTemp=i);
            if _evaluar2 !='' then
				INSERT INTO MuestraMedicion (fidEspacioMedicion,codigo,enviado,fechaCreacion,usuarioCreacion,activo)
				SELECT  idEspacioMedicion,horario,0,now(),usuarioCreacion,activo FROM temp_Med where idTemp=i;
				SET _idMuestra = @@last_insert_id;
				UPDATE temp_Med SET fidMuestra=_idMuestra where idTemp=i; 
				INSERT INTO Perfil (fidUsuario,nivelAcceso,fidMuestra,esAsistente,nombrePerfil,esAdministrador,fechaCreacion,usuarioCreacion,esAuditor,activo)
				SELECT fidUsuario,nivelAcceso,_idMuestra,esAsistente,nombrePerfil,esAdministrador,now(),usuarioCreacion,esAuditor,activo FROM temp_Med where idTemp=i;
				if _evaluar3 != 0 then
					INSERT INTO IndicadorXMuestra (fidIndicador,fidMuestraMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
					SELECT fidIndicador,_idMuestra,evidencia,usuarioCreacion,now(),activo FROM temp_Med where idTemp=i;
					call ActualizarPosicionIndicadorMuestra(_idMuestra,_idIndicar);
                    UPDATE EspacioMedicion SET indicadoresConfigurados=1 where idEspacioMedicion=_idEspacio;
				end if;
            end if;
            if _evaluar3 != 0 then
            INSERT INTO EspacioXIndicador (fidIndicador,fidEspacioMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
            SELECT fidIndicador,_idEspacio,evidencia,usuarioCreacion,now(),activo FROM temp_Med where idTemp=i;
            UPDATE EspacioMedicion SET indicadoresConfigurados=1 where idEspacioMedicion=_idEspacio;
            end if;
        else 
			SET _evaluar2 = (SELECT horario FROM temp_Med where idTemp=i);
            if _evaluar2 !='' then
				SET _idMuestra = (select ifnull( (select distinct e.idMuestraMedicion from MuestraMedicion e inner join temp_Med t on  e.fidEspacioMedicion=t.idEspacioMedicion where e.codigo=t.horario and idEspacioMedicion=_idEspacio and t.idTemp=i),"0") as result);
				UPDATE temp_Med
				SET fidMuestra=_idMuestra where idTemp=i; 
				if _idMuestra=0 then
					INSERT INTO MuestraMedicion (fidEspacioMedicion,codigo,enviado,fechaCreacion,usuarioCreacion,activo)
					SELECT  _idEspacio,horario,0,now(),usuarioCreacion,activo FROM temp_Med where idTemp=i;
					SET _idMuestra = @@last_insert_id;
					INSERT  INTO Perfil (fidUsuario,nivelAcceso,fidMuestra,esAsistente,nombrePerfil,esAdministrador,fechaCreacion,usuarioCreacion,esAuditor,activo)
					SELECT fidUsuario,nivelAcceso,_idMuestra,esAsistente,nombrePerfil,esAdministrador,now(),usuarioCreacion,esAuditor,activo FROM temp_Med where idTemp=i;
                    SET _evaluar3 = (SELECT fidIndicador FROM temp_Med where idTemp=i);
					if _evaluar3 != 0 then
						INSERT  INTO IndicadorXMuestra (fidIndicador,fidMuestraMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
						SELECT fidIndicador,_idMuestra,evidencia,usuarioCreacion,now(),activo FROM temp_Med where idTemp=i;
						call ActualizarPosicionIndicadorMuestra(_idMuestra,_idIndicar);
                        UPDATE EspacioMedicion SET indicadoresConfigurados=1 where idEspacioMedicion=_idEspacio;
					end if;
				else
					SET asignada= (select count(*) from Perfil p inner join temp_Med t on  p.fidMuestra = t.fidMuestra where p.fidUsuario=t.fidUsuario and t.fidMuestra=_idMuestra and t.idTemp=i);
					if asignada=0 then
						INSERT  INTO Perfil (fidUsuario,nivelAcceso,fidMuestra,esAsistente,nombrePerfil,esAdministrador,fechaCreacion,usuarioCreacion,esAuditor,activo)
						SELECT fidUsuario,nivelAcceso,fidMuestra,esAsistente,nombrePerfil,esAdministrador,now(),usuarioCreacion,esAuditor,activo FROM temp_Med where idTemp=i;
					end if;
					SET asignada2= (select count(*) from IndicadorXMuestra p inner join temp_Med t on  p.fidMuestraMedicion = t.fidMuestra where p.fidIndicador=t.fidIndicador and t.fidMuestra=_idMuestra and t.idTemp=i);
					if asignada2=0 then
						SET _evaind = (select ifnull((select distinct e.fidEspacioMedicion from EspacioXIndicador e inner join temp_Med t on e.fidIndicador=t.fidIndicador  where  _idEspacio = e.fidEspacioMedicion and e.fidIndicador=t.fidIndicador AND t.idTemp=i),"0") as result);
						if _evaind = 0 THEN
							INSERT INTO EspacioXIndicador (fidIndicador,fidEspacioMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
							SELECT fidIndicador,_idEspacio,evidencia,usuarioCreacion,now(),activo FROM temp_Med where idTemp=i;
						END IF;
						INSERT  INTO IndicadorXMuestra (fidIndicador,fidMuestraMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
						SELECT fidIndicador,fidMuestra,evidencia,usuarioCreacion,now(),activo FROM temp_Med where idTemp=i;
						call ActualizarPosicionIndicadorMuestra(_idMuestra,_idIndicar);
					end if;
				end if;
			end if;
            SET _evaluar3 = (SELECT fidIndicador FROM temp_Med where idTemp=i);
			if _evaluar3 != 0 then
			SET _evaind = (select ifnull((select distinct e.fidEspacioMedicion from EspacioXIndicador e inner join temp_Med t on e.fidIndicador=t.fidIndicador  where  _idEspacio = e.fidEspacioMedicion and e.fidIndicador=t.fidIndicador AND t.idTemp=i),"0") as result);
			if _evaind = 0 THEN
				INSERT INTO EspacioXIndicador (fidIndicador,fidEspacioMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
				SELECT fidIndicador,_idEspacio,evidencia,usuarioCreacion,now(),activo FROM temp_Med where idTemp=i;
                UPDATE EspacioMedicion SET indicadoresConfigurados=1 where idEspacioMedicion=_idEspacio;
			end if;
            END IF;
		end if;  
        SET i = i + 1;
    END WHILE;
    select true as t;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarNumeroAlumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ActualizarNumeroAlumno`(
	in _idIndicadorXMuestraMedicion int,
    in _numeroAlumnos int
)
begin
	update IndicadorXMuestra
    set numeroAlumnos = _numeroAlumnos
    where idIndicadorXMuestraMedicion = _idIndicadorXMuestraMedicion;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarNumeroRubricasEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ActualizarNumeroRubricasEspecialidad`(
	IN _idEspecialidad INT,
    IN _usuario VARCHAR(100)
)
begin
	declare _numNiveles int;
    declare _maxNivel int;
    -- obtengo el maximo
	SELECT MAX(nivel) INTO _maxNivel
    FROM Rubrica r
    INNER JOIN Indicador i ON r.fidIndicador = i.idIndicador
    INNER JOIN Competencia c ON i.fidCompetencia = c.idCompetencia
    WHERE c.fidEspecialidad = _idEspecialidad and r.activo=1;
    #necesito el numero de niveles
    select niveles into _numNiveles from Parametros p
    inner join Especialidad e on e.idNivel = p.idParametro
    where e.idEspecialidad = _idEspecialidad;
    
    if _maxNivel < _numNiveles then
		call InsertarRubricasFaltantes(_idEspecialidad, _usuario);
	else
		if _maxNivel > _numNiveles then
        call QuitarExcesoRubricasDeEspecialidad(_idEspecialidad, _usuario);
        end if;
	end if;
    
    
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarParametroEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ActualizarParametroEspecialidad`(
	in _idEspecialidad int,
    IN _niveles VARCHAR(2),
    IN _minimoAprobatorio VARCHAR(2),
    IN _porcentajeMinimo DOUBLE,
    in _usuarioModificacion int
)
begin
	declare _nombreUsuario varchar(100);
    declare _idParametro int;
    #nombre del usuario
    select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioModificacion;
    #creo el parametro
    if not exists (select 1 from Parametros where niveles=_niveles 
    and minimoAprobatorio=_minimoAprobatorio and porcentajeMinimo=_porcentajeMinimo and activo=1) then
		call InsertarParametros(@idParam, _niveles, _minimoAprobatorio, _porcentajeMinimo, _usuarioModificacion);
        set _idParametro=@idParam;
	else 
		select idParametro into _idParametro FROM  Parametros where niveles=_niveles 
		and minimoAprobatorio=_minimoAprobatorio and porcentajeMinimo=_porcentajeMinimo and activo=1;
    end if;
    #actualizo idNivel
    update Especialidad 
    set idNivel = _idParametro, usuarioModificacion=_nombreUsuario, fechaModificacion=now()
    where idEspecialidad=_idEspecialidad;
    call ActualizarNumeroRubricasEspecialidad(_idEspecialidad, _usuarioModificacion);
    
    #tmb actualizo indicador
    update Indicador i 
    inner join Competencia c on i.fidCompetencia = c.idCompetencia
    set i.niveles = _niveles,
    i.minimoAprobatorio = _minimoAprobatorio,
    i.porcentajeMinimo = _porcentajeMinimo,
    i.usuarioModificacion = _nombreUsuario, i.fechaModificacion=now()
    where c.fidEspecialidad = _idEspecialidad and i.activo=1 and c.activo=1 and i.idIndicador>=1;
    
    
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarParamIndicador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ActualizarParamIndicador`(
	in _idIndicador int
)
begin
	declare _idEspecialidad int;
    declare _niveles VARCHAR(2);
    declare _minimoAprobatorio VARCHAR(2);
    declare _porcentajeMinimo DOUBLE;
    select fidEspecialidad into _idEspecialidad from Competencia c inner join Indicador i on i.fidCompetencia=c.idCompetencia
    where i.idIndicador=_idIndicador;
    select niveles, minimoAprobatorio, porcentajeMinimo into 
    _niveles, _minimoAprobatorio, _porcentajeMinimo
    from Parametros p
    inner join Especialidad e on e.idNivel=p.idParametro where e.idEspecialidad = _idEspecialidad;
    update Indicador set niveles=_niveles, minimoAprobatorio=_minimoAprobatorio, porcentajeMinimo=_porcentajeMinimo
    where Indicador.idIndicador = _idIndicador;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarPosicionIndicadorMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ActualizarPosicionIndicadorMuestra`(
	in _idMuestra int,
    in _idIndicador int)
BEGIN	
		DECLARE conti int;
		set conti = (select count(*) from IndicadorXMuestra where fidMuestraMedicion=_idMuestra);
		UPDATE IndicadorXMuestra
		SET posicionResultado = conti-1
		where fidIndicador=_idIndicador and fidMuestraMedicion=_idMuestra;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AnularAlumnoMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `AnularAlumnoMuestra`(
	in _idAlumnoMuestra int,
    in _usuarioAnulacion varchar(100),
    out _resultado tinyint(1)
)
begin
	
    IF NOT EXISTS (SELECT 1 FROM AlumnosMuestra WHERE activo =1 and idAlumnosMuestra = _idAlumnoMuestra) THEN
		set _resultado = 0;
   
	ELSE 
    update AlumnosMuestra
    set activo = 0, usuarioAnulacion=_usuarioAnulacion, fechaAnulacion=now()
    where idAlumnosMuestra=_idAlumnoMuestra;
    set _resultado = 1;
    
    end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AnularCodigoRecuparContrasenia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `AnularCodigoRecuparContrasenia`(
    IN _fidUsuario INT
)
BEGIN
	update CodigosRecuperarContrasenia
    set activo = 0, fechaAnulacion=NOW()
    where activo = 1 AND fidUsuario=_fidUsuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AnularEspacioMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `AnularEspacioMedicion`(
	IN _idEspacioMedicion INT,
    IN _usuarioAnulacion VARCHAR (100)
)
BEGIN
	DECLARE done INT DEFAULT FALSE;
    DECLARE _idMuestraMedicion INT;
    DECLARE cursor_muestraMedicion CURSOR FOR
        SELECT idMuestraMedicion FROM MuestraMedicion
        WHERE fidEspacioMedicion = _idEspacioMedicion and activo = 1;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cursor_muestraMedicion;
    #cbas: Para evitar modificar otras cosas, mientras no sepamos exactamente como manejar la herencia de estado activo = 0, lo mejor es no editar otras tabla y desactivar sus registros
    #read_loop: LOOP
        #FETCH cursor_muestraMedicion INTO _idMuestraMedicion;
        #IF done THEN
        #    LEAVE read_loop;
        #END IF;
        
        -- Llamado al procedure EliminarMuestraMedicion
        #CALL AnularMuestraMedicion(_idMuestraMedicion, _usuarioAnulacion);
    #END LOOP;
    CLOSE cursor_muestraMedicion;
    
    -- Actualizar la tabla EspacioMedicion
    UPDATE EspacioMedicion
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion, fechaAnulacion = now()
    WHERE idEspacioMedicion = _idEspacioMedicion and activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AnularMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `AnularMedicion`(
	IN _idMedicion INT,
    IN _usuarioAnulacion VARCHAR (100)
)
BEGIN
	DECLARE done INT DEFAULT FALSE;
    DECLARE _idEspacioMedicion INT;
    DECLARE cursor_espacioMedicion CURSOR FOR
        SELECT idEspacioMedicion FROM EspacioMedicion
        WHERE fidMedicion = _idMedicion and activo = 1;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cursor_espacioMedicion;
    #cbas: Para evitar modificar otras cosas, mientras no sepamos exactamente como manejar la herencia de estado activo = 0, lo mejor es no editar otras tabla y desactivar sus registros
    #read_loop: LOOP
        #FETCH cursor_espacioMedicion INTO _idEspacioMedicion;
        #IF done THEN
        #    LEAVE read_loop;
        #END IF;
        
        -- Llamado al procedure EliminarMuestraMedicion
        #CALL AnularEspacioMedicion(_idEspacioMedicion, _usuarioAnulacion);
    #END LOOP;
    CLOSE cursor_espacioMedicion;
    
    -- Actualizar la tabla Medicion
    UPDATE Medicion
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion, fechaAnulacion = now()
    WHERE idMedicion = _idMedicion and activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AnularMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `AnularMuestraMedicion`(
	IN _idMuestraMedicion INT,
    IN _usuarioAnulacion VARCHAR (100)
)
BEGIN

    UPDATE MuestraMedicion 
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion, MuestraMedicion.fechaAnulacion = now()
    WHERE idMuestraMedicion = _idMuestraMedicion and activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AnularObjetivoEducacional` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `AnularObjetivoEducacional`(
	in _idObjetivoEducacional int,
    in _usuarioAnulacion varchar(100)
)
begin
	update ObjetivoEducacional set activo = 0,
    usuarioAnulacion = _usuarioAnulacion, fechaAnulacion = now()
    where idObjetivoEducacional = _idObjetivoEducacional;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AnularPerfil` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `AnularPerfil`(
	IN _fidUsuario INT,
    IN _usuarioAnulacion VARCHAR (100)
)
BEGIN
    UPDATE Perfil 
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion, Perfil.fechaAnulacion = now()
    WHERE fidUsuario = _fidUsuario and activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AnularPerfilMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `AnularPerfilMuestra`(
	IN _fidMuestra INT,
    IN _usuarioAnulacion VARCHAR (100)
)
BEGIN

    UPDATE Perfil 
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion, MuestraMedicion.fechaAnulacion = now()
    WHERE fidMuestra = _fidMuestra and activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AnularPlanMejora` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `AnularPlanMejora`(
	in _idPlanMejora int,
    in _idRegistrador int
)
begin
	declare _usuarioAnulacion2 VARCHAR(100);
    SET _usuarioAnulacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idRegistrador);
    
    update PlanMejora
    set usuarioAnulacion = _usuarioAnulacion2, fechaAnulacion = now(), activo =0
    where idPlanMejora = _idPlanMejora;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AnulaUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `AnulaUsuario`(
	IN _idUsuario INT,
    IN _usuarioAnulacion VARCHAR (100)
)
BEGIN
	CALL AnularPerfil(_idUsuario, _usuarioAnulacion);
	UPDATE Usuario 
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion, Usuario.fechaAnulacion = now()
    WHERE idUsuario = _idUsuario and activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `BuscarUsuarioXCorreo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `BuscarUsuarioXCorreo`(
    IN _correo varchar(200)
)
BEGIN
	SELECT idUsuario,nombres,apellidoPaterno,apellidoMaterno,codigoPUCP,celular,correo2,correo FROM Usuario 
    WHERE _correo = correo
    and activo=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CalcularNumeroAlumnos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `CalcularNumeroAlumnos`(
	in _fidMuestraMedicion int
)
begin
	DECLARE _numeroAlumnos int;
	DECLARE done INT DEFAULT FALSE;
    DECLARE _idIndicadorXMuestraMedicion INT;
    DECLARE cur CURSOR FOR
        SELECT idIndicadorXMuestraMedicion
        FROM IndicadorXMuestra
        WHERE fidMuestraMedicion = _fidMuestraMedicion and activo=1;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    #contar numero de alumnos
    select count(fidAlumno) into  _numeroAlumnos
    from AlumnosMuestra
    where activo = 1 and fidMuestraMedicion = _fidMuestraMedicion;
    
   -- Actualizar el número de alumnos para cada indicador de muestra de mediciones
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO _idIndicadorXMuestraMedicion;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Llamar al procedure ActualizarNumeroAlumno para cada indicador de muestra de mediciones
        CALL ActualizarNumeroAlumno(_idIndicadorXMuestraMedicion, _numeroAlumnos);
    END LOOP;
    CLOSE cur;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cambiarIDXNombre` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `cambiarIDXNombre`(
	in _id int
)
begin
	declare _name varchar(100);
    select CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
    into _name from Usuario u
    where u.idUsuario=_id;
    update MuestraMedicion
    set usuarioModificacion=_name
    where usuarioModificacion=_id and idMuestraMedicion>1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ComboBoxListarCompetencias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ComboBoxListarCompetencias`(
	in _fidEspecialidad int
)
begin
	SELECT  @row_number := @row_number + 1 AS id, codigoCompetencia as competencia 
	FROM (SELECT DISTINCT codigoCompetencia 
	FROM Competencia c
	where c.fidEspecialidad = _fidEspecialidad and c.activo=1
	) as g, (SELECT @row_number := 0) AS t;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ComboBoxListarCursos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ComboBoxListarCursos`(
	in _fidEspecialidad int
)
begin
	SELECT  @row_number := @row_number + 1 AS id, codigo as curso 
    FROM (SELECT DISTINCT e.codigo FROM EspacioMedicion e
    inner join Medicion m on m.idMedicion = e.fidMedicion
    where m.fidEspecialidad = _fidEspecialidad and e.activo=1
    ) as g, (SELECT @row_number := 0) AS t;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ConfigurarParametroEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ConfigurarParametroEspecialidad`(
	in _idEspecialidad int,
    in _idParametro int,
    in _usuarioModificacion int
)
begin
	declare _nombreUsuario varchar(100);
	select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioModificacion;
    
	update Especialidad set idNivel=_idParametro, usuarioModificacion=_nombreUsuario
    where idEspecialidad=_idEspecialidad;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DatosHorarioDocente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DatosHorarioDocente`(
			in _idEspacioMedicion int,
            in _horario varchar(20),
            in _codDocente varchar(15),
            out _correo varchar(200),
            out _texto varchar(450)
        )
begin
			declare _curso varchar(200);
			select nombreCurso into _curso from EspacioMedicion where idEspacioMedicion = _idEspacioMedicion;
            set _texto = concat("Usted ha sido asignado como Responsable de Medición del horario ",_horario," del curso ",_curso);
            
            select correo into  _correo from Usuario where codigoPUCP=_codDocente and activo=1;
            
            
        end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeshabilitarCiclos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DeshabilitarCiclos`(
	IN _idList VARCHAR(255),
    IN _usuarioModificacion varchar(60))
BEGIN
	declare _usuarioModificacion2 VARCHAR(100);
	SET _usuarioModificacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioModificacion);

	UPDATE cicloAcademico
    set activo = 0, usuarioAnulacion = _usuarioModificacion2, fechaAnulacion = now()
    WHERE FIND_IN_SET(idcicloAcademico, _idList) and idcicloAcademico > -1 and activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeshabilitarCompetencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DeshabilitarCompetencia`(
	IN _idCompetencia INT,
    IN _idRegistrador INT
)
BEGIN
	declare _usuarioAnulacion2 VARCHAR(100);
    SET _usuarioAnulacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idRegistrador);

	UPDATE Competencia 
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion2, fechaAnulacion = now()
    WHERE idCompetencia = _idCompetencia and activo = 1;
    
    UPDATE Indicador 
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion2, fechaAnulacion = now()
    WHERE fidCompetencia = _idCompetencia and activo = 1;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeshabilitarEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DeshabilitarEspecialidad`(
	in _idEspecialidad int,
    in _usuarioModificacion int
)
begin
    declare _nombreUsuario varchar(100);
    select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioModificacion;
	update Especialidad set activo=0, usuarioAnulacion=_nombreUsuario,fechaAnulacion=NOW()
    where idEspecialidad=_idEspecialidad;
    #cbas: Para evitar modificar otras cosas, mientras no sepamos exactamente como manejar la herencia de estado activo = 0, lo mejor es no editar otras tabla y desactivar sus registros
    #call DeshabilitarMedicionesEspecialidad(_idEspecialidad,_nombreUsuario); 
    #call DeshabilitarResponsablesMuestraXEspecialidad(_idEspecialidad,_nombreUsuario);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeshabilitarFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DeshabilitarFacultad`(
	IN _idList VARCHAR(255),
    IN _usuarioAnulacion varchar(60)
)
BEGIN
	declare _usuarioAnulacion2 VARCHAR(100);
	SET _usuarioAnulacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioAnulacion);

	UPDATE Facultad 
    set Facultad.activo = 0, Facultad.usuarioAnulacion = _usuarioAnulacion2, fechaAnulacion = now()
    WHERE FIND_IN_SET(idFacultad, _idList) and idFacultad > -1 and activo = 1;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeshabilitarMedicionesEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DeshabilitarMedicionesEspecialidad`(
	in _idEsp int,
    in _usuario varchar(300)
)
begin 
	#se deshabilitaran todas las mediciones (primero espacios y muestras) que no fueron completadas (atributo "completada=0")
    DECLARE done INT DEFAULT FALSE;
    DECLARE _idMedicion INT;
    DECLARE cursor_Medicion CURSOR FOR
        SELECT idMedicion FROM Medicion
        where fidEspecialidad = _idEsp and activo = 1
		and completada=0;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cursor_Medicion;
    read_loop: LOOP
        FETCH cursor_Medicion INTO _idMedicion;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Llamado al procedure EliminarMuestraMedicion
        CALL AnularMedicion(_idMedicion, _usuario);
    END LOOP;
    CLOSE cursor_Medicion;
    
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deshabilitarPerfiles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `deshabilitarPerfiles`(
	IN _idList VARCHAR(255),
    IN _usuarioAnulacion VARCHAR (100)
)
BEGIN
	declare _nombreUsuario varchar(100);
	select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioAnulacion;

    UPDATE Perfil 
    SET activo = 0, usuarioAnulacion = _nombreUsuario, fechaAnulacion = now()
    WHERE FIND_IN_SET(idPerfil, _idList) and activo = 1 and idPerfil > -1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeshabilitarPrograma` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DeshabilitarPrograma`(
	IN _idPrograma INT,
    IN _idRegistrador INT
)
BEGIN
	declare _usuarioAnulacion2 VARCHAR(100);
    SET _usuarioAnulacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idRegistrador);
	CALL AnularMedicion(_idPrograma, _usuarioAnulacion2);
	UPDATE Medicion 
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion2, Medicion.fechaAnulacion = now()
    WHERE idMedicion = _idPrograma and activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeshabilitarResponsableFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DeshabilitarResponsableFacultad`(
	in _idUsuario int,
    in _idFacultad int,
    in _usuarioAnulacion int
)
begin
	declare _nombreUsuario varchar(100);
	select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioAnulacion;
	update Perfil set activo=0, fechaAnulacion=now(), usuarioAnulacion=_nombreUsuario
    where fidUsuario=_idUsuario and fidFacultad=_idFacultad ;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeshabilitarResponsablesEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DeshabilitarResponsablesEspecialidad`(
	in _idEsp int,
    in _usuario varchar(300)
)
begin
	update Perfil 
    set activo=0, usuarioAnulacion = _usuario, fechaAnulacion=now()
    where fidEspecialidad = _idEsp and activo = 1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeshabilitarResponsablesMuestraXEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DeshabilitarResponsablesMuestraXEspecialidad`(
	in _idEsp int,
    in _usuario varchar(300)
)
begin
	DECLARE done INT DEFAULT FALSE;
    DECLARE _idMuestra INT;
    DECLARE cursor_muestra CURSOR FOR
		select idMuestraMedicion
		from MuestraMedicion mm
		inner join EspacioMedicion e on e.idEspacioMedicion = mm.fidEspacioMedicion
        inner join Medicion m on m.idMedicion = e.fidMedicion
        WHERE m.fidEspecialidad = _idEsp and m.activo = 1;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    #ya tengo los id de las muestras 
    OPEN cursor_muestra;
    read_loop: LOOP
        FETCH cursor_muestra INTO _idMuestra;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Anulo los perfiles de la muestra
        update Perfil 
		set activo=0, usuarioAnulacion = _usuario, fechaAnulacion=now()
		where fidMuestra = _idMuestra and activo = 1;
    
    END LOOP;
    CLOSE cursor_muestra;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeshabilitarUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DeshabilitarUsuario`(
	IN _idUsuario INT,
    IN _idRegistrador INT
)
BEGIN
	declare _usuarioAnualacion2 VARCHAR(100);
    SET _usuarioAnualacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idRegistrador);
	#CALL AnularPerfil(_idUsuario, _usuarioAnualacion2);
	UPDATE Usuario 
    SET activo = 0, usuarioAnulacion = _usuarioAnualacion2, Usuario.fechaAnulacion = now()
    WHERE idUsuario = _idUsuario and activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DetalleIndicador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DetalleIndicador`(
	in _idIndicador int
)
begin
	select descripcion as descripcionIndicador from Indicador where idIndicador = _idIndicador;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DuplicarMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `DuplicarMedicion`(
	OUT _nuevoIdMedicion INT,
    IN _codigo VARCHAR(10),
	IN _idMedicion INT,
    IN _idCicloInicio INT,
    IN _fechaLimite DATE,
    IN _idUsuario INT
)
BEGIN
    declare _dif INT;
	
	declare idEM INT;
	declare tempEM INT;
	declare idMM INT;
	declare tempMM INT;
	declare idP INT;
	declare tempP INT;
	declare idIXM INT;
	declare tempIXM INT;
	declare idCXM INT;
	declare tempCXM INT;
	
    declare _usuarioCreacion VARCHAR(100);
	SET _usuarioCreacion = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idUsuario);
    
    #se necesita validacion en front de que solo se puede duplicar mediciones en ciclos cuyos semestres sean iguales al semestre del ciclo inicial de la medicion
    SET _dif = (SELECT _idCicloInicio - med.fidCicloInicio FROM Medicion med WHERE idMedicion = _idMedicion);
    
	INSERT INTO Medicion (fidEspecialidad, fidCicloInicio,     fidCicloFin       , fidParametro,  codigo, fechaCreacion, completada,  usuarioCreacion, activo)
    SELECT            med.fidEspecialidad, _idCicloInicio, med.fidCicloFin + _dif, fidParametro, _codigo, now()        , 0         , _usuarioCreacion, 1
    FROM Medicion med
    WHERE idMedicion = _idMedicion;
    
    SET _nuevoIdMedicion = @@last_insert_id;
	
	drop table if exists tmp_CompetenciaXMuestra;
	drop table if exists tmp_IndicadorXMuestra;
	drop table if exists tmp_Perfil;
	drop table if exists tmp_MuestraMedicion;
	drop table if exists tmp_EspacioMedicion;
    
#   INSERT INTO EspacioMedicion (     fidMedicion, fidCicloAcademico       , codigo, nombreCurso,  fechaLimite, tipoMedicion, indicadoresConfigurados, fechaCreacion,  usuarioCreacion, activo)
#                  idEspacioMedicion, fidMedicion, fidCicloAcademico, codigo, nombreCurso, fechaLimite, tipoMedicion, indicadoresConfigurados, fechaCreacion, fechaAnulacion, fechaModificacion, usuarioCreacion, usuarioModificacion, usuarioAnulacion, activo`acredipucp2`.`Medicion`

	CREATE TABLE `tmp_EspacioMedicion` (
	  `idEspacioMedicion` int NOT NULL AUTO_INCREMENT,
	  `fidMedicion` int NOT NULL,
	  `fidCicloAcademico` int NOT NULL,
	  `codigo` varchar(10) NOT NULL,
	  `nombreCurso` varchar(50) NOT NULL,
	  `fechaLimite` date DEFAULT NULL,
	  `tipoMedicion` varchar(10) NOT NULL,
	  `indicadoresConfigurados` tinyint(1) NOT NULL,
	  `fechaCreacion` datetime NOT NULL,
	  `fechaAnulacion` datetime DEFAULT NULL,
	  `fechaModificacion` datetime DEFAULT NULL,
	  `usuarioCreacion` varchar(100) NOT NULL,
	  `usuarioModificacion` varchar(100) DEFAULT NULL,
	  `usuarioAnulacion` varchar(100) DEFAULT NULL,
	  `activo` tinyint(1) NOT NULL,
	  PRIMARY KEY (`idEspacioMedicion`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    CREATE TABLE `tmp_MuestraMedicion` (
	  `idMuestraMedicion` int NOT NULL AUTO_INCREMENT,
	  `fidEspacioMedicion` int NOT NULL,
	  `codigo` varchar(10) NOT NULL,
	  `enviado` tinyint(1) NOT NULL,
	  `fechaCreacion` datetime NOT NULL,
	  `fechamodificacion` datetime DEFAULT NULL,
	  `fechaAnulacion` datetime DEFAULT NULL,
	  `usuarioCreacion` varchar(100) NOT NULL,
	  `usuarioModificacion` varchar(100) DEFAULT NULL,
	  `usuarioAnulacion` varchar(100) DEFAULT NULL,
	  `activo` tinyint(1) NOT NULL,
	  PRIMARY KEY (`idMuestraMedicion`),
	  KEY `fidEspacioMedicion` (`fidEspacioMedicion`),
	  CONSTRAINT `fk_Muestra_Espacio_tmp` FOREIGN KEY (`fidEspacioMedicion`) REFERENCES `tmp_EspacioMedicion` (`idEspacioMedicion`) ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    CREATE TABLE `tmp_Perfil` (
	  `idPerfil` int NOT NULL AUTO_INCREMENT,
	  `fidUsuario` int NOT NULL,
	  `nivelAcceso` int NOT NULL,
	  `fidFacultad` int DEFAULT NULL,
	  `fidEspecialidad` int DEFAULT NULL,
	  `fidMuestra` int DEFAULT NULL,
	  `esAsistente` int NOT NULL,
	  `nombrePerfil` varchar(60) NOT NULL,
	  `esAdministrador` tinyint(1) NOT NULL,
	  `fechaCreacion` datetime NOT NULL,
	  `fechaAnulacion` datetime DEFAULT NULL,
	  `fechaModificacion` datetime DEFAULT NULL,
	  `usuarioCreacion` varchar(100) NOT NULL,
	  `usuarioModificacion` varchar(100) DEFAULT NULL,
	  `usuarioAnulacion` varchar(100) DEFAULT NULL,
	  `esAuditor` tinyint(1) NOT NULL,
	  `activo` tinyint(1) NOT NULL,
	  PRIMARY KEY (`idPerfil`),
	  KEY `fk_Perfil_Muestra_idx` (`fidMuestra`),
	  CONSTRAINT `fk_Perfil_Muestra_tmp` FOREIGN KEY (`fidMuestra`) REFERENCES `tmp_MuestraMedicion` (`idMuestraMedicion`) ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    CREATE TABLE `tmp_IndicadorXMuestra` (
	  `idIndicadorXMuestraMedicion` int NOT NULL AUTO_INCREMENT,
	  `fidIndicador` int NOT NULL,
	  `fidMuestraMedicion` int NOT NULL,
	  `posicionResultado` int DEFAULT '0',
	  `totalResultados` int DEFAULT '0',
	  `promedio` decimal(6,2) DEFAULT '0.00',
	  `porcentaje` decimal(6,2) DEFAULT '0.00',
	  `totalesCumplidos` int DEFAULT '0',
	  `numeroAlumnos` int DEFAULT '0',
	  `usuarioCreacion` varchar(200) NOT NULL,
	  `usuarioModificacion` varchar(200) DEFAULT NULL,
	  `usuarioAnulacion` varchar(200) DEFAULT NULL,
	  `fechaCreacion` datetime NOT NULL,
	  `fechaModificacion` datetime DEFAULT NULL,
	  `fechaAnulacion` datetime DEFAULT NULL,
	  `activo` tinyint(1) NOT NULL,
	  `evidencia` varchar(400) DEFAULT NULL,
	  `fidParametroEnviado` int DEFAULT NULL,
	  PRIMARY KEY (`idIndicadorXMuestraMedicion`),
	  KEY `FK_IndicadorEspacioXMuestraMedicion_MuestraMedicion_idx` (`fidMuestraMedicion`),
	  CONSTRAINT `FK_IndicadorEspacioXMuestraMedicion_MuestraMedicion_tmp` FOREIGN KEY (`fidMuestraMedicion`) REFERENCES `MuestraMedicion` (`idMuestraMedicion`) ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    CREATE TABLE `tmp_CompetenciaXMuestra` (
	  `idCompetenciaXMuestra` int NOT NULL AUTO_INCREMENT,
	  `fidCompetencia` int NOT NULL,
	  `fidMuestraMedicion` int NOT NULL,
	  `evidenciaEnviada` tinyint(1) NOT NULL,
	  `fidIndicador` int NOT NULL,
	  PRIMARY KEY (`idCompetenciaXMuestra`),
	  KEY `fk_CompetenciaXMuestra_MuestraMedicion1_idx` (`fidMuestraMedicion`),
	  CONSTRAINT `fk_CompetenciaXMuestra_MuestraMedicion1_tmp` FOREIGN KEY (`fidMuestraMedicion`) REFERENCES `MuestraMedicion` (`idMuestraMedicion`) ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

    
					   #idEspacioMedicion, fidMedicion, fidCicloAcademico,       codigo, nombreCurso, fechaLimite, tipoMedicion, indicadoresConfigurados, fechaCreacion, fechaAnulacion, fechaModificacion, usuarioCreacion, usuarioModificacion, usuarioAnulacion, activo
    INSERT INTO tmp_EspacioMedicion ( idEspacioMedicion, fidMedicion, fidCicloAcademico       , codigo, nombreCurso,  fechaLimite, tipoMedicion, indicadoresConfigurados, fechaCreacion,  usuarioCreacion, activo)
    SELECT                        idEspacioMedicion, _nuevoIdMedicion, fidCicloAcademico + _dif, codigo, nombreCurso, _fechaLimite, tipoMedicion, indicadoresConfigurados, now()        , _usuarioCreacion, activo
    FROM EspacioMedicion WHERE fidMedicion = _idMedicion;
    
    INSERT INTO tmp_MuestraMedicion ( idMuestraMedicion, fidEspacioMedicion, codigo, enviado, fechaCreacion, usuarioCreacion, activo )
    SELECT                           idMuestraMedicion, fidEspacioMedicion, codigo,  0     , now()         , _usuarioCreacion, activo
    FROM MuestraMedicion  WHERE fidEspacioMedicion IN ( SELECT idEspacioMedicion FROM tmp_EspacioMedicion);
    
    INSERT INTO tmp_Perfil ( idPerfil, fidUsuario, nivelAcceso, fidMuestra, esAsistente, nombrePerfil, esAdministrador, fechaCreacion, usuarioCreacion, esAuditor, activo)
    SELECT					idPerfil, fidUsuario, nivelAcceso, fidMuestra, esAsistente, nombrePerfil, esAdministrador, now()        , _usuarioCreacion, esAuditor, activo 
    FROM Perfil WHERE fidMuestra IN ( SELECT idMuestraMedicion FROM tmp_MuestraMedicion);
    
    INSERT into tmp_IndicadorXMuestra (idIndicadorXMuestraMedicion, fidIndicador, fidMuestraMedicion, posicionResultado, totalResultados, promedio, porcentaje, totalesCumplidos, numeroAlumnos, usuarioCreacion, fechaCreacion, activo, evidencia, fidParametroEnviado)
    SELECT                             idIndicadorXMuestraMedicion, fidIndicador, fidMuestraMedicion, posicionResultado, totalResultados, 0       , 0         , 0               , 0            , _usuarioCreacion, now()      , activo, evidencia, fidParametroEnviado
    FROM IndicadorXMuestra WHERE fidMuestraMedicion IN ( SELECT idMuestraMedicion FROM tmp_MuestraMedicion);
    
    INSERT INTO tmp_CompetenciaXMuestra (idCompetenciaXMuestra, fidCompetencia, fidMuestraMedicion, evidenciaEnviada, fidIndicador)
    SELECT							     idCompetenciaXMuestra, fidCompetencia, fidMuestraMedicion, 0               , fidIndicador
    FROM CompetenciaXMuestra WHERE fidMuestraMedicion IN ( SELECT idMuestraMedicion FROM tmp_MuestraMedicion);
	
	SET idEM = (SELECT MAX(idEspacioMedicion) FROM EspacioMedicion);
	SET tempEM = (SELECT idEspacioMedicion FROM tmp_EspacioMedicion LIMIT 1);
	SET idMM = (SELECT MAX(idMuestraMedicion) FROM MuestraMedicion);
	SET tempMM = (SELECT idMuestraMedicion FROM tmp_MuestraMedicion LIMIT 1);
	SET idP = (SELECT MAX(idPerfil) FROM Perfil);
	SET tempP = (SELECT idPerfil FROM tmp_Perfil LIMIT 1);
	SET idIXM = (SELECT MAX(idIndicadorXMuestraMedicion) FROM IndicadorXMuestra);
	SET tempIXM = (SELECT idIndicadorXMuestraMedicion FROM tmp_IndicadorXMuestra LIMIT 1);
	SET idCXM = (SELECT MAX(idCompetenciaXMuestra) FROM CompetenciaXMuestra);
	SET tempCXM = (SELECT idCompetenciaXMuestra FROM tmp_CompetenciaXMuestra LIMIT 1);

	UPDATE tmp_EspacioMedicion SET idEspacioMedicion = idEspacioMedicion + 10000 WHERE idEspacioMedicion > -1;
	UPDATE tmp_MuestraMedicion SET idMuestraMedicion = idMuestraMedicion + 10000 WHERE idMuestraMedicion > -1;
	UPDATE tmp_Perfil SET idPerfil = idPerfil + 10000 WHERE idPerfil > -1;
	UPDATE tmp_IndicadorXMuestra SET idIndicadorXMuestraMedicion = idIndicadorXMuestraMedicion + 10000 WHERE idIndicadorXMuestraMedicion > -1;
	UPDATE tmp_CompetenciaXMuestra SET idCompetenciaXMuestra = idCompetenciaXMuestra + 10000 WHERE idCompetenciaXMuestra > -1;
	
	UPDATE tmp_EspacioMedicion SET idEspacioMedicion = idEspacioMedicion + idEM - tempEM - 999 WHERE idEspacioMedicion > -1;
	UPDATE tmp_MuestraMedicion SET idMuestraMedicion = idMuestraMedicion + idMM - tempMM - 999 WHERE idMuestraMedicion > -1;
	UPDATE tmp_Perfil SET idPerfil = idPerfil + idP - tempP - 999 WHERE idPerfil > -1;
	UPDATE tmp_IndicadorXMuestra SET idIndicadorXMuestraMedicion = idIndicadorXMuestraMedicion + idIXM - tempIXM - 999 WHERE idIndicadorXMuestraMedicion > -1;
	UPDATE tmp_CompetenciaXMuestra SET idCompetenciaXMuestra = idCompetenciaXMuestra + idCXM - tempCXM - 999 WHERE idCompetenciaXMuestra > -1;
	
	/* insert all the contents of the tmp_ tables into the corresponding tables */
	INSERT INTO EspacioMedicion (idEspacioMedicion, fidMedicion, fidCicloAcademico, codigo, nombreCurso, fechaLimite, tipoMedicion, indicadoresConfigurados, fechaCreacion, usuarioCreacion, activo)
	SELECT idEspacioMedicion, fidMedicion, fidCicloAcademico, codigo, nombreCurso, fechaLimite, tipoMedicion, indicadoresConfigurados, fechaCreacion, usuarioCreacion, activo
	FROM tmp_EspacioMedicion;
	
	INSERT INTO MuestraMedicion (idMuestraMedicion, fidEspacioMedicion, codigo, enviado, fechaCreacion, usuarioCreacion, activo)
	SELECT idMuestraMedicion, fidEspacioMedicion, codigo, enviado, fechaCreacion, usuarioCreacion, activo
	FROM tmp_MuestraMedicion;
	
	INSERT INTO Perfil (idPerfil, fidUsuario, nivelAcceso, fidMuestra, esAsistente, nombrePerfil, esAdministrador, fechaCreacion, usuarioCreacion, esAuditor, activo)
	SELECT idPerfil, fidUsuario, nivelAcceso, fidMuestra, esAsistente, nombrePerfil, esAdministrador, fechaCreacion, usuarioCreacion, esAuditor, activo
	FROM tmp_Perfil;
	
	INSERT INTO IndicadorXMuestra (idIndicadorXMuestraMedicion, fidIndicador, fidMuestraMedicion, posicionResultado, totalResultados, promedio, porcentaje, totalesCumplidos, numeroAlumnos, usuarioCreacion, fechaCreacion, activo, evidencia, fidParametroEnviado)
	SELECT idIndicadorXMuestraMedicion, fidIndicador, fidMuestraMedicion, posicionResultado, totalResultados, promedio, porcentaje, totalesCumplidos, numeroAlumnos, usuarioCreacion, fechaCreacion, activo, evidencia, fidParametroEnviado
	FROM tmp_IndicadorXMuestra;
	
	INSERT INTO CompetenciaXMuestra (idCompetenciaXMuestra, fidCompetencia, fidMuestraMedicion, evidenciaEnviada, fidIndicador)
	SELECT idCompetenciaXMuestra, fidCompetencia, fidMuestraMedicion, evidenciaEnviada, fidIndicador
	FROM tmp_CompetenciaXMuestra;
	
	drop table if exists tmp_CompetenciaXMuestra;
	drop table if exists tmp_IndicadorXMuestra;
	drop table if exists tmp_Perfil;
	drop table if exists tmp_MuestraMedicion;
	drop table if exists tmp_EspacioMedicion;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarActividad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `EliminarActividad`(
	IN _idActividad INT,
    IN _idRegistrador INT
)
BEGIN
	declare _usuarioAnulacion2 VARCHAR(100);
    SET _usuarioAnulacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idRegistrador);
    
    UPDATE Actividad 
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion2, fechaAnulacion = now()
    WHERE idActividad = _idActividad and activo = 1;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarAlumnosDeMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `EliminarAlumnosDeMuestra`(
)
BEGIN

	DECLARE i INT DEFAULT 1;
    DECLARE total_rows INT;
    DECLARE _idAlumno INT;
    DECLARE _idMuestra INT;
    DECLARE _usuario VARCHAR(100);
    SET total_rows = (SELECT COUNT(*) FROM temp_Alumno2);
    SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario inner join temp_Alumno2 on idUsuario=idUsuarioCreacion where idTemp=1);
    WHILE i <= total_rows DO
		SET _idMuestra =(SELECT fidMuestraMedicion FROM temp_Alumno2 where idTemp=i);
        SET _idAlumno=(SELECT idAlumno FROM temp_Alumno2 where idTemp=i);
		UPDATE AlumnosMuestra
		SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where fidAlumno=_idAlumno and fidMuestraMedicion=_idMuestra; 
        SET i = i + 1;
    END WHILE;
    select true as t;   
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarEspacioMedicionMasivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `EliminarEspacioMedicionMasivo`(
)
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE total_rows INT;
    DECLARE _usuario VARCHAR(200);
    DECLARE _idEspacio INT;
    SET total_rows = (SELECT COUNT(*) FROM temp_Esp);
	SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario inner join temp_Esp on idUsuario=idUsuarioCreacion where idTemp=1);
    WHILE i <= total_rows DO
        SET _idEspacio = (select ifnull((select distinct e.idEspacioMedicion from EspacioMedicion e inner join temp_Esp t on  e.idEspacioMedicion=t.idEspacioMedicion where t.idTemp=i),"0") as result);
        UPDATE EspacioMedicion
        SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where idEspacioMedicion = _idEspacio;
        UPDATE MuestraMedicion
        SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where fidEspacioMedicion = _idEspacio;
		UPDATE IndicadorXMuestra
        SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where fidMuestraMedicion in (select idMuestraMedicion from MuestraMedicion where fidEspacioMedicion = _idEspacio);
        UPDATE EspacioXIndicador
        SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where _idEspacio;
        UPDATE Perfil
        SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where fidMuestra in (select idMuestraMedicion from MuestraMedicion where fidEspacioMedicion = _idEspacio);
		SET i = i + 1;
    END WHILE;
    select true as t;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarEvidencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `EliminarEvidencia`(
    in _idDetalleCompetenciaXMuestra int,
    in _fidCompetenciaXMuestra int
)
begin
	Declare _valora int;
	UPDATE DetalleCompetenciaXMuestra SET activo = 0
	where idDetalleCompetenciaXMuestra = _idDetalleCompetenciaXMuestra;
    set _valora = (select count(*) from DetalleCompetenciaXMuestra where fidCompetenciaXMuestra=_fidCompetenciaXMuestra);
    if _valora=0 then 
	    UPDATE CompetenciaXMuestra SET evidenciaEnviada = 0
		where idCompetenciaXMuestra = _fidCompetenciaXMuestra;
	end if;
    select 1 as v;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarEvidenciaActividades` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `EliminarEvidenciaActividades`(
    in _idDetalleEvidenciaActividad int,
    in _fidActividad int
)
begin
	Declare _valora int;
	UPDATE DetalleEvidenciaActividad SET activo = 0
	where idDetalleEvidenciaActividad = _idDetalleEvidenciaActividad;
    
    set _valora = (select count(*) from DetalleEvidenciaActividad where fidActividad=_fidActividad);
    select 1 as v;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarIndicador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `EliminarIndicador`(
	IN _idIndicador INT,
    IN _idRegistrador INT
)
BEGIN
	declare _usuarioAnulacion2 VARCHAR(100);
    SET _usuarioAnulacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idRegistrador);
    UPDATE Indicador 
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion2, fechaAnulacion = now()
    WHERE idIndicador = _idIndicador and activo = 1;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarIndicadorTodos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `EliminarIndicadorTodos`(
)
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE total_rows INT;
    DECLARE _usuario VARCHAR(200);
    DECLARE _idIndicador INT;
    DECLARE _idEspacio INT;
    DECLARE _cont int default 1;
    SET total_rows = (SELECT COUNT(*) FROM temp_Esp);
	SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario inner join temp_Esp on idUsuario=idUsuarioCreacion where idTemp=1);
    WHILE i <= total_rows DO
		SET _idIndicador = (select t.idIndicador from temp_Esp t where t.idTemp=i);
        
		UPDATE EspacioXIndicador
        SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where fidIndicador= _idIndicador and fidEspacioMedicion in (select idEspacioMedicion from MuestraMedicion inner join temp_Esp on idEspacioMedicion=fidEspacioMedicion where idTemp=i );
        
        UPDATE IndicadorXMuestra
        SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where fidIndicador= _idIndicador and fidMuestraMedicion in (select idMuestraMedicion from MuestraMedicion inner join temp_Esp on idEspacioMedicion=fidEspacioMedicion where idTemp=i );
		SET i = i + 1;
    END WHILE;
    SET _idEspacio = (select idEspacioMedicion from temp_Esp where idTemp = 1);
    SET _cont = (select count(*) from EspacioXIndicador where activo=1 and fidEspacioMedicion=_idEspacio );
    if _cont = 0 then
		UPDATE EspacioMedicion SET indicadoresConfigurados=0 where idEspacioMedicion=_idEspacio;
    end if;
    select true as t;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarMuestraMasivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `EliminarMuestraMasivo`(
)
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE total_rows INT;
    DECLARE _usuario VARCHAR(200);
    DECLARE _idMuestra INT;
    SET total_rows = (SELECT COUNT(*) FROM temp_Esp);
	SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario inner join temp_Esp on idUsuario=idUsuarioCreacion where idTemp=1);
    WHILE i <= total_rows DO
        SET _idMuestra = (select ifnull((select distinct e.idMuestraMedicion from MuestraMedicion e inner join temp_Esp t on  e.idMuestraMedicion=t.idMuestra where t.idTemp=i),"0") as result);
        UPDATE MuestraMedicion
        SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where  idMuestraMedicion=_idMuestra;
		UPDATE IndicadorXMuestra
        SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where fidMuestraMedicion =_idMuestra;
        UPDATE Perfil
        SET activo=0, usuarioAnulacion=_usuario, fechaAnulacion=now() where fidMuestra = _idMuestra;
		SET i = i + 1;
    END WHILE;
    select true as t;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarPropuesta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `EliminarPropuesta`(
	IN _idPropuesta INT,
    IN _idRegistrador INT
)
BEGIN
	declare _usuarioAnulacion2 VARCHAR(100);
    SET _usuarioAnulacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idRegistrador);
    
    UPDATE Propuesta 
    SET activo = 0, usuarioAnulacion = _usuarioAnulacion2, fechaAnulacion = now()
    WHERE idPropuesta = _idPropuesta and activo = 1;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EnviarMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `EnviarMuestraMedicion`(
	IN _idMuestraMedicion INT,
    IN _idUsuarioModificacion int
)
BEGIN
	declare _nombreUsuario varchar(100);
    declare _param int;
    declare _idEsp int;
    #nombre del usuario
    select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
        into _nombreUsuario from Usuario u where idUsuario=_idUsuarioModificacion;

	UPDATE MuestraMedicion set enviado=1, fechaModificacion=now(), usuarioModificacion = _nombreUsuario
    where idMuestraMedicion=_idMuestraMedicion;
    
    select e.nombreCurso as nombreEspacio, e.codigo as codigoEspacio, mm.codigo as codigoMuestra,
    CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) AS usuarioMuestra,
    u2.correo as correo, m.codigo as codigoMedicion
    
    from MuestraMedicion mm
    inner join EspacioMedicion e on e.idEspacioMedicion = mm.fidEspacioMedicion
    inner join Medicion med on med.idMedicion = e.fidMedicion
    inner join Especialidad esp on esp.idEspecialidad = med.fidEspecialidad
    
    #inner join Perfil p on p.fidUsuario = _idUsuarioModificacion and p.activo=1 
    inner join Usuario u on u.idUsuario = _idUsuarioModificacion #check
    #inner join Perfil p on p.fidMuestra = mm.idMuestraMedicion and p.activo=1 and p.esAsistente=0
    inner join Perfil p2 on p2.fidEspecialidad = esp.idEspecialidad and p2.activo=1 
    inner join Usuario u2 on u2.idUsuario = p2.fidUsuario
    inner join Medicion m on m.idMedicion = e.fidMedicion
    where mm.idMuestraMedicion = _idMuestraMedicion;
    
    #guardar los parametros con los que fue enviada la medicion
    select med.fidEspecialidad into _idEsp
    from MuestraMedicion mm
    inner join EspacioMedicion e on e.idEspacioMedicion = mm.fidEspacioMedicion
    inner join Medicion med on med.idMedicion = e.fidMedicion
	where mm.idMuestraMedicion = _idMuestraMedicion;
    
	select p.idParametro into _param from Parametros p
    inner join Especialidad e on e.idNivel = p.idParametro
	where e.idEspecialidad = _idEsp;
    
    update IndicadorXMuestra 
    set fidParametroEnviado = _param
    where fidMuestraMedicion = _idMuestraMedicion and idIndicadorXMuestraMedicion>=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `estandarizarNumeroNiveles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `estandarizarNumeroNiveles`(
)
begin
	DECLARE done INT DEFAULT FALSE;
    DECLARE _idEspecialidad INT;
    DECLARE cur CURSOR FOR SELECT idEspecialidad FROM Especialidad;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO _idEspecialidad;
        IF done THEN
            LEAVE read_loop;
        END IF;

        CALL ActualizarParametroEspecialidad(_idEspecialidad, '3', '2', 95, 5); -- Reemplaza 123 por el valor de _usuarioModificacion que corresponda
        #call QuitarExcesoRubricasDeEspecialidad(_idEspecialidad,5);
        #SELECT _idEspecialidad AS Error;
    END LOOP;

    CLOSE cur;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `FotoUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `FotoUsuario`(
	IN _idUsuario INT
)
BEGIN
    if _idUsuario = (select rutaFoto from Usuario where idUsuario=_idUsuario) then
    select true as valor;
    else select false as valor;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `FotoUsuario2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `FotoUsuario2`(
	IN _idUsuario INT
)
BEGIN
	update Usuario
    set rutaFoto = _idUsuario
    where idUsuario=_idUsuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `HabilitarFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `HabilitarFacultad`(
	IN _idList VARCHAR(255),
    IN _usuarioModificacion varchar(60)
)
BEGIN
	declare _usuarioModificacion2 VARCHAR(100);
	SET _usuarioModificacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioModificacion);

	UPDATE Facultad 
    set Facultad.activo = 1, Facultad.usuarioModificacion = _usuarioModificacion2, fechaModificacion = now()
    WHERE FIND_IN_SET(idFacultad, _idList) and idFacultad > -1 and activo = 0;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `HabilitarUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `HabilitarUsuario`(
	IN _idUsuario INT,
    IN _idRegistrador INT
)
BEGIN
	declare _usuarioAnualacion2 VARCHAR(100);
    SET _usuarioAnualacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idRegistrador);
	UPDATE Usuario 
    SET activo = 1, usuarioModificacion = _usuarioAnualacion2, Usuario.fechaModificacion = now()
    WHERE idUsuario = _idUsuario and activo = 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarActividad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarActividad`(

	OUT _idActividad INT,
    in _fidPropuesta int,
    in _codigo varchar(45),
    in _descripcion varchar(300),
    in _fidEstadoPlan int,
    in _evidencia varchar(400),
    in _responsable varchar(400),
    in _usuarioCreacion varchar(100)
)
begin
	declare _usuarioCreacion2 VARCHAR(100);
    SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioCreacion);
    
	insert into Actividad (fidPropuesta,codigo,descripcion,evidencia,responsable,fidEstado,activo,fechaCreacion,usuarioCreacion)
    values (_fidPropuesta, _codigo, _descripcion,_evidencia,_responsable,_fidEstadoPlan, 1,now(), _usuarioCreacion2);
    
    SET _idActividad = @@last_insert_id;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarAlumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarAlumno`(
	out _idAlumno int,
	IN _nombre VARCHAR(200),
    IN _codigo VARCHAR(10), 
    in _usuarioCreacion int
    
)
BEGIN
	declare _nombreUsuario varchar(100);
    #nombre del usuario
    select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
        into _nombreUsuario from Usuario u where idUsuario=_usuarioCreacion;
	set _idAlumno = 0;
	IF NOT EXISTS (SELECT 1 FROM Alumno WHERE activo =1 and codigo = _codigo) THEN
		INSERT INTO Alumno (codigo, nombre, fechaCreacion, usuarioCreacion, activo)
		VALUES (_codigo, _nombre, NOW(), _nombreUsuario, 1);
        set _idAlumno = @@last_insert_id;
	END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarAlumnosMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarAlumnosMuestra`(
	out _idAlumnoMuestra int,
	IN _fidAlumno INT,
    IN _fidMuestraMedicion INT,
    in _usuarioCreacion int
)
BEGIN
	#verifico que el alumno no existe dentro del curso
    #primero saco el id del espacio
    declare _idEspacio int;
    declare _nombreUsuario varchar(100);
    #nombre del usuario
    select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
        into _nombreUsuario from Usuario u where idUsuario=_usuarioCreacion;
        
    select idEspacioMedicion into _idEspacio from EspacioMedicion em
    inner join MuestraMedicion mm on mm.fidEspacioMedicion = em.idEspacioMedicion
    where mm.idMuestraMedicion = _fidMuestraMedicion;
    set _idAlumnoMuestra=0;
    #si no existe un idAlumno activo dentro del espacio puedo insertarlo
	IF NOT EXISTS (SELECT 1
    FROM AlumnosMuestra am
    inner join MuestraMedicion mm on mm.idMuestraMedicion = am.fidMuestraMedicion
    inner join EspacioMedicion em on em.idEspacioMedicion = _idEspacio
    WHERE am.activo =1 and am.fidAlumno = _fidAlumno) THEN

        INSERT INTO AlumnosMuestra (fidAlumno, fidMuestraMedicion, resultados,fechaCreacion, usuarioCreacion, activo)
		VALUES (_fidAlumno, _fidMuestraMedicion, "0000000000",NOW(), _nombreUsuario, 1);
        
        set _idAlumnoMuestra=@@last_insert_id;
	END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarCicloAcademico` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarCicloAcademico`(
	OUT _idCicloAcademico INT,
    IN _anio VARCHAR(4),
    IN _semestre VARCHAR(1),
    IN _fechaInicio DATE,
    IN _fechaFIn DATE,
    IN _usuarioCreacion int
)
BEGIN
    DECLARE C INT;
    DECLARE MSG0 VARCHAR(200);
	declare _nombreUsuario varchar(100);
    DECLARE _nombre VARCHAR(45);
    
    set _idCicloAcademico=0;
    
    SET _nombre = CONCAT(_anio, '-', _semestre);

    SET MSG0 = CONCAT('Ya existe un ciclo registrado con codigo ', _nombre, '.');
    SELECT count(*) INTO C FROM cicloAcademico WHERE nombre = _nombre and activo = 1;
    IF (C != 0) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;

    SET MSG0 = CONCAT('La fecha inicial del ciclo no puede ser posterior a la fecha final');
    IF (_fechaInicio >= _fechaFin) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;
    
	select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioCreacion;
    
	INSERT INTO acredipucp2.cicloAcademico (idCicloAcademico, anio, semestre, nombre, fechaInicio, fechaFin, fechaCreacion, usuarioCreacion, activo)
	VALUES (CAST(_anio AS SIGNED) * 10 + CAST(_semestre AS SIGNED),_anio, _semestre, _nombre, _fechaInicio, _fechaFin, now(), _nombreUsuario, 1)
    ON DUPLICATE KEY UPDATE fechaInicio = _fechaInicio, fechaFin = _fechaFin, fechaModificacion = now(), usuarioModificacion = _nombreUsuario, activo = 1;
	SET _idCicloAcademico = @@last_insert_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarCodigoRecuparContrasenia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarCodigoRecuparContrasenia`(
	OUT _codigoCodigosRecuperarContrasenia VARCHAR(10),
    IN _fidUsuario INT
)
BEGIN
	DECLARE _codigoCodigosRecuperarContrasenia2 VARCHAR (100);
	SET _codigoCodigosRecuperarContrasenia = CONCAT(
    SUBSTRING(CONV(FLOOR(RAND() * 99999999), 10, 36), 1, 2),
    SUBSTRING(CONV(FLOOR(RAND() * 99999999), 10, 36), 1, 2),
    SUBSTRING(CONV(FLOOR(RAND() * 99999999), 10, 36), 1, 2),
    SUBSTRING(CONV(FLOOR(RAND() * 99999999), 10, 36), 1, 2),
    SUBSTRING(CONV(FLOOR(RAND() * 99999999), 10, 36), 1, 2)
	); -- GENERO UN VARCHAR DE 10 CARACTERES
    
    -- ahora lo hago md5
    set _codigoCodigosRecuperarContrasenia2 = MD5(_codigoCodigosRecuperarContrasenia);
    
    call AnularCodigoRecuparContrasenia(_fidUsuario);
	INSERT INTO CodigosRecuperarContrasenia
    (fidUsuario, codigo, fechaCreacion, activo) 
    VALUES (_fidUsuario, _codigoCodigosRecuperarContrasenia2, NOW(), 1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarCompetencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarCompetencia`(
	OUT _idCompetencia INt,
    -- IN _fidObjetivoEducacional INT,
    in _fidEspecialidad int,
	in _descripcion VARCHAR (300), 
	in _codigoCompetencia VARCHAR(45),
    in _usuarioCreacion VARCHAR (100),
    in _evidencia VARCHAR (200)
)
BEGIN
    DECLARE C INT;
    DECLARE MSG0 VARCHAR(200);
    DECLARE _usuarioCreacion2 VARCHAR(100);
    
    SET MSG0 = CONCAT('Ya existe una competencia registrada con codigo ', _codigoCompetencia);
    SELECT count(*) INTO C FROM Competencia WHERE codigoCompetencia = _codigoCompetencia;
    IF (C != 0) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;
    
    SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioCreacion);
	INSERT INTO Competencia
    (fidEspecialidad, descripcion, codigoCompetencia, fechaCreacion, usuarioCreacion, evidencia, activo) 
    VALUES (_fidEspecialidad, _descripcion, _codigoCompetencia, NOW(), _usuarioCreacion2, _evidencia,1);
    SET _idCompetencia = @@last_insert_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarEspacioMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarEspacioMedicion`(
    IN _fidMedicion INT,
    IN _cicloAcademico VARCHAR(50),
    IN _codigo VARCHAR(10),
    IN _nombreCurso VARCHAR(50),
    IN _fechaLimite DATE,
    IN _tipoMedicion VARCHAR(10),
    IN _usuarioCreacion VARCHAR(100)
)
BEGIN
	declare _fidCicloAcademico int;
    declare _idEspacioMedicion int;
    set _fidCicloAcademico= (SELECT idCicloAcademico from cicloAcademico where nombre=_cicloAcademico);
    
    INSERT INTO acredipucp2.EspacioMedicion
    (fidMedicion, fidCicloAcademico, codigo, nombreCurso, fechaLimite, tipoMedicion, indicadoresConfigurados, fechaCreacion, usuarioCreacion, activo) 
    VALUES (_fidMedicion, _fidCicloAcademico, _codigo, _nombreCurso, _fechaLimite, _tipoMedicion, 0,NOW(), _usuarioCreacion, 1);
    
    set _idEspacioMedicion=@@last_insert_id;
    SELECT _idEspacioMedicion AS ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarEspacioMedicionMasivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarEspacioMedicionMasivo`()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE total_rows INT;
    DECLARE current_value INT;
    DECLARE _idCiclo INT;
	DECLARE _idUsuario INT;
    DECLARE _usuario VARCHAR(200);
    DECLARE _idEspacio INT;
    DECLARE _idMuestra INT;
    DECLARE asignada INT;
    DECLARE asignada2 INT;
    DECLARE _idIndicar INT;
    DECLARE _evaind VARCHAR(10);
    DECLARE _evaluar varchar(10);
    DECLARE _evaluar2 varchar(10);
    SET total_rows = (SELECT COUNT(*) FROM temp_Esp);
	SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario inner join temp_Esp on idUsuario=idUsuarioCreacion where idTemp=1);
    SET _idCiclo = (select idcicloAcademico from cicloAcademico inner join temp_Esp on nombre=periodo where idTemp=1 );
	INSERT INTO EspacioMedicion(fidMedicion,fidCicloAcademico,codigo,nombreCurso,
	fechaLimite,tipoMedicion,indicadoresConfigurados,fechaCreacion,usuarioCreacion,activo)
	SELECT  idMedicion,_idCiclo,codigo,nombreCurso,fechaLimite,tipoMedicion,
	0,now(),_usuario,1 FROM temp_Esp where idTemp=1;
	SET _idEspacio = @@last_insert_id;
   	UPDATE temp_Esp
	SET idEspacioMedicion=_idEspacio where idTemp=1;
	WHILE i <= total_rows DO
		set _evaluar = (SELECT horario FROM temp_Esp where idTemp=1);
        UPDATE temp_Esp
		SET idEspacioMedicion=_idEspacio where idTemp=i;
		SET _idUsuario = (select ifnull( (select idUsuario from Usuario inner join temp_Esp on codigoPUCP=codDocente where idTemp=i ),"0") as result);
		SET _idIndicar = (select ifnull( (select fidIndicador from temp_Esp where idTemp=i ),"0") as result);
		UPDATE temp_Esp SET activo=1,esAuditor=0,esAdministrador=0,nivelAcceso=3,esAsistente=0,nombrePerfil="Responsable de Medición",fidUsuario = _idUsuario,fidCicloAcademico=_idCiclo, tipoMedicion="Directa", indicadoresConfigurados=0,
		fechaCreacion=now(), usuarioCreacion= _usuario where idTemp=i;
		if _evaluar != '' then
			SET _idMuestra = (select ifnull( (select distinct e.idMuestraMedicion from MuestraMedicion e inner join temp_Esp t on  e.fidEspacioMedicion=t.idEspacioMedicion where e.codigo=t.horario and e.fidEspacioMedicion=_idEspacio and t.idTemp=i),"0") as result);
			UPDATE temp_Esp SET fidMuestra=_idMuestra where idTemp=i; 
			if _idMuestra=0 then
				INSERT INTO MuestraMedicion (fidEspacioMedicion,codigo,enviado,fechaCreacion,usuarioCreacion,activo)
				SELECT  idEspacioMedicion,horario,0,now(),usuarioCreacion,1 FROM temp_Esp where idTemp=i;
				SET _idMuestra = @@last_insert_id;
				UPDATE temp_Esp
				SET fidMuestra=_idMuestra where idTemp=i; 
				INSERT INTO Perfil (fidUsuario,nivelAcceso,fidMuestra,esAsistente,nombrePerfil,esAdministrador,fechaCreacion,usuarioCreacion,esAuditor,activo)
				SELECT _idUsuario,3,_idMuestra,0,"Responsable de Medición",0,now(),_usuario,0,1 FROM temp_Esp where idTemp=i;
				SET _evaluar2 = (SELECT fidIndicador FROM temp_Esp where idTemp=i);
				if _evaluar2 != 0 then
					INSERT INTO IndicadorXMuestra (fidIndicador,fidMuestraMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
					SELECT fidIndicador,_idMuestra,evidencia,usuarioCreacion,now(),1 FROM temp_Esp where idTemp=i;
					call ActualizarPosicionIndicadorMuestra(_idMuestra,_idIndicar);
                    UPDATE EspacioMedicion SET indicadoresConfigurados=1 where idEspacioMedicion=_idEspacio;
				end if;
			else 
				SET asignada= (select count(*) from Perfil p inner join temp_Esp t on  p.fidMuestra = t.fidMuestra where p.fidUsuario=t.fidUsuario and t.fidMuestra=_idMuestra and t.idTemp=i);
				SET asignada2= (select count(*) from IndicadorXMuestra p inner join temp_Esp t on  p.fidMuestraMedicion = t.fidMuestra where p.fidIndicador=t.fidIndicador and t.fidMuestra=_idMuestra and t.idTemp=i);
				if asignada=0 then
					INSERT INTO Perfil (fidUsuario,nivelAcceso,fidMuestra,esAsistente,nombrePerfil,esAdministrador,fechaCreacion,usuarioCreacion,esAuditor,activo)
					SELECT fidUsuario,nivelAcceso,fidMuestra,esAsistente,nombrePerfil,esAdministrador,now(),usuarioCreacion,esAuditor,1 FROM temp_Esp where idTemp=i;
				end if;
				if asignada2=0 then
					SET _evaind = (select ifnull((select distinct e.fidEspacioMedicion from EspacioXIndicador e inner join temp_Esp t on e.fidIndicador=t.fidIndicador  where  _idEspacio = e.fidEspacioMedicion and e.fidIndicador=t.fidIndicador AND t.idTemp=i),"0") as result);
					if _evaind = 0 THEN
						INSERT INTO EspacioXIndicador (fidIndicador,fidEspacioMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
						SELECT fidIndicador,_idEspacio,evidencia,usuarioCreacion,now(),activo FROM temp_Esp where idTemp=i;
						UPDATE EspacioMedicion SET indicadoresConfigurados=1 where idEspacioMedicion=_idEspacio;
					end if;
					INSERT INTO IndicadorXMuestra (fidIndicador,fidMuestraMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
					SELECT fidIndicador,fidMuestra,evidencia,usuarioCreacion,now(),1 FROM temp_Esp where idTemp=i;
					call ActualizarPosicionIndicadorMuestra(_idMuestra,_idIndicar);
				end if;
			end if;
		end if;
        SET _evaluar2 = (SELECT fidIndicador FROM temp_Esp where idTemp=i);
		if _evaluar2 != 0 then
		SET _evaind = (select ifnull((select distinct e.fidEspacioMedicion from EspacioXIndicador e inner join temp_Esp t on e.fidIndicador=t.fidIndicador  where  _idEspacio = e.fidEspacioMedicion and e.fidIndicador=t.fidIndicador AND t.idTemp=i),"0") as result);
		if _evaind = 0 THEN
			INSERT INTO EspacioXIndicador (fidIndicador,fidEspacioMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
			SELECT fidIndicador,_idEspacio,evidencia,usuarioCreacion,now(),activo FROM temp_Esp where idTemp=i;
			UPDATE EspacioMedicion SET indicadoresConfigurados=1 where idEspacioMedicion=_idEspacio;
		end if;
        END IF;
        SET i = i + 1;
    END WHILE;
    select true as t;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarEspacioYMedicionMasivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarEspacioYMedicionMasivo`(
    in _idMedicion int,
	in _periodo varchar(10),
    in _anio int,
    in _semestre int,
    in _codigoCurso VARCHAR(10),
    In _nombreCurso VARCHAR(100),
    in _fechaLimite datetime,
    in _idUsuarioCreacion int,
    in _horario varchar(10),
    in _codDocente int
)
begin
	Declare _idciclo int;
    Declare _idEspacioMedicion int;
    Declare  _idMuestraMedicion int;
    Declare _usuarioCreacion varchar(100);
    Declare _idDocente int;
    Declare _idPerfil int;
    set _idDocente = (SELECT idUsuario from Usuario where codigoPUCP=_codDocente);
    if _idDocente!=0 then
		SET _usuarioCreacion = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idUsuarioCreacion);
		set _idCiclo = (select idcicloAcademico from cicloAcademico where nombre=_periodo);
		set _idEspacioMedicion = (select idEspacioMedicion from EspacioMedicion where codigo=codigoCurso and idMedicion=_idMedicion);
        if _idCiclo = 0 then 
			INSERT INTO idcicloAcademico
				(anio,semestre,nombre) 
			VALUES (_anio,_semestre,_periodo);
			INSERT INTO idcicloAcademico
			set _idCiclo= @@last_insert_id;
		end if;
		if _idEspacioMedicion = 0 then 
			INSERT INTO idEspacioMedicion
				(fidMedicion,fidCicloAcademico,codigo,nombreCurso,fechaLimite,tipoMedicion,indicadoresConfigurados,fechaCreacion,usuarioCreacion,activo) 
			VALUES (_idMedicion,_idCiclo,_codigoCurso,_nombreCurso,_fechaLimite,"Directa",0,now(),_usuarioCreacion,1);
			set _idEspacioMedicion =  @@last_insert_id;
			INSERT INTO MuestraMedicion
				(fidEspacioMedicion,codigo,enviado,fechaCreacion,usuarioCreacion,activo) 
			VALUES (_idEspacioMedicion,_horario,0,now(),_usuarioCreacion,1);
			set _idMuestraMedicion =  @@last_insert_id;
			INSERT INTO Perfil
				(fidUsuario,fidMuestra,esAsistente,nivelAcceso,nombrePerfil,esAdministrador,esAuditor,fechaCreacion,usuarioCreacion,activo) 
			VALUES (_idDocente,_idMuestraMedicion,0,3,"Responsable de Medición",0,0,now(),_usuarioCreacion,1);
		else 
			set _idMuestraMedicion = (select idMuestraMedicion from MuestraMedicion where fidEspacioMedicion=_idEspacioMedicion and _horario=codigo);
			if _idMuestraMedicion = 0 then
				INSERT INTO MuestraMedicion
				(fidEspacioMedicion,codigo,enviado,fechaCreacion,usuarioCreacion,activo) 
				VALUES (_idEspacioMedicion,_horario,0,now(),_usuarioCreacion,1);
				set _idMuestraMedicion =  @@last_insert_id;
				INSERT INTO Perfil
				(fidUsuario,fidMuestra,esAsistente,nivelAcceso,nombrePerfil,esAdministrador,esAuditor,fechaCreacion,usuarioCreacion,activo) 
				VALUES (_idDocente,_idMuestraMedicion,0,3,"Responsable de Medición",0,0,now(),_usuarioCreacion,1);            
            else 
				set _idPerfil = (select idPerfil from Perfil where fidUsuario=_idDocente and fidMuestra=_idMuestraMedicion);
					if _idPerfil = 0 then
					INSERT INTO Perfil
					(fidUsuario,fidMuestra,esAsistente,nivelAcceso,nombrePerfil,esAdministrador,esAuditor,fechaCreacion,usuarioCreacion,activo) 
					VALUES (_idDocente,_idMuestraMedicion,0,3,"Responsable de Medición",0,0,now(),_usuarioCreacion,1);  
				end if;
            end if;
		end if;
        select 1 as ID;
	else 
		select 0 as ID;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarEspecialidad`(
    OUT _idEspecialidad INT,
    IN _nombreEspecialidad VARCHAR(60),
    IN _codigoEspecialidad VARCHAR(10),
    IN _fidFacultad INT,
    IN _correo VARCHAR(200),
    IN _usuarioCreacion int
)
BEGIN
	declare _nombreUsuario varchar(100);
	select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioCreacion;
    set _idEspecialidad=0;
    
    if not exists(select 1 from Especialidad where codigoEspecialidad=_codigoEspecialidad and activo=1) then
		INSERT INTO Especialidad (nombreEspecialidad,codigoEspecialidad,fidFacultad,correo,fechaCreacion,usuarioCreacion,activo)
		VALUES(_nombreEspecialidad,_codigoEspecialidad,_fidFacultad,_correo,now(),_nombreUsuario,1);
		SET _idEspecialidad = @@last_insert_id;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarFacultad`(
    OUT _idFacultad INT,
    IN _nombreFacultad varchar(60),
    IN _codigoFacultad VARCHAR(10),
    IN _tieneEspecialidad tinyint(1),
    IN _correo VARCHAR(200),
    IN _usuarioCreacion int
)
BEGIN
	declare _nombreUsuario varchar(100);
	select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioCreacion;
    set _idFacultad=0;

	if not exists(select 1 from Facultad where codigoFacultad=_codigoFacultad and activo=1) then
		INSERT INTO Facultad (codigoFacultad,correo,tieneEspecialidad,nombreFacultad,fechaCreacion,usuarioCreacion,activo)
		VALUES(_codigoFacultad,_correo,_tieneEspecialidad,_nombreFacultad,now(),_nombreUsuario,1);
		SET _idFacultad = @@last_insert_id;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarIndicador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarIndicador`(
    IN _fidCompetencia INT,
    IN _descripcion VARCHAR(200),
    IN _niveles INT,
    IN _minimoAprobatorio INT,
    IN _codigo VARCHAR (45),
    IN _usuarioCreacion VARCHAR(100)
)
BEGIN
	declare _usuarioCreacion2 VARCHAR(100);
    declare _valor INT;
    SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioCreacion);
	INSERT INTO Indicador
    (fidCompetencia, descripcion, niveles, minimoAprobatorio, codigo, fechaCreacion, usuarioCreacion, activo) 
    VALUES (_fidCompetencia, _descripcion, _niveles, _minimoAprobatorio, _codigo, NOW(), _usuarioCreacion2, 1);
    SET _valor = @@last_insert_id;
    call ActualizarParamIndicador(_valor);
    SELECT  _valor AS ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarIndicadoresEspaciosYMuestras` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarIndicadoresEspaciosYMuestras`(
	IN _fidMedicion INT,
    IN _usuarioCreacion VARCHAR(200)
)
BEGIN
	DECLARE done INT DEFAULT FALSE;
    DECLARE _emId INT;
    DECLARE cur CURSOR FOR select idEspacioMedicion
    from  EspacioMedicion em
     where em.activo = 1 and em.fidMedicion=_idMedicion;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    read_loop: LOOP
		FETCH cur INTO _emId;
        IF done THEN LEAVE read_loop;
        END IF;
        CALL InsertarTodosLosIndicadoresMuestraMedicion(_emId,_usuarioCreacion);
    END LOOP;
    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarIndicadorEspacioXMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarIndicadorEspacioXMuestraMedicion`(
	OUT _idIndicadorEspacioXMuestraMedicion INT,
	IN _fidIndicadorXEspacio INT,
	IN _fidMuestraMedicion INT,
    IN _usuarioCreacion VARCHAR(200)
)
BEGIN
	INSERT INTO IndicadorEspacioXMuestraMedicion
    (fidIndicadorXEspacio, fidMuestraMedicion, fechaCreacion, usuarioCreacion, activo) 
    VALUES (_fidIndicadorXEspacio, _fidMuestraMedicion, NOW(), _usuarioCreacion, 1);
    SET _idIndicadorEspacioXMuestraMedicion = @@last_insert_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertarIndicadorTodos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `insertarIndicadorTodos`(
)
BEGIN
	DECLARE i INT DEFAULT 1;
    DECLARE total_rows INT;
    DECLARE _usuario VARCHAR(200);
    DECLARE _posicionResultado INT;
    DECLARE _idIndicador INT;
    DECLARE _idEspacioMedicion INT;
    DECLARE _evidencia VARCHAR(400);
    SET total_rows = (SELECT COUNT(*) FROM temp_Esp);
	SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario inner join temp_Esp on idUsuario=idUsuarioCreacion where idTemp=1);
    WHILE i <= total_rows DO
    SET _idEspacioMedicion = (select idEspacioMedicion from temp_Esp where idTemp=i);
    SET _idIndicador = (select idIndicador from temp_Esp where idTemp=i);
    SET _evidencia = (select evidencia from temp_Esp where idTemp=i);
    SET _posicionResultado = (select ifnull((select distinct max(posicionResultado) from IndicadorXMuestra inner join MuestraMedicion on fidMuestraMedicion = idMuestraMedicion where fidEspacioMedicion=_idEspacioMedicion),"-1") as result);
    if _posicionResultado='-1' then
    INSERT INTO EspacioXIndicador (fidIndicador,fidEspacioMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
	VALUE (_idIndicador,_idEspacioMedicion,_evidencia,_usuario,now(),1);
    INSERT IGNORE INTO IndicadorXMuestra (fidIndicador,fidMuestraMedicion,evidencia,usuarioCreacion,fechaCreacion,activo,posicionResultado)
	select distinct _idIndicador,idMuestraMedicion,_evidencia,_usuario,now(),1,0 from MuestraMedicion inner join EspacioMedicion on idEspacioMedicion=fidEspacioMedicion where idEspacioMedicion=_idEspacioMedicion;
    UPDATE EspacioMedicion SET indicadoresConfigurados=1 where idEspacioMedicion=_idEspacioMedicion;
    else 
    INSERT INTO EspacioXIndicador (fidIndicador,fidEspacioMedicion,evidencia,usuarioCreacion,fechaCreacion,activo)
	VALUE (_idIndicador,_idEspacioMedicion,_evidencia,_usuario,now(),1);
    INSERT IGNORE INTO IndicadorXMuestra (fidIndicador,fidMuestraMedicion,evidencia,usuarioCreacion,fechaCreacion,activo,posicionResultado)
	select distinct _idIndicador,idMuestraMedicion,_evidencia,_usuario,now(),1,_posicionResultado+1 from MuestraMedicion inner join EspacioMedicion on idEspacioMedicion=fidEspacioMedicion where idEspacioMedicion=_idEspacioMedicion;
	UPDATE EspacioMedicion SET indicadoresConfigurados=1 where idEspacioMedicion=_idEspacioMedicion;
    end if;
    SET i = i + 1;
    END WHILE;
    select true as t;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarIndicadorXEspacioMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarIndicadorXEspacioMedicion`(
	OUT _idIndicadorXEspacioMedicion INT,
    IN _fidEspacioMedicion INT,
    IN _fidIndicador INT,
    IN _usuarioCreacion VARCHAR(100)
)
BEGIN
	INSERT INTO IndicadorXEspacioMedicion
    (fidEspacioMedicion, fidIndicador, fechaCreacion, usuarioCreacion, activo) 
    VALUES (_fidEspacioMedicion, _fidIndicador, NOW(), _usuarioCreacion, 1);
    SET _idIndicadorXEspacioMedicion = @@last_insert_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarIndicadorXMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarIndicadorXMuestra`(
	IN _fidIndicador INT,
    IN _fidMuestraMedicion INT,
    in _posicionResultado int,
    in _usuarioCreacion VARCHAR(100)
)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM IndicadorXMuestra WHERE activo =1 and fidIndicador = _fidIndicador and fidMuestraMedicion=_fidMuestraMedicion) THEN
		INSERT INTO IndicadorXMuestra (fidIndicador, fidMuestraMedicion, posicionResultado, fechaCreacion, usuarioCreacion, activo)
		VALUES (_fidIndicador, _fidMuestraMedicion, _posicionResultado, NOW(), _usuarioCreacion, 1);
	END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarMedicion`(
	OUT _idMedicion INT,
    IN _fidEspecialidad INT,
    IN _fidCicloInicio INT,
    IN _fidCicloFin INT,
    IN _codigo VARCHAR(10),
    IN _usuarioCreacion VARCHAR(100)
)
BEGIN
	declare _usuarioCreacion2 VARCHAR(100);
    SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioCreacion);
    INSERT INTO acredipucp2.Medicion
    (fidEspecialidad, fidCicloInicio, fidCicloFin, codigo, fechaCreacion, usuarioCreacion, activo, completada) 
    VALUES (_fidEspecialidad, _fidCicloInicio, _fidCicloFin, _codigo, NOW(), _usuarioCreacion2, 1, 0);
    SET _idMedicion = @@last_insert_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarMuestraMedicion`(
	OUT _idMuestraMedicion INT,
    IN _fidEspacioMedicion INT,
    IN _codigo VARCHAR(10),
    IN _usuarioCreacion VARCHAR(100),
    IN _codigoUsuario VARCHAR(100)
)
BEGIN
	declare _usuarioCreacion2 VARCHAR(100);
    declare _fidUsuario int;
    
    SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioCreacion);
    INSERT INTO acredipucp2.MuestraMedicion
    (fidEspacioMedicion, codigo, enviado,fechaCreacion, usuarioCreacion, activo) 
    VALUES (_fidEspacioMedicion, _codigo,0,NOW(), _usuarioCreacion2, 1);
    
    SET _fidUsuario = (SELECT idUsuario from Usuario where codigoPUCP=_codigoUsuario);
    
    SET _idMuestraMedicion = @@last_insert_id;
    sET  @ROW_ID = 0; 
    CALL `acredipucp2`.`InsertarPerfil`(@ROW_ID, _fidUsuario, _idMuestraMedicion ,0,3, _usuarioCreacion2);
    
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertarMuestraMedicionTodos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `insertarMuestraMedicionTodos`(
		IN _idEspacioMedicion int,
        IN _horario varchar(10),
        IN _codDocente VARCHAR(20),
        IN _idUsuarioCreacion INT
)
BEGIN
    DECLARE _idMuestra INT;
    DECLARE _usuario varchar(100);
    DECLARE _idUsuario INT;
    DECLARE cuenta INT;
    SET _idUsuario = (select ifnull( (select idUsuario from Usuario where codigoPUCP=_codDocente),"0") as result);
    SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idUsuarioCreacion);
	INSERT INTO MuestraMedicion (fidEspacioMedicion,codigo,enviado,fechaCreacion,usuarioCreacion,activo)
	VALUES (_idEspacioMedicion,_horario,0,now(),_usuario,1);
	SET _idMuestra = @@last_insert_id;
	INSERT IGNORE INTO Perfil (fidUsuario,nivelAcceso,fidMuestra,esAsistente,nombrePerfil,esAdministrador,fechaCreacion,usuarioCreacion,esAuditor,activo)
	VALUE (_idUsuario,3,_idMuestra,0,"Responsable de Medición",0,now(),_usuario,0,1);
	SET cuenta = (select count(*) from IndicadorXMuestra inner join MuestraMedicion on fidMuestraMedicion = idMuestraMedicion where fidEspacioMedicion=_idEspacioMedicion);
	if cuenta != 0 then
    INSERT IGNORE INTO IndicadorXMuestra (fidIndicador,fidMuestraMedicion,evidencia,usuarioCreacion,fechaCreacion,activo,posicionResultado)
	select distinct fidIndicador,_idMuestra,evidencia,_usuario,now(),1,posicionResultado  from IndicadorXMuestra inner join MuestraMedicion on fidMuestraMedicion = idMuestraMedicion where fidEspacioMedicion=_idEspacioMedicion;
    else 
    SET @i = -1;
    INSERT IGNORE INTO IndicadorXMuestra (fidIndicador,fidMuestraMedicion,evidencia,usuarioCreacion,fechaCreacion,activo,posicionResultado)
	select distinct fidIndicador,_idMuestra,evidencia,_usuario,now(),1,@i:=@i+1 from EspacioXIndicador where fidEspacioMedicion=_idEspacioMedicion;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarNotaAlumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarNotaAlumno`(
    in _idResultadoIndicador int,
    in _nota int
)
begin
	update ResultadoIndicador
    set resultadoAlumno=_nota
    where idResultadoIndicador = _idResultadoIndicador and activo=1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarNotaAlumno2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarNotaAlumno2`(
	in _idAlumnosMuestra int,
    in _resultados VARCHAR(400)
)
BEGIN
	update AlumnosMuestra set resultados = _resultados where idAlumnosMuestra=_idAlumnosMuestra;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarObjetivoEducacional` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarObjetivoEducacional`(
	OUT _idObjetivoEducacional INt,
	in _fidEspecialidad INT,
    in _sumilla varchar(130),
	in _descripcion VARCHAR (300), 
	in _codigoObjetivo VARCHAR(45),
    in _usuarioCreacion VARCHAR (100)
)
BEGIN
    DECLARE _usuarioCreacion2 VARCHAR(200);
    
    IF NOT EXISTS (SELECT 1 FROM ObjetivoEducacional 
    WHERE activo =1 and codigoObjetivo = _codigoObjetivo and _fidEspecialidad = fidEspecialidad ) THEN
    
    SET _usuarioCreacion2 = (SELECT CONCAT(nombres, ' ', apellidoPaterno) FROM Usuario WHERE idUsuario = _usuarioCreacion);
    
	INSERT INTO ObjetivoEducacional
    (fidEspecialidad, sumilla, descripcion, codigoObjetivo, fechaCreacion, usuarioCreacion, activo) 
    VALUES (_fidEspecialidad,_sumilla,  _descripcion, _codigoObjetivo, NOW(), _usuarioCreacion2, 1);
    SET _idObjetivoEducacional = @@last_insert_id;
    
    else SET _idObjetivoEducacional = 0;
    
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarParametros` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarParametros`(
    OUT _idParametro INT,
    IN _niveles VARCHAR(2),
    IN _minimoAprobatorio VARCHAR(2),
    IN _porcentajeMinimo DOUBLE,
    IN _usuarioCreacion int
)
BEGIN
	declare _nombreUsuario varchar(100);
    #nombre del usuario
    select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
        into _nombreUsuario from Usuario u where idUsuario=_usuarioCreacion;
    INSERT INTO Parametros (niveles,minimoAprobatorio,porcentajeMinimo,fechaCreacion,usuarioCreacion,activo)
    VALUES(_niveles,_minimoAprobatorio,_porcentajeMinimo,now(),_nombreUsuario,1);
    SET _idParametro = @@last_insert_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarPerfil` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarPerfil`(
    OUT _idPerfil INT,
    IN _fidUsuario INT,
    IN _fidResponsabilidad INT,
    IN _esAsistente INT,
    IN _nivelAcceso INT,
    IN _usuarioCreacion VARCHAR(100),
    out _correoUser varchar(200),
    out _tipo varchar(200),
    out _primerPerfil int
)
BEGIN
	declare _usuarioCreacion2 VARCHAR(100);
    declare _texto varchar(300);
    DECLARE C INT;
    SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioCreacion);
	IF _nivelAcceso = 0 THEN
		INSERT INTO Perfil
		(fidUsuario,esAsistente,nivelAcceso,nombrePerfil,esAdministrador,esAuditor,fechaCreacion,usuarioCreacion,activo) 
		VALUES (_fidUsuario,_esAsistente,_nivelAcceso,"Administrador",1,0,now(),_usuarioCreacion2,1);
        set _tipo = "Administrador";
	ELSEIF _nivelAcceso = 4 THEN
		INSERT INTO Perfil
		(fidUsuario,fidFacultad,esAsistente,nivelAcceso,nombrePerfil,esAdministrador,esAuditor,fechaCreacion,usuarioCreacion,activo) 
		VALUES (_fidUsuario,_fidResponsabilidad,_esAsistente,_nivelAcceso,"Auditor",0,1,now(),_usuarioCreacion2,1);
        
        set _tipo = "Auditor";
    ELSEIF _nivelAcceso = 1 THEN
		INSERT INTO Perfil
		(fidUsuario,fidFacultad,esAsistente,nivelAcceso,nombrePerfil,esAdministrador,esAuditor,fechaCreacion,usuarioCreacion,activo) 
		VALUES (_fidUsuario,_fidResponsabilidad,_esAsistente,_nivelAcceso,IF(_esAsistente = 1, "Asistente de Facultad", "Responsable de Facultad"),0,0,now(),_usuarioCreacion2,1);
        
        set _tipo = concat(IF(_esAsistente = 1, "Asistente de Facultad", "Responsable de Facultad"),' de ', 
        (select nombreFacultad from Facultad where idFacultad=_fidResponsabilidad));
	ELSEIF _nivelAcceso = 2 THEN
		INSERT INTO Perfil
		(fidUsuario,fidEspecialidad,esAsistente,nivelAcceso,nombrePerfil,esAdministrador,esAuditor,fechaCreacion,usuarioCreacion,activo) 
		VALUES (_fidUsuario,_fidResponsabilidad,_esAsistente,_nivelAcceso,IF(_esAsistente = 1, "Asistente de Especialidad", "Responsable de Especialidad"),0,0,now(),_usuarioCreacion2,1);
	
		set _tipo = concat(IF(_esAsistente = 1, "Asistente de Especialidad", "Responsable de Especialidad"),' de ', 
        (select nombreEspecialidad from Especialidad where idEspecialidad=_fidResponsabilidad));
        
    elseif _nivelAcceso = 3 then
		INSERT INTO Perfil
		(fidUsuario,fidMuestra,esAsistente,nivelAcceso,nombrePerfil,esAdministrador,esAuditor,fechaCreacion,usuarioCreacion,activo) 
		VALUES (_fidUsuario,_fidResponsabilidad,_esAsistente,_nivelAcceso,"Responsable de Medición",0,0,now(),_usuarioCreacion2,1);
        
        set _tipo = concat("Responsable de Medición del horario ", 
        (select codigo from MuestraMedicion where idMuestraMedicion=_fidResponsabilidad),
        " del curso ", 
        (select nombreCurso from EspacioMedicion em
		inner join MuestraMedicion mm 
        on mm.fidEspacioMedicion = em.idEspacioMedicion
		where mm.idMuestraMedicion = _fidResponsabilidad));
        
    END IF;
	SET _idPerfil = @@last_insert_id;
    select correo into _correoUser from Usuario where idUsuario = _fidUsuario;
    select count(*) into C from Perfil where fidUsuario = _fidUsuario;
    SET _primerPerfil = 0;
    IF (C = 1) THEN
		SET _primerPerfil = 1;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarPerfilMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarPerfilMuestra`(
	OUT _idPerfil INT,
    IN _fidUsuario INT,
    IN _nivelAcceso INT,
    IN _fidMuestra INT,
    IN _esAsistente INT,
    IN _nombrePerfil VARCHAR(60),
    IN _usuarioCreacion VARCHAR(100)
)
BEGIN
    INSERT INTO acredipucp2.Perfil
    (fidUsuario, nivelAcceso, fidMuestra, esAsistente, nombrePerfil, fechaCreacion, usuarioCreacion, activo) 
    VALUES (_fidUsuario, _nivelAcceso, _fidMuestra, _esAsistente, _nombrePerfil, NOW(), _usuarioCreacion, 1);
    SET _idPerfil = @@last_insert_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarPlanMejora` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarPlanMejora`(
	out _idPlanMejora int,
	in _fidEspecialidad int,
    in _fidEstadoPlan int,
    in _codigo varchar(45),
    in _descripcion varchar(300),
    in _usuarioCreacion varchar(100)
)
begin
	DECLARE C INT;
    DECLARE MSG0 VARCHAR(200);
	declare _usuarioCreacion2 VARCHAR(100);
    
    SET MSG0 = CONCAT('Ya existe un plan de mejora registrado con codigo ', _codigo);
    SELECT count(*) INTO C FROM PlanMejora WHERE codigo = _codigo and fidEspecialidad=_fidEspecialidad;
    IF (C != 0) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;
    
    SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioCreacion);
    
	insert into PlanMejora (fidEspecialidad,fidEstado,codigo,descripcion,activo,fechaCreacion,usuarioCreacion)
    values (_fidEspecialidad, _fidEstadoPlan,_codigo, _descripcion, 1,now(), _usuarioCreacion2);
    set _idPlanMejora = @@last_insert_id;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarPropuesta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarPropuesta`(
    in _fidPlanMejora int,
    in _codigo varchar(45),
    in _descripcion varchar(300),
    in _usuarioCreacion varchar(100)
)
begin
	declare _usuarioCreacion2 VARCHAR(100);
    declare _idPropuesta int;
    SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioCreacion);
    
	insert into Propuesta (fidPlanMejora,codigo,descripcion,activo,fechaCreacion,usuarioCreacion)
    values (_fidPlanMejora, _codigo, _descripcion, 1,now(), _usuarioCreacion2);
    
    set _idPropuesta=@@last_insert_id;
    SELECT _idPropuesta AS ID;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarResponsableFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarResponsableFacultad`(
	OUT _verificacion INT,
    IN _fidUsuario INT,
    IN _fidResponsabilidad INT,
    IN _esAsistente INT,
    IN _usuarioCreacion int
)
begin
	declare _nombreUsuario varchar(100);
    select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioCreacion;
	set _verificacion = 0;
    # verifico que no exista ya un responsable que no sea asistente (en caso no sea asistente)
    if _esAsistente=0 then
		if not exists (select 1 from Perfil where activo=1 and fidFacultad=_fidResponsabilidad and esAsistente=0) then
		call InsertarPerfil(@idPerfil,_fidUsuario,_fidResponsabilidad,_esAsistente,1,_nombreUsuario);
		set _verificacion = 1;
		end if;
	else 
		call InsertarPerfil(@idPerfil,_fidUsuario,_fidResponsabilidad,_esAsistente,1,_nombreUsuario);
		set _verificacion = 1;
    end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarResultadoIndicador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarResultadoIndicador`(
	OUT _idResultadoIndicador INT,
	IN _fidIndicadorEspacioxMuestraMedicion INT,
    IN _nombreAlumno VARCHAR (400),
    IN _codigoAlumno VARCHAR(45),
    -- IN _resultadoA
    IN _usuarioCreacion VARCHAR (100)
)
BEGIN
	INSERT INTO ResultadoIndicador
    (fidIndicadorEspacioxMuestraMedicion,  nombreAlumno, codigoAlumno, fechaCreacion, usuarioCreacion, activo) 
    VALUES (_fidIndicadorEspacioxMuestraMedicion, _nombreAlumno, _codigoAlumno, NOW(), _usuarioCreacion, 1);
    SET _idResultadoIndicador = @@last_insert_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarRubrica` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarRubrica`(
	OUT _idRubrica INT,
	IN _fidIndicador INT,
    in _nivel int,
    IN _descripcion VARCHAR (100),
    IN _usuario VARCHAR (100)
)
BEGIN
	declare _usuarioCreacion varchar(100);
	select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _usuarioCreacion from Usuario u where idUsuario=_usuario;
    
	INSERT INTO Rubrica
    (fidIndicador, nivel, descripcion, fechaCreacion, usuarioCreacion, activo) 
    VALUES (_fidIndicador, _nivel, _descripcion, NOW(), _usuarioCreacion, 1);
    SET _idRubrica = @@last_insert_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarRubricasFaltantes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarRubricasFaltantes`(
    IN _idEspecialidad INT,
    IN _usuario VARCHAR(100)
)
BEGIN
    
	DECLARE _maxNivel INT;
    DECLARE _numNivel INT;
    declare _nivel int;
    DECLARE done INT DEFAULT FALSE; -- Mover esta línea antes del bloque DECLARE CURSOR
    DECLARE _idIndicador INT;
    DECLARE cur CURSOR FOR
        SELECT idIndicador
        FROM Indicador
        WHERE fidCompetencia IN (
            SELECT idCompetencia
            FROM Competencia
            WHERE fidEspecialidad = _idEspecialidad AND Indicador.activo = 1
        );
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
      
    -- obtengo el maximo
	SELECT MAX(nivel) INTO _maxNivel
    FROM Rubrica r
    INNER JOIN Indicador i ON r.fidIndicador = i.idIndicador
    INNER JOIN Competencia c ON i.fidCompetencia = c.idCompetencia
    WHERE c.fidEspecialidad = _idEspecialidad and r.activo=1;
    
    set _nivel = _maxNivel;
    #necesito el numero de niveles
    select niveles into _numNivel from Parametros p
    inner join Especialidad e on e.idNivel = p.idParametro
    where e.idEspecialidad = _idEspecialidad;
     -- recorro cada idIndicador
     OPEN cur;
    read_loop: LOOP
		FETCH cur INTO _idIndicador;
        IF done THEN LEAVE read_loop;
        END IF;
        -- por cada idIndicador insertare las rubricas faltantes desde _maxNivel +1 hasta _numNivel
        WHILE _maxNivel < _numNivel DO
			set _maxNivel = _maxNivel + 1;
            CALL InsertarRubrica(@idRubrica, _idIndicador, _maxNivel, "Descripción no definida", _usuario);
        end WHILE;
        set _maxNivel = _nivel;
    END LOOP;
    CLOSE cur;
     -- -----------------------------------------------------------------------------------------
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarTodoIndicadorEspacioXMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarTodoIndicadorEspacioXMuestraMedicion`(
	IN _fidIndicadorXEspacio INT,
    IN _usuarioCreacion VARCHAR(200)
)
BEGIN
	DECLARE done INT DEFAULT FALSE;
    DECLARE mMId INT;
    DECLARE cur CURSOR FOR select idMuestraMedicion
    from MuestraMedicion mm
    inner join IndicadorXEspacioMedicion iem 
    on mm.fidEspacioMedicion = iem.fidEspacioMedicion 
     where mm.activo = 1 and iem.idIndicadorXEspacioMedicion=_fidIndicadorXEspacio;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    read_loop: LOOP
		FETCH cur INTO mMId;
        IF done THEN LEAVE read_loop;
        END IF;
        CALL InsertarIndicadorEspacioXMuestraMedicion(@id,_fidIndicadorXEspacio,mMId,_usuarioCreacion);
    END LOOP;
    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarTodosLosIndicadoresMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarTodosLosIndicadoresMuestraMedicion`(
	IN _fidEspacioMedicion INT,
    IN _usuarioCreacion VARCHAR(200)
)
BEGIN
	DECLARE done INT DEFAULT FALSE;
    DECLARE _iEMId INT;
    DECLARE cur CURSOR FOR select idIndicadorXEspacioMedicion
    from IndicadorXEspacioMedicion iem
    inner join EspacioMedicion em
    on em.idEspacioMedicion = iem.fidEspacioMedicion 
     where em.activo = 1 and iem.fidEspacioMedicion=_fidEspacioMedicion;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    read_loop: LOOP
		FETCH cur INTO _iEMId;
        IF done THEN LEAVE read_loop;
        END IF;
        CALL InsertarTodoIndicadorEspacioXMuestraMedicion(_iEMId,_usuarioCreacion);
    END LOOP;
    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarUsuario`(
    OUT _idUsuario INT,
    IN _nombres VARCHAR(60),
    IN _apellidoPaterno VARCHAR(60),
    IN _apellidoMaterno VARCHAR(60),
    IN _codigoPUCP VARCHAR(20), 
    IN _correo VARCHAR(200),
    IN _correo2 VARCHAR(200),
    IN _celular varchar(10),
    IN _usuarioCreacion INT
)
BEGIN
    DECLARE C INT;
    DECLARE MSG0 VARCHAR(200);
    DECLARE _usuarioCreacion2 VARCHAR(100);
    
    SET MSG0 = CONCAT('Ya existe un usuario registrado con codigo ', _codigoPUCP, ' y correo ', _correo, '.');
    SELECT count(*) INTO C FROM Usuario WHERE codigoPUCP = _codigoPUCP and correo = _correo;
    IF (C != 0) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;
    
    SET MSG0 = CONCAT('Ya existe un usuario registrado con codigo ', _codigoPUCP, '.');
    SELECT count(*) INTO C FROM Usuario WHERE codigoPUCP = _codigoPUCP;
    IF (C != 0) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;
    
    SET MSG0 = CONCAT('Ya existe un usuario registrado con correo ', _correo, '.');
    SELECT count(*) INTO C FROM Usuario WHERE correo = _correo;
    IF (C != 0) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;
    
    
    SET _usuarioCreacion2 = (SELECT CONCAT(nombres, ' ', apellidoPaterno) FROM Usuario WHERE idUsuario = _usuarioCreacion);
    INSERT INTO Usuario (nombres, apellidoPaterno, apellidoMaterno, codigoPUCP, correo, correo2, celular, fechaCreacion, usuarioCreacion, activo) 
    VALUES (_nombres, _apellidoPaterno, _apellidoMaterno, _codigoPUCP, _correo, _correo2, _celular, NOW(), _usuarioCreacion2, 1);
    SET _idUsuario = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarUsuariosTodos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `InsertarUsuariosTodos`(
)
BEGIN
	DECLARE i INT DEFAULT 1;
    declare _usuarioCreacion2 VARCHAR(100);
    declare _idUsuario VARCHAR(100);
    declare _correo VARCHAR(100);
    declare cont int DEFAULT 0;
    DECLARE total_rows INT;
    set cont=0;
	SET total_rows = (SELECT COUNT(*) FROM temp_Esp);
	WHILE i <= total_rows DO
		SET _usuarioCreacion2 =  (select concat(u.nombres,' ',u.apellidoPaterno) from Usuario u inner join temp_Esp t on u.idUsuario=t.usuarioCreacion where t.idTemp=1);
		SET _idUsuario = (select ifnull( (select e.idUsuario from Usuario e inner join temp_Esp t on  e.codigoPUCP=t.codigoPUCP where t.idTemp=i),"0") as result);
        SET _correo = (select ifnull( (select e.idUsuario from Usuario e inner join temp_Esp t on  e.correo=t.correo where t.idTemp=i),"0") as result);
       if _idUsuario=0 and _correo =0 then
		INSERT INTO Usuario
		(nombres,apellidoPaterno,apellidoMaterno,codigoPUCP,
		correo,correo2,celular,fechaCreacion,usuarioCreacion,activo) 
		select nombres,apellidoPaterno,apellidoMaterno,codigoPUCP,
		correo,correo2,celular,now(),_usuarioCreacion2,1 from temp_Esp where idTemp=i ;
        SET cont = cont+1;
        end if;
		SET i = i + 1;
    END WHILE;
    select cont as insertados;   	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarActividadXIdActividad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarActividadXIdActividad`(
	IN _idActividad int
)
begin
	select ac.idActividad,ep.descripcion as descripcionEstado,ac.codigo, ac.descripcion, ac.fechaInicio,ac.fechaFin,ac.evidencia,ac.responsable,ac.activo,ac.fidEstado 
    from Actividad ac
	INNER JOIN EstadoPlan ep ON ep.idEstadoPlan = ac.fidEstado
    where idActividad = _idActividad
    and ac.activo=1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarActividadXIdPropuesta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarActividadXIdPropuesta`(
	IN _idPropuesta int
)
begin
	select ac.idActividad,ep.descripcion as descripcionEstado,ac.codigo, ac.descripcion, ac.fechaInicio,ac.fechaFin,ac.evidencia,ac.responsable,ac.activo,ac.fidEstado
    from Actividad ac
	INNER JOIN EstadoPlan ep ON ep.idEstadoPlan = ac.fidEstado
    where fidPropuesta = _idPropuesta
    and ac.activo=1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarActivoObjetivoEducacional` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarActivoObjetivoEducacional`(
	in _fidEspecialidad int,
    in _codigoDescripcion varchar (300)
)
begin
	select idObjetivoEducacional, sumilla, descripcion,codigoObjetivo, oe.usuarioCreacion as idUsuarioCreacion,
    CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) AS nombreCompleto , oe.fechaCreacion
    from ObjetivoEducacional oe
    inner join Usuario u on u.idUsuario =  oe.usuarioCreacion
    where fidEspecialidad = _fidEspecialidad and oe.activo = 1
	and (codigoObjetivo LIKE CONCAT('%',_codigoDescripcion,'%') or descripcion LIKE CONCAT('%',_codigoDescripcion,'%') );
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarAlumnosDeMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarAlumnosDeMuestra`(
	IN _codigoNombre VARCHAR(100),
	IN _idMuestraMedicion INT
)
BEGIN
	select a.idAlumno, a.nombre, a.codigo
    from Alumno a inner join AlumnosMuestra am on a.idAlumno = am.fidAlumno
    where am.activo=1 and am.fidMuestraMedicion = _idMuestraMedicion and
    ( (a.nombre LIKE CONCAT('%',_codigoNombre,'%'))  or (a.codigo LIKE CONCAT('%',_codigoNombre,'%')));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarAlumnosIndicadorXMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarAlumnosIndicadorXMuestraMedicion`(
    in _idIndicadorEspacioXMuestraMedicion int
)
begin
	select idResultadoIndicador, nombreAlumno, codigoAlumno, resultadoAlumno
    from ResultadoIndicador ri
    inner join IndicadorEspacioXMuestraMedicion iemm on iemm.idIndicadorEspacioxMuestraMedicion =  ri.fidIndicadorEspacioxMuestraMedicion
    where ri.activo = 1 and ri.fidIndicadorEspacioxMuestraMedicion=_idIndicadorEspacioXMuestraMedicion;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarAlumnosMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarAlumnosMuestra`(
	IN _idMuestraMedicion INT
)
BEGIN
	select am.idAlumnosMuestra, a.nombre, a.codigo, am.resultados
    from Alumno a inner join AlumnosMuestra am on a.idAlumno = am.fidAlumno
    where am.activo=1 and am.fidMuestraMedicion = _idMuestraMedicion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarAsisEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarAsisEspecialidad`(
    IN _idEspecialidad INT
)
BEGIN
	SELECT DISTINCT u.idUsuario, u.codigoPUCP as codigo, concat(u.nombres," ",u.apellidoPaterno, " ",  u.apellidoMaterno) as nombre,u.correo, u.celular, p.idPerfil
    FROM Usuario u
    INNER JOIN Perfil p on p.fidEspecialidad = _idEspecialidad AND p.fidUsuario = u.idUsuario AND p.activo = 1  AND p.esAsistente = 1
    WHERE u.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarAsisFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarAsisFacultad`(
    IN _idFacultad INT
)
BEGIN
	SELECT DISTINCT u.idUsuario, u.codigoPUCP as codigo,  concat(u.nombres," ",u.apellidoPaterno, " ",  u.apellidoMaterno) as nombre, u.correo, u.celular, p.idPerfil
    FROM Usuario u
    INNER JOIN Perfil p on p.fidFacultad = _idFacultad AND p.fidUsuario = u.idUsuario AND p.activo = 1 AND p.esAsistente = 1
    WHERE u.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarCicloAcademico` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarCicloAcademico`(
    IN _periodoI varchar(6),
    IN _periodoF varchar(6)
)
BEGIN
	SELECT cic.nombre as ciclo
    FROM cicloAcademico cic
    where cic.activo = 1 and cic.nombre BETWEEN _periodoI  AND _periodoF
    order by cic.nombre;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarCicloAcademicoDesde` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarCicloAcademicoDesde`(
	IN _anio varchar (4),
    IN _semestre varchar(1)
)
BEGIN
select idcicloAcademico, nombre 
from cicloAcademico
where (anio > _anio OR (anio = _anio AND semestre >= _semestre)) and activo=1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarCicloAcademicoDesdeHasta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarCicloAcademicoDesdeHasta`(
	IN _anio1 varchar (4),
    IN _semestre1 varchar(1),
    IN _anio2 varchar (4),
    IN _semestre2 varchar(1)
)
BEGIN
select idcicloAcademico, nombre 
from cicloAcademico
where (anio < _anio2 OR (anio = _anio2 AND semestre <= _semestre2))
and (anio > _anio1 OR (anio = _anio1 AND semestre >= _semestre1))
and activo=1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarCicloAcademicoDesdeHastaNombrePag` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarCicloAcademicoDesdeHastaNombrePag`(
	IN _codigoDescripcion varchar(8),
    IN _FIni DATE,
    IN _FFin DATE
)
BEGIN
    IF _FFin = '0000-00-00' THEN
        SET _FFin = '9999-12-31';
    END IF;
        
	SELECT cic.nombre as ciclo, idcicloAcademico as id, anio, semestre,
    fechaInicio, fechaFin, fechaCreacion, fechaModificacion, fechaAnulacion, usuarioCreacion, usuarioModificacion, usuarioAnulacion, if(cic.activo>0, "Activo", "Inactivo") as activo
    FROM cicloAcademico cic
	where _FIni <= cic.fechaFin and cic.fechaInicio <= _FFin and activo = 1 
    and (cic.nombre LIKE CONCAT('%',_codigoDescripcion,'%'))
    order by nombre;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarCicloAcademicoHasta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarCicloAcademicoHasta`(
	IN _anio varchar (4),
    IN _semestre varchar(1)
)
BEGIN
select idcicloAcademico, nombre 
from cicloAcademico
where (anio < _anio OR (anio = _anio AND semestre <= _semestre))and activo=1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarCicloAcademicoTodos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarCicloAcademicoTodos`()
BEGIN
	SELECT cic.nombre as ciclo, idcicloAcademico as id, anio, semestre, fechaInicio, fechaFin, fechaCreacion, fechaModificacion, fechaAnulacion, usuarioCreacion, usuarioModificacion, usuarioAnulacion, activo
    FROM cicloAcademico cic
    where cic.activo=1
    order by cic.nombre;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarCompetencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarCompetencia`(
    IN _codigoCompetencia varchar(60),
    IN _fidEspecialidad int
)
BEGIN
	SELECT idCompetencia,codigoCompetencia,descripcion,fechaCreacion, usuarioCreacion,activo,evidencia FROM Competencia 
    WHERE ((codigoCompetencia LIKE CONCAT('%',_codigoCompetencia,'%')) or (descripcion LIKE CONCAT('%',_codigoCompetencia,'%')))
    and fidEspecialidad=_fidEspecialidad
    and activo=1
    ORDER BY codigoCompetencia;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarCompetenciasIndicadores` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarCompetenciasIndicadores`(
	in _codigo varchar(200),
    in _competencia varchar(100),
    in _idEspecialidad int)
BEGIN
	declare _comp2 varchar(100);
    if _competencia="TODOS" then
		set _comp2 = "";
    else 
		set _comp2=_competencia;
    end if;
    
	select i.idIndicador,i.codigo, i.descripcion, c.codigoCompetencia 
    from Indicador i 
    inner join Competencia c 
    on c.idCompetencia=i.fidCompetencia
    where fidEspecialidad=_idEspecialidad and
    ( (i.codigo LIKE CONCAT('%',_codigo,'%'))  
    or (i.descripcion LIKE CONCAT('%',_codigo,'%')))
    and c.codigoCompetencia LIKE CONCAT('%',_comp2) and i.activo=1 and  i.idIndicador not in (select idIndicador from temp_ind);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarCompetenciaxMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarCompetenciaxMuestraMedicion`(
	IN _idMuestraMedicion INT
)
BEGIN
	SELECT DISTINCT c.idCompetencia, c.codigoCompetencia, c.descripcion, c.evidencia
    FROM Competencia c
	INNER JOIN Indicador i ON c.idCompetencia = i.fidCompetencia
    INNER JOIN IndicadorXMuestra ie ON i.idIndicador = ie.fidIndicador
    WHERE ie.fidMuestraMedicion = _idMuestraMedicion and ie.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarEspaciosMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarEspaciosMedicion`(
	IN _fidMedicion INT
)
BEGIN
    SELECT idEspacioMedicion, fidMedicion, m.codigo as codigoMedicion ,ca.nombre as ciclo, nombreCurso, fechaLimite, indicadoresConfigurados 
    FROM EspacioMedicion 
    INNER JOIN cicloAcademico ca ON ca.idcicloAcademico = EspacioMedicion.fidCicloAcademico
    INNER JOIN Medicion m ON m.idMedicion = EspacioMedicion.fidMedicion
    WHERE _fidMedicion = EspacioMedicion.fidMedicion AND EspacioMedicion.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarEspaciosMedicionNombreCursoMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarEspaciosMedicionNombreCursoMedicion`(
	IN _fidMedicion INT,
    IN _nombreCurso varchar(50)
)
BEGIN
    SELECT idEspacioMedicion, fidMedicion, m.codigo as codigoMedicion ,ca.nombre as ciclo, nombreCurso, fechaLimite, indicadoresConfigurados 
    FROM EspacioMedicion 
    INNER JOIN cicloAcademico ca ON ca.idcicloAcademico = EspacioMedicion.fidCicloAcademico
    INNER JOIN Medicion m ON m.idMedicion = EspacioMedicion.fidMedicion
    WHERE _fidMedicion = EspacioMedicion.fidMedicion 
    AND (nombreCurso LIKE CONCAT('%',_nombreCurso,'%'))
    AND EspacioMedicion.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarEspaciosUnaMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarEspaciosUnaMedicion`(
	IN _fidMedicion INT
)
BEGIN
    SELECT e.idEspacioMedicion, e.codigo, e.nombreCurso, e.fechaLimite, e.tipoMedicion, ca.nombre as cicloAcademico, ca.idcicloAcademico
    FROM EspacioMedicion e
    INNER JOIN cicloAcademico ca ON ca.idcicloAcademico = e.fidCicloAcademico
    INNER JOIN Medicion m ON m.idMedicion = e.fidMedicion
    WHERE _fidMedicion = e.fidMedicion 
    AND e.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarEspecialidad`(
    IN _codigoNombreEspecialidad varchar(60),
    IN _fidFacultad INT
)
BEGIN
	SELECT idEspecialidad, codigoEspecialidad,nombreEspecialidad,
		IFNULL(GROUP_CONCAT(concat(nombres," ",apellidoPaterno) SEPARATOR ', '), '-') as responsables,
		Especialidad.fechaCreacion,if(Especialidad.activo>0, "Activo", "Inactivo") as activo 
	FROM Especialidad 
	LEFT JOIN Perfil ON fidEspecialidad = idEspecialidad AND Perfil.activo = 1 and esAsistente = 0
	LEFT JOIN Usuario ON fidUsuario = idUsuario AND Usuario.activo = 1
    WHERE ((nombreEspecialidad LIKE CONCAT('%',_codigoNombreEspecialidad,'%')) OR (codigoEspecialidad LIKE CONCAT('%',_codigoNombreEspecialidad,'%')))
    and Especialidad.fidFacultad=_fidFacultad
	GROUP BY Especialidad.idEspecialidad
    order by Especialidad.activo DESC, Especialidad.codigoEspecialidad;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarEspecialidadesXFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarEspecialidadesXFacultad`(
	in _idFacu int
)
begin
select idEspecialidad, nombreEspecialidad from Especialidad where fidFacultad=_idFacu and activo=1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarEvidencias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarEvidencias`(
    in _idCompetencia int,
	in _idMuestra int,
    in _idIndicador int
)
begin
    select d.rutaEvidencia, d.idDetalleCompetenciaXMuestra, d.fidCompetenciaXMuestra, _idCompetencia as idCompetencia, _idMuestra as idMuestra, c.fidIndicador,
    concat(d.idDetalleCompetenciaXMuestra,'-',d.fidCompetenciaXMuestra,'-',_idCompetencia,'-', _idIndicador,'-',_idMuestra,'-',d.rutaEvidencia) as tokenFoto
    from CompetenciaXMuestra c
    inner join DetalleCompetenciaXMuestra d
    on c.idCompetenciaXMuestra = d.fidCompetenciaXMuestra
    where c.fidCompetencia=_idCompetencia and c.fidMuestraMedicion=_idMuestra and c.fidIndicador = _idIndicador and activo=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarEvidenciasActividades` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarEvidenciasActividades`(
    in _idActividad int
)
begin
    select idDetalleEvidenciaActividad,fidActividad,rutaEvidenciaActividad,
    concat('arcActividad-',idDetalleEvidenciaActividad,'-',fidActividad,'-',rutaEvidenciaActividad) as tokenFoto
    from DetalleEvidenciaActividad
    where fidActividad=_idActividad and activo=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarFacultad`(
    IN _codigoNombreFacultad varchar(60)
)
BEGIN
	SELECT idFacultad, codigoFacultad,nombreFacultad,
		IFNULL(GROUP_CONCAT(concat(nombres," ",apellidoPaterno) SEPARATOR ', '), '-') as responsables,
		Facultad.fechaCreacion,if(Facultad.activo>0, "Activo", "Inactivo") as activo
	FROM Facultad 
	LEFT JOIN Perfil ON fidFacultad = idFacultad AND Perfil.activo = 1 and esAsistente = 0
	LEFT JOIN Usuario ON fidUsuario = idUsuario AND Usuario.activo = 1
	WHERE ((nombreFacultad LIKE CONCAT('%',_codigoNombreFacultad,'%')) OR (codigoFacultad LIKE CONCAT('%',_codigoNombreFacultad,'%')))
	GROUP BY Facultad.idFacultad
    ORDER BY Facultad.activo DESC, Facultad.codigoFacultad;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarHistoricoMedicionesUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarHistoricoMedicionesUsuario`(
	IN _idUsuario INT,
    in _espacioMedicionDescripcion varchar(60)
)
BEGIN
	SELECT m.idMuestraMedicion, m.fidEspacioMedicion, m.codigo as muestra, c.nombre as ciclo, e.fechaLimite as fechaLimite, e.nombreCurso, m.enviado, m.activo, m.fechaCreacion, e.tipoMedicion
    FROM MuestraMedicion m
    INNER JOIN EspacioMedicion e ON fidEspacioMedicion=e.idEspacioMedicion
    INNER JOIN cicloAcademico c ON e.fidCicloAcademico = c.idcicloAcademico
    INNER JOIN Perfil p ON p.fidMuestra = m.idMuestraMedicion
    WHERE ((e.nombreCurso LIKE CONCAT('%',_espacioMedicionDescripcion,'%')) )
    and p.fidUsuario = _idUsuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarHistoricoObjetivoEducacional` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarHistoricoObjetivoEducacional`(
	in _fidEspecialidad int,
    in _codigoDescripcion varchar (300)
)
begin
	select idObjetivoEducacional,descripcion,codigoObjetivo,activo
    from ObjetivoEducacional
    where fidEspecialidad = _fidEspecialidad 
    and (codigoObjetivo LIKE CONCAT('%',_codigoDescripcion,'%') or descripcion LIKE CONCAT('%',_codigoDescripcion,'%') );
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarIndicadorCompetencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarIndicadorCompetencia`(
    IN _idCompetencia INT
)
BEGIN
	SELECT i.idIndicador, i.descripcion, i.niveles, i.minimoAprobatorio, i.codigo
    FROM Indicador i
    WHERE i.fidCompetencia=_idCompetencia and i.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarIndicadoresXCompetenciaxMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarIndicadoresXCompetenciaxMuestraMedicion`(
	IN _idMuestraMedicion INT,
    IN _idCompetencia INT
)
BEGIN
	-- SELECT DISTINCT iemm.fidIndicador, i.codigo as codigoIndicador, iemm.evidencia, i.descripcion, iemm.promedio, iemm.porcentaje, iemm.totalesCumplidos, iemm.numeroAlumnos, iemm.posicionResultado,'' as Rubrica
    -- FROM IndicadorXMuestra iemm inner join Indicador i on i.idIndicador = iemm.fidIndicador
    -- WHERE iemm.fidMuestraMedicion = _idMuestraMedicion and i.fidCompetencia=_idCompetencia and iemm.activo = 1;
    SELECT iemm.fidIndicador, i.codigo AS codigoIndicador, iemm.evidencia, i.descripcion, iemm.promedio, iemm.porcentaje, iemm.totalesCumplidos, iemm.numeroAlumnos, iemm.posicionResultado, '' AS Rubrica
	FROM IndicadorXMuestra iemm
	INNER JOIN Indicador i ON i.idIndicador = iemm.fidIndicador
	WHERE iemm.fidMuestraMedicion = _idMuestraMedicion AND i.fidCompetencia = _idCompetencia AND iemm.activo = 1
	GROUP BY iemm.fidIndicador;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarIndicadoresXEspacio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarIndicadoresXEspacio`(
	in _idEspecialidad int
)
begin
	select Indicador.idIndicador, ei.evidencia, Indicador.fidCompetencia, Indicador.codigo, Indicador.descripcion, Indicador.niveles, Competencia.codigoCompetencia
	from EspacioXIndicador ei
	inner join EspacioMedicion e on ei.fidEspacioMedicion = e.idEspacioMedicion 
	inner join Indicador on ei.fidIndicador = Indicador.idIndicador
	inner join Competencia on Indicador.fidCompetencia = Competencia.idCompetencia
    where ei.activo=1 and ei.fidEspacioMedicion=_idEspecialidad ;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarIndicadoresXMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarIndicadoresXMuestraMedicion`(
	IN _idMuestraMedicion INT
)
BEGIN
	SELECT iemm.fidIndicador, i.codigo as codigoIndicador, i.descripcion, iemm.promedio, iemm.porcentaje, iemm.totalesCumplidos, iemm.numeroAlumnos, iemm.posicionResultado,'' as Rubrica
    FROM IndicadorXMuestra iemm inner join Indicador i on i.idIndicador = iemm.fidIndicador
    WHERE iemm.fidMuestraMedicion = _idMuestraMedicion and iemm.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarMedicionesCodigoNombreEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarMedicionesCodigoNombreEspecialidad`(
	IN _codigoNombreEspecialidad varchar (60)
)
BEGIN
select idMedicion, f.codigoFacultad,f.nombreFacultad ,e.codigoEspecialidad as codigoEspecialidad, e.nombreEspecialidad as nombreEspecialidad, ca1.nombre as cicloInicio, ca2.nombre as cicloFin, codigo as codigoMedicion, Medicion.completada
from Medicion
INNER JOIN Especialidad e ON Medicion.fidEspecialidad = e.idEspecialidad
INNER JOIN Facultad f ON e.fidFacultad = f.idFacultad
INNER JOIN cicloAcademico ca1 ON Medicion.fidCicloInicio = ca1.idcicloAcademico
INNER JOIN cicloAcademico ca2 ON Medicion.fidCicloFin = ca2.idcicloAcademico
WHERE ((e.nombreEspecialidad LIKE CONCAT('%',_codigoNombreEspecialidad,'%')) OR (e.codigoEspecialidad LIKE CONCAT('%',_codigoNombreEspecialidad,'%')))
and Medicion.activo = 1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarMedicionesEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarMedicionesEspecialidad`(
	IN _fidEspecialidad int,
    IN _codigo varchar(10)
)
BEGIN
	select idMedicion, f.codigoFacultad,f.nombreFacultad ,e.codigoEspecialidad as codigoEspecialidad, e.nombreEspecialidad as nombreEspecialidad, ca1.nombre as cicloInicio, ca2.nombre as cicloFin, codigo as codigoMedicion, Medicion.fechaCreacion, Medicion.usuarioCreacion, Medicion.completada
	from Medicion
	INNER JOIN Especialidad e ON Medicion.fidEspecialidad = e.idEspecialidad
	INNER JOIN Facultad f ON e.fidFacultad = f.idFacultad
	INNER JOIN cicloAcademico ca1 ON Medicion.fidCicloInicio = ca1.idcicloAcademico
	INNER JOIN cicloAcademico ca2 ON Medicion.fidCicloFin = ca2.idcicloAcademico
	WHERE _fidEspecialidad = Medicion.fidEspecialidad and Medicion.activo = 1 and 
     ((Medicion.usuarioCreacion LIKE CONCAT('%',_codigo,'%'))  or (codigo LIKE CONCAT('%',_codigo,'%')))
    ORDER BY LENGTH(codigoMedicion), codigoMedicion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarMedicionesUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarMedicionesUsuario`(
	IN _idUsuario INT,
    IN _codigo VARCHAR(20)
)
BEGIN
	-- SELECT m.idMuestraMedicion, m.fidEspacioMedicion, m.codigo as codigoMuestra, e.codigo as codigoEspacio,c.nombre as ciclo, e.fechaLimite as fechaLimite, e.nombreCurso, m.enviado, m.activo, m.fechaCreacion, e.tipoMedicion
    SELECT m.idMuestraMedicion, c.nombre as ciclo, e.nombreCurso, m.codigo as codigoMuestra,  e.fechaLimite as fechaLimite, m.enviado
    FROM MuestraMedicion m
    INNER JOIN EspacioMedicion e ON fidEspacioMedicion=e.idEspacioMedicion
    INNER JOIN cicloAcademico c ON e.fidCicloAcademico = c.idcicloAcademico
    INNER JOIN Perfil p ON p.fidMuestra = m.idMuestraMedicion
    WHERE p.fidUsuario = _idUsuario and m.activo=1 and m.activo=1 and e.indicadoresConfigurados=1 and
    ( ( m.codigo  LIKE CONCAT('%',_codigo,'%'))  or ( e.nombreCurso LIKE CONCAT('%',_codigo,'%')));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarMedicionesUsuarioNombreCodigoEspacio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarMedicionesUsuarioNombreCodigoEspacio`(
	IN _idUsuario INT,
    IN _nombreCodigoEspacio VARCHAR (50)
)
BEGIN
	-- SELECT m.idMuestraMedicion, m.fidEspacioMedicion, m.codigo as codigoMuestra, e.codigo as codigoEspacio,c.nombre as ciclo, e.fechaLimite as fechaLimite, e.nombreCurso, m.enviado, m.activo, m.fechaCreacion, e.tipoMedicion
    SELECT m.idMuestraMedicion, c.nombre as ciclo, e.nombreCurso, m.codigo as codigoMuestra,  e.fechaLimite as fechaLimite, m.enviado
    FROM MuestraMedicion m
    INNER JOIN EspacioMedicion e ON fidEspacioMedicion=e.idEspacioMedicion
    INNER JOIN cicloAcademico c ON e.fidCicloAcademico = c.idcicloAcademico
    INNER JOIN Perfil p ON p.fidMuestra = m.idMuestraMedicion
    WHERE p.fidUsuario = _idUsuario AND m.activo=1 
    AND ((e.nombreCurso LIKE CONCAT('%',_nombreCodigoEspacio,'%')) OR (e.codigo LIKE CONCAT('%',_nombreCodigoEspacio,'%')));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarMuestrasMedicionesEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarMuestrasMedicionesEspecialidad`(
	IN _idEspecialidad INT,
    IN _espacioMedicionResponsable VARCHAR(200)
)
BEGIN
	-- SELECT m.idMuestraMedicion, m.fidEspacioMedicion, m.codigo as codigoMuestra, e.codigo as codigoEspacio,c.nombre as ciclo, e.fechaLimite as fechaLimite, e.nombreCurso, m.enviado, m.activo, m.fechaCreacion, e.tipoMedicion
    SELECT m.idMuestraMedicion, c.nombre as ciclo, e.nombreCurso, m.codigo as codigoMuestra,  e.fechaLimite as fechaLimite, concat(u.nombres," ",u.apellidoPaterno) as nombreResponsable
    FROM MuestraMedicion m
    INNER JOIN EspacioMedicion e ON fidEspacioMedicion=e.idEspacioMedicion
    INNER JOIN cicloAcademico c ON e.fidCicloAcademico = c.idcicloAcademico
    INNER JOIN Perfil p ON p.fidMuestra = m.idMuestraMedicion
    INNER JOIN Usuario u ON u.idUsuario = p.fidUsuario
    INNER JOIN Medicion mm ON mm.idMedicion=e.fidMedicion
    WHERE mm.fidEspecialidad = _idEspecialidad and m.activo=1 and m.enviado=1
	and ((e.nombreCurso LIKE CONCAT('%',_espacioMedicionResponsable,'%')) OR (concat(u.nombres," ",u.apellidoPaterno) LIKE CONCAT('%',_espacioMedicionResponsable,'%')));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarMuestrasXEspacio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarMuestrasXEspacio`(
	IN _fidEspacioMedicion INT
)
BEGIN
    SELECT mume.idMuestraMedicion, mume.fidEspacioMedicion, mume.codigo, mume.enviado, mume.activo, per.fidUsuario, concat(usu.nombres, ' ', usu.apellidoPaterno, ' ', usu.apellidoMaterno) as nombreResponsable
    FROM MuestraMedicion mume
    INNER JOIN Perfil per on mume.idMuestraMedicion = per.fidMuestra
    INNER JOIN Usuario usu on per.fidUsuario = usu.idUsuario
    WHERE _fidEspacioMedicion = mume.fidEspacioMedicion AND mume.activo = 1 AND per.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarParametrosActualesIndicador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarParametrosActualesIndicador`(
	in _idEspecialidad int,
    in _idIndicador int
)
begin
	declare _idParam int;
	if _idIndicador > 0 then
		select niveles, minimoAprobatorio, porcentajeMinimo from Indicador where Indicador.idIndicador = _idIndicador;
	else
		#si el indicador aun no existe, saco los parametros desde la especialidad
        select idNivel into _idParam from Especialidad where idEspecialidad=_idEspecialidad;
        select niveles, minimoAprobatorio, porcentajeMinimo from Parametros where idParametro = _idParam;
    end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarPerfilRutas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarPerfilRutas`(
    IN _fidUsuario INT
)
BEGIN
	SELECT p.idPerfil, p.fidFacultad as idResponsabilidad,CONCAT(p.nombrePerfil) as roles
    FROM Perfil p
    WHERE p.nivelAcceso=4 AND  p.esAuditor=1 AND (p.fidUsuario=_fidUsuario or (p.fidUsuario in (select idUsuario from Usuario where codigoPUCP=_fidUsuario)))  AND p.activo = 1
    UNION
	SELECT p.idPerfil, p.fidFacultad as idResponsabilidad, CONCAT(p.nombrePerfil) as roles
    FROM Perfil p
    WHERE p.nivelAcceso=0 AND p.esAdministrador=1 AND  (p.fidUsuario=_fidUsuario or (p.fidUsuario in (select idUsuario from Usuario where codigoPUCP=_fidUsuario)))  AND p.activo = 1
    UNION
	SELECT p.idPerfil, p.fidFacultad as idResponsabilidad, CONCAT(p.nombrePerfil," (",f.codigoFacultad,")") as roles
    FROM Perfil p
    INNER JOIN Facultad f ON p.fidFacultad = f.idFacultad 
    WHERE p.nivelAcceso=1 AND (p.fidUsuario=_fidUsuario or (p.fidUsuario in (select idUsuario from Usuario where codigoPUCP=_fidUsuario)))  AND p.activo = 1 and f.activo = 1
    UNION
	SELECT p.idPerfil,  p.fidEspecialidad as idResponsabilidad, CONCAT(p.nombrePerfil," (",e.codigoEspecialidad,")") as roles
    FROM Perfil p
    INNER JOIN Especialidad e ON p.fidEspecialidad=e.idEspecialidad
    WHERE p.nivelAcceso=2 AND (p.fidUsuario=_fidUsuario or (p.fidUsuario in (select idUsuario from Usuario where codigoPUCP=_fidUsuario)))  AND p.activo = 1 and e.activo = 1
    UNION
    SELECT 0, 0 as idResponsabilidad, concat(p.nombrePerfil) as roles
	FROM Perfil p
    INNER JOIN MuestraMedicion m ON p.fidMuestra = m.idMuestraMedicion
    WHERE p.nivelAcceso=3 AND (p.fidUsuario=_fidUsuario or (p.fidUsuario in (select idUsuario from Usuario where codigoPUCP=_fidUsuario)))  AND p.activo = 1 and m.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarPlanMejoraActivos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarPlanMejoraActivos`(
	in _idEspecialidad int
)
begin
	select idPlanMejora, fidEstado, descripcion, usuarioCreacion, fechaCreacion
    from PlanMejora where fidEspecialidad = _idEspecialidad and activo=1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarPlanMejoraXEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarPlanMejoraXEspecialidad`(
	IN _codigoPlanMejora varchar(60),
	in _idEspecialidad int
)
begin
	select idPlanMejora,codigo, fidEstado, descripcion, activo, usuarioCreacion,fechaCreacion
    from PlanMejora
    where fidEspecialidad = _idEspecialidad
    and ((codigo LIKE CONCAT('%',_codigoPlanMejora,'%')) or (descripcion LIKE CONCAT('%',_codigoPlanMejora,'%')))
    order by activo DESC, fidEstado, codigo;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarPropuestaXIdPlanMejora` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarPropuestaXIdPlanMejora`(
	IN _idPlanMejora int
)
begin
	select idPropuesta,codigo, descripcion, activo
    from Propuesta
    where fidPlanMejora = _idPlanMejora
    and activo=1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarResEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarResEspecialidad`(
    IN _idEspecialidad INT
)
BEGIN
	SELECT DISTINCT u.idUsuario, u.codigoPUCP as codigo, concat(u.nombres," ",u.apellidoPaterno, " ", apellidoMaterno) as nombre, u.correo, u.celular, p.idPerfil
    FROM Usuario u
    INNER JOIN Perfil p on p.fidEspecialidad = _idEspecialidad AND p.fidUsuario = u.idUsuario AND p.activo = 1  AND p.esAsistente = 0
    WHERE u.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarResFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarResFacultad`(
    IN _idFacultad INT
)
BEGIN
	SELECT DISTINCT u.idUsuario, u.codigoPUCP as codigo,  concat(u.nombres," ",u.apellidoPaterno," ", apellidoMaterno) as nombre, u.correo, u.celular, p.idPerfil
    FROM Usuario u
    INNER JOIN Perfil p on p.fidFacultad = _idFacultad AND p.fidUsuario = u.idUsuario AND p.activo = 1  AND p.esAsistente = 0
    WHERE u.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarResYAsisEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarResYAsisEspecialidad`(
    IN _idEspecialidad INT
)
BEGIN
	SELECT DISTINCT u.idUsuario, concat(u.nombres," ",u.apellidoPaterno) as nombreApellido, u.apellidoMaterno, u.correo, u.celular
    FROM Usuario u
    INNER JOIN Perfil p on p.fidEspecialidad = _idEspecialidad AND p.fidUsuario = u.idUsuario AND p.activo = 1
    WHERE u.activo = 1
    ORDER BY p.esAsistente;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarResYAsisFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarResYAsisFacultad`(
    IN _idFacultad INT
)
BEGIN
	SELECT DISTINCT u.idUsuario, concat(u.nombres," ",u.apellidoPaterno) as nombreApellido, u.apellidoMaterno, u.correo, u.celular
    FROM Usuario u
    INNER JOIN Perfil p on p.fidFacultad = _idFacultad AND p.fidUsuario = u.idUsuario AND p.activo = 1
    WHERE u.activo = 1
    ORDER BY p.esAsistente;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarRubrica` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarRubrica`(
    IN _idIndicador INT
)
BEGIN
	SELECT r.idRubrica, r.descripcion, r.nivel
    FROM Rubrica r
    WHERE r.fidIndicador=_idIndicador and r.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarTodoCicloAcademico` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarTodoCicloAcademico`()
BEGIN
select idcicloAcademico, nombre from cicloAcademico;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarTodoIndicadoresXMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarTodoIndicadoresXMuestra`(
	in _idMuestraMedicion INT
)
BEGIN
	SELECT iemm.fidIndicador, i.codigo as codigoIndicador, i.descripcion, iemm.promedio, iemm.porcentaje, iemm.totalesCumplidos, 
    iemm.numeroAlumnos, iemm.posicionResultado, i.fidCompetencia
    FROM IndicadorXMuestra iemm inner join Indicador i on i.idIndicador = iemm.fidIndicador
    WHERE iemm.fidMuestraMedicion = _idMuestraMedicion  and iemm.activo = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarUnIndicadorXMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarUnIndicadorXMuestraMedicion`(
	IN _idMuestraMedicion INT,
    IN _idIndicador INT 
)
BEGIN
	SELECT i.idIndicador, i.codigo as codigoIndicador, i.descripcion, iemm.promedio, iemm.porcentaje, iemm.totalesCumplidos, iemm.numeroAlumnos
    FROM IndicadorEspacioXMuestraMedicion iemm
    INNER JOIN IndicadorXEspacioMedicion ie ON fidIndicadorXEspacio = ie.idIndicadorXEspacioMedicion
    INNER JOIN Indicador i ON ie.fidIndicador = i.idIndicador
    WHERE iemm.fidMuestraMedicion = _idMuestraMedicion and iemm.activo=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarUsuario`(
    IN _nombre varchar(200)
)
BEGIN

	IF _NOMBRE != '%' and _NOMBRE !='.' and _NOMBRE !='-' and _NOMBRE !='_' and _NOMBRE != '%%' THEN
	SELECT idUsuario,codigoPUCP,correo, concat(nombres," ",apellidoPaterno," ",apellidoMaterno) as nombre, if(activo>0, "Activo", "Inactivo") as estado
    FROM Usuario 
    WHERE ( (apellidoMaterno LIKE CONCAT('%',_nombre,'%'))  or (apellidoPaterno LIKE CONCAT('%',_nombre,'%')) or nombres LIKE CONCAT('%',_nombre,'%') or (codigoPUCP LIKE CONCAT('%',_nombre,'%')))
    ORDER BY activo desc,codigoPUCP, nombres;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarUsuario2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarUsuario2`(
    IN _nombre varchar(200)
)
BEGIN
	SELECT idUsuario,nombres,apellidoPaterno,apellidoMaterno,codigoPUCP,
    correo,correo2,celular FROM Usuario 
    WHERE ((nombres LIKE CONCAT('%',_nombre,'%')) or idUsuario = _nombre);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarUsuariosNoDeEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarUsuariosNoDeEspecialidad`(
	in _idEspecialidad int,
     IN _nombre varchar(200),
    IN _idList VARCHAR(255)
)
begin
	IF _NOMBRE = '%' OR _NOMBRE ='.' OR _NOMBRE ='-' OR _NOMBRE ='_' THEN
    SELECT null;
    ELSE
	select DISTINCT codigoPUCP as codigo, u.idUsuario ,CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) as nombreCompleto,
    correo, celular
    from Usuario u
	LEFT JOIN Perfil p ON u.idUsuario = p.fidUsuario AND p.fidEspecialidad = _idEspecialidad and p.activo=1
    WHERE (p.idPerfil IS NULL) 
    and ((u.apellidoMaterno LIKE CONCAT('%',_nombre,'%'))  or (u.apellidoPaterno LIKE CONCAT('%',_nombre,'%')) or u.nombres LIKE CONCAT('%',_nombre,'%') or (u.codigoPUCP LIKE CONCAT('%',_nombre,'%')))
    and NOT FIND_IN_SET(idUsuario, _idList)
    and u.activo=1;
    END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListarUsuariosQueNoSonDeFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ListarUsuariosQueNoSonDeFacultad`(
	in _idFacultad int,
    IN _nombre varchar(200),
    IN _idList VARCHAR(255)
)
begin
	IF _NOMBRE = '%' OR _NOMBRE ='.' OR _NOMBRE ='-' OR _NOMBRE ='_' THEN
    SELECT null;
    ELSE
	select DISTINCT codigoPUCP as codigo, u.idUsuario ,CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) as nombreCompleto,
    correo, celular
    from Usuario u
	LEFT JOIN Perfil p ON u.idUsuario = p.fidUsuario AND p.fidFacultad = _idFacultad and p.activo=1
    WHERE (p.idPerfil IS NULL) 
    and ((u.apellidoMaterno LIKE CONCAT('%',_nombre,'%'))  or (u.apellidoPaterno LIKE CONCAT('%',_nombre,'%')) or u.nombres LIKE CONCAT('%',_nombre,'%') or (u.codigoPUCP LIKE CONCAT('%',_nombre,'%')))
    and NOT FIND_IN_SET(idUsuario, _idList)
    and u.activo=1;
	END IF;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarActividad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarActividad`(
    IN _idActividad INT,
    IN _codigo VARCHAR(20), 
    IN _descripcion VARCHAR(300),
    IN _evidencia VARCHAR(200), 
    IN _responsable VARCHAR(200),
    IN _fidEstado int,
    IN _usuarioModificacion INT
)
BEGIN

	DECLARE _totalActividades INT;
	DECLARE _actividadesSinIniciar INT;
    DECLARE _actividadesProgreso INT;
    DECLARE _actividadesCompleto INT;
	DECLARE _planMejora INT;
    declare _usuarioModificacion2 VARCHAR(100);
    
	SET _usuarioModificacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioModificacion);
    SET _planMejora = (SELECT fidPlanMejora FROM Propuesta WHERE idPropuesta = (SELECT fidPropuesta FROM Actividad WHERE idActividad = _idActividad));
    
    UPDATE Actividad 
    SET codigo = _codigo, fidEstado=_fidEstado,responsable=_responsable, descripcion = _descripcion, evidencia=_evidencia,usuarioModificacion = _usuarioModificacion2,  fechaModificacion=SYSDATE()
    where idActividad = _idActividad;
	
	SET _totalActividades = (
		SELECT COUNT(*)
		FROM Actividad
		INNER JOIN Propuesta ON Actividad.fidPropuesta = Propuesta.idPropuesta
		INNER JOIN PlanMejora ON Propuesta.fidPlanMejora = PlanMejora.idPlanMejora
		WHERE PlanMejora.idPlanMejora = _planMejora
	);
	SET _actividadesSinIniciar = (
		SELECT COUNT(*)
		FROM Actividad
		INNER JOIN Propuesta ON Actividad.fidPropuesta = Propuesta.idPropuesta
		INNER JOIN PlanMejora ON Propuesta.fidPlanMejora = PlanMejora.idPlanMejora
		WHERE PlanMejora.idPlanMejora = _planMejora
		AND Actividad.fidEstado = 1
	);
	SET _actividadesProgreso = (
		SELECT COUNT(*)
		FROM Actividad
		INNER JOIN Propuesta ON Actividad.fidPropuesta = Propuesta.idPropuesta
		INNER JOIN PlanMejora ON Propuesta.fidPlanMejora = PlanMejora.idPlanMejora
		WHERE PlanMejora.idPlanMejora = _planMejora
		AND Actividad.fidEstado = 2
	);
	SET _actividadesCompleto = (
		SELECT COUNT(*)
		FROM Actividad
		INNER JOIN Propuesta ON Actividad.fidPropuesta = Propuesta.idPropuesta
		INNER JOIN PlanMejora ON Propuesta.fidPlanMejora = PlanMejora.idPlanMejora
		WHERE PlanMejora.idPlanMejora = _planMejora
		AND Actividad.fidEstado = 3
	);
    IF _actividadesProgreso>0 THEN
		UPDATE PlanMejora
		SET fidEstado = 2
		WHERE idPlanMejora =_planMejora;
	END IF;
	IF _totalActividades = _actividadesSinIniciar THEN
		UPDATE PlanMejora
		SET fidEstado = 1
		WHERE idPlanMejora =_planMejora;
	END IF;
    
    IF _totalActividades = _actividadesCompleto THEN
		UPDATE PlanMejora
		SET fidEstado = 3
		WHERE idPlanMejora = _planMejora;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarAlumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarAlumno`(
	out _resultado tinyint,
    in _idAlumno int,
    in _codigo varchar(10),
    in _nombre varchar(200),
    in _activo tinyint(1),
    in _usuarioModificacion varchar(100)
)
BEGIN
	declare _codigoActual varchar(10);
	set _resultado = 0;
    select codigo into _codigoActual from Alumno where idAlumno = _idAlumno;
    #caso 1: quiero cambiar el codigo
    IF _codigoActual <> _codigo THEN
		#verifico que el codigo no exista
		IF NOT EXISTS (SELECT 1 FROM Alumno WHERE activo =1 and codigo = _codigo) THEN
			UPDATE  Alumno set codigo=_codigo, nombre=_nombre, fechaModificacion = NOW(), usuarioMoificacion = _usuarioModificacion, activo=_activo
			where idAlumno = _idAlumno;
			set _resultado = 1;
        end if;
	ELSE
		#caso 2: el codigo no va a cambiar
        UPDATE  Alumno set codigo=_codigo, nombre=_nombre, fechaModificacion = NOW(), usuarioMoificacion = _usuarioModificacion, activo=_activo
		where idAlumno = _idAlumno;
		set _resultado = 1;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarAlumnoMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarAlumnoMuestra`(
	out _resultado tinyint,
    in _idAlumnosMuestra int,
    in _activo tinyint(1),
    in _usuarioModificacion varchar(100)
)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM AlumnosMuestra WHERE idAlumnosMuestra = _idAlumnosMuestra) THEN
		set _resultado = 0;
   
	ELSE 
    update AlumnosMuestra
    set activo = _activo, usuarioModificacion=_usuarioModificacion, fechaModificacion=now()
    where idAlumnosMuestra=_idAlumnosMuestra;
    set _resultado = 1;
    
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarCicloAcademico` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarCicloAcademico`(
	IN _idCicloAcademico INT,
    IN _anio VARCHAR(4),
    IN _semestre VARCHAR(1),
    IN _fechaInicio DATE,
    IN _fechaFIn DATE,
    IN _usuarioModificacion int
)
BEGIN
    DECLARE C INT;
    DECLARE MSG0 VARCHAR(200);
	declare _nombreUsuario varchar(100);
    DECLARE _nombre VARCHAR(45);
    
    SET _nombre = CONCAT(_anio, '-', _semestre);

    SET MSG0 = CONCAT('Ya existe un ciclo registrado con codigo ', _nombre, '.');
    SELECT count(*) INTO C FROM cicloAcademico WHERE nombre = _nombre and _idCicloAcademico != idcicloAcademico;
    IF (C != 0) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;

    SET MSG0 = CONCAT('La fecha inicial del ciclo no puede ser posterior a la fecha final');
    IF (_fechaInicio >= _fechaFin) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;
    
	select CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioModificacion;
    
	UPDATE cicloAcademico SET anio=_anio, semestre=_semestre, nombre=_nombre, fechaInicio=_fechaInicio, fechaFin=_fechaFin, fechaModificacion=now(), usuarioModificacion = _nombreUsuario
	where idcicloAcademico = _idCicloAcademico;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarCompetencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarCompetencia`(
    IN _idCompetencia INT,
    IN _codigo VARCHAR(20), 
    IN _descripcion VARCHAR(200),
    IN _usuarioModificacion INT, 
    in _evidencia VARCHAR (200)
)
BEGIN
    declare _usuarioModificacion2 VARCHAR(100);
	SET _usuarioModificacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioModificacion);
    
    UPDATE Competencia SET codigoCompetencia = _codigo, descripcion = _descripcion, usuarioModificacion = _usuarioModificacion2,  fechaModificacion=SYSDATE(), evidencia=_evidencia
    where idCompetencia = _idCompetencia;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarContrasenia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarContrasenia`(
	IN _idUsuario INT,
	IN _contrasenia VARCHAR (200)
)
BEGIN
	DECLARE _contrasenia2 VARCHAR(200);
    set _contrasenia2 = MD5(_contrasenia);
	UPDATE Usuario
    SET contrasenia = _contrasenia2
    where _idUsuario=idUsuario;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `modificarEspacio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `modificarEspacio`(
	IN _idEspacioMedicion INT,
    IN _codigoEspacio VARCHAR(10),
    IN _idCiclo INT,
    IN _descripcionEspacio varchar(100),
    IN _fechaLimite datetime,
    IN _idUsuarioCreacion INT
)
BEGIN
	declare _usuario VARCHAR(100);
    SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario WHERE idUsuario=_idUsuarioCreacion);
	UPDATE EspacioMedicion 
    SET fidCicloAcademico=_idCiclo , codigo=_codigoEspacio, nombreCurso=_descripcionEspacio, fechaLimite=_fechaLimite,
    fechaModificacion=now(),usuarioModificacion=_usuario
    where idEspacioMedicion=_idEspacioMedicion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarEspecialidad`(
	in _idEspecialidad int,
    in _codigoEspecialidad varchar(10),
    in _nombreEspecialidad varchar (60),
    in _correo varchar(200),
    in _usuarioModificacion int,
    out _exito int
)
begin
    declare _nombreUsuario varchar(100);
    #tengo el codigo actual
	set _exito = 0;
    #solo hago update si el codigo NO está tomado por un id diferente
    IF NOT EXISTS (SELECT 1 FROM Especialidad 
    WHERE (activo =1 and codigoEspecialidad = _codigoEspecialidad and idEspecialidad <> _idEspecialidad) 
    ) THEN
		select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
        into _nombreUsuario from Usuario u where idUsuario=_usuarioModificacion;
        
		update Especialidad set codigoEspecialidad=_codigoEspecialidad,
        nombreEspecialidad = _nombreEspecialidad,
        correo=_correo, usuarioModificacion=_nombreUsuario,
        fechaModificacion=now()
        where idEspecialidad=_idEspecialidad;
        set _exito = 1;
    end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarFacultad`(
    IN _idFacultad INT,
    IN _nombreFacultad varchar(60),
    IN _codigoFacultad VARCHAR(10),
    IN _tieneEspecialidad tinyint(1),
    IN _correo VARCHAR(200),
    IN _usuarioModificacion int
)
BEGIN
	declare _nombreUsuario varchar(100);
	select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioModificacion;

	UPDATE Facultad
    SET codigoFacultad = _codigoFacultad, nombreFacultad = _nombreFacultad, correo = _correo, tieneEspecialidad = _tieneEspecialidad, usuarioModificacion = _nombreUsuario, idModificacion = _usuarioModificacion
    WHERE idFacultad = _idFacultad ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarFotoUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarFotoUsuario`(
    IN _idUsuario INT,
    IN _rutaFoto VARCHAR(400)
)
BEGIN
    declare _usuarioCreacion2 VARCHAR(100);
	SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_idUsuario);
    UPDATE Usuario SET rutaFoto=_rutaFoto, usuarioModificacion = _usuarioCreacion2, fechaModificacion=now() 
    where idUsuario = _idUsuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarIndicador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarIndicador`(
    IN _idIndicador INT,
    IN _codigo VARCHAR(20), 
    IN _descripcion VARCHAR(200),
    IN _usuarioModificacion INT
)
BEGIN
    declare _usuarioModificacion2 VARCHAR(100);
	SET _usuarioModificacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioModificacion);
    
    UPDATE Indicador SET codigo = _codigo, descripcion = _descripcion, usuarioModificacion = _usuarioModificacion2,  fechaModificacion=SYSDATE()
    where idIndicador = _idIndicador;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `modificarMedicionPeriodo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `modificarMedicionPeriodo`(
	IN _idCicloIni INT,
    IN _idCicloFin INT,
    IN _fidMedicion INT,
    IN _idUsuarioCreacion INT
)
BEGIN
    declare _usuario VARCHAR(100);
    SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario WHERE idUsuario=_idUsuarioCreacion);
    UPDATE Medicion
	SET fidCicloInicio=_idCicloIni, fidCicloFin=_idCicloFin, usuarioModificacion=_usuario, fechaModificacion=now() where idMedicion= _fidMedicion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarObjetivoEducacional` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarObjetivoEducacional`(
	in _idObjetivoEducacional int,
    in _sumilla varchar(130),
    in _descripcion varchar (300),
    in _codigoObjetivo varchar(45),
    in _usuarioModificacion varchar(100)
)
begin
	declare _codigoActual varchar(45);
    select codigoObjetivo into _codigoActual from ObjetivoEducacional where idObjetivoEducacional = _idObjetivoEducacional;
    
    IF NOT EXISTS (SELECT 1 FROM ObjetivoEducacional 
    WHERE activo =1 and codigoObjetivo = _codigoActual and idObjetivoEducacional <> _idObjetivoEducacional
    ) THEN
    
		update ObjetivoEducacional 
		set descripcion = _descripcion, codigoObjetivo = _codigoObjetivo,
		sumilla = _sumilla,
		usuarioModificacion = _usuarioModificacion, fechaModificacion = now()
		where idObjetivoEducacional = _idObjetivoEducacional;
    
    end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarPlanMejora` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarPlanMejora`(
    IN _idPlanMejora INT,
    IN _codigo VARCHAR(20), 
    IN _descripcion VARCHAR(200),
    IN _usuarioModificacion INT
)
BEGIN
    declare _usuarioModificacion2 VARCHAR(100);
	SET _usuarioModificacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioModificacion);
    
    UPDATE PlanMejora SET codigo = _codigo, descripcion = _descripcion, usuarioModificacion = _usuarioModificacion2,  fechaModificacion=SYSDATE()
    where idPlanMejora = _idPlanMejora;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarPropuesta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarPropuesta`(
    IN _idPropuesta INT,
    IN _codigo VARCHAR(20), 
    IN _descripcion VARCHAR(200),
    IN _usuarioModificacion INT
)
BEGIN
    declare _usuarioModificacion2 VARCHAR(100);
	SET _usuarioModificacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioModificacion);
    
    UPDATE Propuesta SET codigo = _codigo, descripcion = _descripcion, usuarioModificacion = _usuarioModificacion2,  fechaModificacion=SYSDATE()
    where idPropuesta = _idPropuesta;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `modificarResponsableMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `modificarResponsableMedicion`(
	IN _idMuestra INT,
    IN _idResponsable INT,
    IN _idUsuarioCreacion INT
)
BEGIN
	declare _usuario VARCHAR(100);
    SET _usuario = (select concat(nombres,' ',apellidoPaterno) from Usuario WHERE idUsuario=_idUsuarioCreacion);
	UPDATE Perfil SET fidUsuario=_idResponsable, usuarioModificacion=_usuario, fechaModificacion=now()  where fidMuestra=_idMuestra;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarRubrica` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarRubrica`(
    IN _idRubrica INT,
    IN _descripcion VARCHAR(200),
    IN _usuarioModificacion INT
)
BEGIN
    declare _usuarioModificacion2 VARCHAR(100);
	SET _usuarioModificacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioModificacion);
    
    UPDATE Rubrica SET  descripcion = _descripcion, usuarioModificacion = _usuarioModificacion2,  fechaModificacion=SYSDATE()
    where idRubrica = _idRubrica;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarUsuario`(
    IN _idUsuario INT,
    IN _nombres VARCHAR(60),
    IN _apellidoPaterno VARCHAR(60),
    IN _apellidoMaterno VARCHAR(60),
    IN _codigoPUCP VARCHAR(20), 
    IN _correo VARCHAR(200),
    IN _correo2 VARCHAR(200),
    IN _celular varchar(10),
    IN _usuarioModificacion INT
)
BEGIN
    DECLARE C INT;
    DECLARE MSG0 VARCHAR(200);
    DECLARE _usuarioCreacion2 VARCHAR(100);
    
    SET MSG0 = CONCAT('Ya existe un usuario registrado con codigo ', _codigoPUCP, ' y correo ', _correo, '.');
    SELECT count(*) INTO C FROM Usuario WHERE codigoPUCP = _codigoPUCP and correo = _correo and _idUsuario != idUsuario;
    IF (C != 0) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;
    
    SET MSG0 = CONCAT('Ya existe un usuario registrado con codigo ', _codigoPUCP, '.');
    SELECT count(*) INTO C FROM Usuario WHERE codigoPUCP = _codigoPUCP and _idUsuario != idUsuario;
    IF (C != 0) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;
    
    SET MSG0 = CONCAT('Ya existe un usuario registrado con correo ', _correo, '.');
    SELECT count(*) INTO C FROM Usuario WHERE correo = _correo and _idUsuario != idUsuario;
    IF (C != 0) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = MSG0;
    END IF;

	SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioModificacion);
    UPDATE Usuario SET nombres = _nombres, apellidoPaterno = _apellidoPaterno, apellidoMaterno = _apellidoMaterno,
    codigoPUCP = _codigoPUCP,correo = _correo, correo2 = _correo2, celular = _celular, usuarioModificacion = _usuarioCreacion2,
    fechaModificacion=now()
    where idUsuario = _idUsuario;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarUsuario2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ModificarUsuario2`(
    IN _idUsuario INT,
    IN _correo2 VARCHAR(200),
    IN _celular varchar(10),
    IN _usuarioModificacion INT
)
BEGIN
    declare _usuarioCreacion2 VARCHAR(100);
	SET _usuarioCreacion2 = (SELECT concat(nombres,' ',apellidoPaterno) from Usuario where idUsuario=_usuarioModificacion);
    UPDATE Usuario SET correo2 = _correo2, celular = _celular, usuarioModificacion = _usuarioCreacion2,
    fechaModificacion=now()
    where idUsuario = _idUsuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MostrarDetalleEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `MostrarDetalleEspecialidad`(
    IN _idEspecialidad INT
)
BEGIN
    SELECT codigoEspecialidad, nombreEspecialidad, e.correo AS correoEspecialidad
    FROM Especialidad e
    WHERE _idEspecialidad = e.idEspecialidad;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MostrarDetalleFacultad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `MostrarDetalleFacultad`(
    IN _idFacultad INT
)
BEGIN
    SELECT codigoFacultad, nombreFacultad, e.correo AS correoFacultad, e.tieneEspecialidad
    FROM Facultad e
    WHERE _idFacultad = e.idFacultad;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MostrarDetalleMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `MostrarDetalleMedicion`(
	IN _idMedicion INT
)
BEGIN
    select f.codigoFacultad,f.nombreFacultad ,e.codigoEspecialidad as codigoEspecialidad, e.nombreEspecialidad as nombreEspecialidad, Medicion.fidCicloInicio, ca1.nombre as cicloInicio, Medicion.fidCicloFin, ca2.nombre as cicloFin, codigo as codigoMedicion, Medicion.fechaCreacion, Medicion.usuarioCreacion, Medicion.completada
	from Medicion
	INNER JOIN Especialidad e ON Medicion.fidEspecialidad = e.idEspecialidad
	INNER JOIN Facultad f ON e.fidFacultad = f.idFacultad
	INNER JOIN cicloAcademico ca1 ON Medicion.fidCicloInicio = ca1.idcicloAcademico
	INNER JOIN cicloAcademico ca2 ON Medicion.fidCicloFin = ca2.idcicloAcademico
	WHERE _idMedicion = Medicion.idMedicion and Medicion.activo = 1 ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MostrarDetalleMuestraMedicion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `MostrarDetalleMuestraMedicion`(
	IN _idMuestraMedicion INT
)
BEGIN
	SELECT m.fidEspacioMedicion, c.nombre as ciclo, m.codigo as codigoMuestra, e.codigo as codigoEspacio, e.nombreCurso, m.fechaCreacion as fechaInicio, e.fechaLimite as fechaFin, m.enviado, m.activo, e.tipoMedicion, mm.fidEspecialidad, mm.fidParametro
    FROM MuestraMedicion m
    INNER JOIN EspacioMedicion e ON fidEspacioMedicion=e.idEspacioMedicion
    INNER JOIN Medicion mm ON mm.idMedicion= e.fidMedicion
    INNER JOIN cicloAcademico c ON e.fidCicloAcademico = c.idcicloAcademico
    WHERE m.idMuestraMedicion = _idMuestraMedicion and m.activo=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `NombreUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `NombreUsuario`(
	in _idUsuario int
)
BEGIN
	select nombres, apellidoPaterno, apellidoMaterno from Usuario where idUsuario=_idUsuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `QuitarExcesoRubricasDeEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `QuitarExcesoRubricasDeEspecialidad`(
	in _idEspecialidad int,
    in _usuario int
)
begin
	declare _nombreUsuario varchar(100);
    declare _numNiv int;
    
	select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuario;
    
	#necesito el numero de niveles
    select niveles into _numNiv from Parametros p
    inner join Especialidad e on e.idNivel = p.idParametro
    where e.idEspecialidad = _idEspecialidad;
    #ahora actulizo todas las rubricas
    #primero desactivo el exceso
    update Rubrica r
    INNER JOIN Indicador i ON r.fidIndicador = i.idIndicador
    INNER JOIN Competencia c ON i.fidCompetencia = c.idCompetencia
    set r.activo = 0 and r.usuarioAnulacion = _nombreUsuario and r.fechaAnulacion = now()
    where r.nivel > _numNiv and r.activo = 1 
    and c.fidEspecialidad = _idEspecialidad and r.idRubrica >= 1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReactivarEspecialidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ReactivarEspecialidad`(
	in _idList VARCHAR(255),
    in _usuarioModificacion int
)
begin
	declare _nombreUsuario varchar(100);
    select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioModificacion;
    
    update Especialidad 
    set activo=1, fechaModificacion=now(), usuarioModificacion=_nombreUsuario
    WHERE FIND_IN_SET(idEspecialidad, _idList) and activo = 0 and idEspecialidad > -1;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RecuparContrasenia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `RecuparContrasenia`(
	OUT _idUsuario INT,
	OUT _codigoCodigosRecuperarContrasenia VARCHAR(10),
    IN _correo VARCHAR (200)
)
BEGIN
	DECLARE _codigoCodigosRecuperarContrasenia2 VARCHAR (100);
    DECLARE _idUsuario2 INT;
    SET _idUsuario = 0;
    SET _codigoCodigosRecuperarContrasenia=" ";
    
    SELECT idUsuario INTO _idUsuario2 
    FROM Usuario 
    WHERE Usuario.activo=1 AND Usuario.correo = _correo;
    
    IF _idUsuario2 > 0 THEN
		SET _idUsuario = _idUsuario2;
		SET _codigoCodigosRecuperarContrasenia = CONCAT(
		SUBSTRING(CONV(FLOOR(RAND() * 99999999), 10, 36), 1, 2),
		SUBSTRING(CONV(FLOOR(RAND() * 99999999), 10, 36), 1, 2),
		SUBSTRING(CONV(FLOOR(RAND() * 99999999), 10, 36), 1, 2),
		SUBSTRING(CONV(FLOOR(RAND() * 99999999), 10, 36), 1, 2),
		SUBSTRING(CONV(FLOOR(RAND() * 99999999), 10, 36), 1, 2)
		); -- GENERO UN VARCHAR DE 10 CARACTERES
		
		-- ahora lo hago md5
		set _codigoCodigosRecuperarContrasenia2 = MD5(_codigoCodigosRecuperarContrasenia);
		call AnularCodigoRecuparContrasenia(_idUsuario);
		INSERT INTO CodigosRecuperarContrasenia
		(fidUsuario, codigo, fechaCreacion, activo) 
		VALUES (_idUsuario, _codigoCodigosRecuperarContrasenia2, NOW(), 1);
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `reemplazarPerfil` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `reemplazarPerfil`(
	IN _idResponsable INT,
    IN _idPerfilAntiguo INT,
    IN _usuarioModificacion VARCHAR (100)
)
BEGIN
	declare _nombreUsuario varchar(100);
	select  CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno)
	into _nombreUsuario from Usuario u where idUsuario=_usuarioModificacion;

	INSERT INTO Perfil (fidUsuario, nivelAcceso, fidFacultad, fidEspecialidad, fidMuestra,esAsistente,nombrePerfil,esAdministrador,esAuditor,activo)
	SELECT fidUsuario, nivelAcceso, fidFacultad, fidEspecialidad, fidMuestra,esAsistente,nombrePerfil,esAdministrador,esAuditor,activo
	FROM Perfil
	WHERE idPerfil = _idPerfilAntiguo;
    
    UPDATE Perfil
    SET fechaCreacion = now(), usuarioCreacion = _nombreUsuario, fidUsuario = _idResponsable
    WHERE idPerfil = @@last_insert_id;

    UPDATE Perfil 
    SET activo = 0, usuarioAnulacion = _nombreUsuario, fechaAnulacion = now()
    WHERE idPerfil = _idPerfilAntiguo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegistrarEvidencia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `RegistrarEvidencia`(
    in _idCompetencia int,
	in _idMuestra int,
    in _idIndicador int
)
begin
	Declare _idCompMuestra int;
    Declare _valora int;
    set _valora = (select count(*) from CompetenciaXMuestra where fidCompetencia=_idCompetencia and fidMuestraMedicion=_idMuestra and fidIndicador=_idIndicador);
    if _valora=0 then 
	INSERT INTO CompetenciaXMuestra
    (fidCompetencia,fidMuestraMedicion,fidIndicador,evidenciaEnviada) 
    VALUES (_idCompetencia,_idMuestra,_idIndicador,1);
    select @@last_insert_id as ID;
    else 
    select idCompetenciaXMuestra as ID from CompetenciaXMuestra where fidCompetencia=_idCompetencia and fidMuestraMedicion=_idMuestra and fidIndicador=_idIndicador;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegistrarEvidencia2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `RegistrarEvidencia2`(
    in _idCompMuestra int,
	in _nombreArchivo VARCHAR(400)
)
begin
	INSERT INTO DetalleCompetenciaXMuestra
    (fidCompetenciaXMuestra,rutaEvidencia,activo) 
    VALUES (_idCompMuestra,_nombreArchivo,1);
    select @@last_insert_id as ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegistrarEvidenciaActividad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `RegistrarEvidenciaActividad`(
    in _idActividad int,
	in _nombreArchivo VARCHAR(400)
)
begin
	INSERT INTO DetalleEvidenciaActividad
    (fidActividad,rutaEvidenciaActividad,activo) 
    VALUES (_idActividad,_nombreArchivo,1);
    select @@last_insert_id as ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegistrarResumenIndicadorXMuestra` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `RegistrarResumenIndicadorXMuestra`(
	in _fidMuestraMedicion int,
    in _fidIndicador int,
    in _promedio double,
    in _porcentaje double,
    in _totalesCumplidos int
)
begin
	declare _idIndicadorXMuestraMedicion int;
    select idIndicadorXMuestraMedicion into _idIndicadorXMuestraMedicion 
    from IndicadorXMuestra
    where activo=1 and fidMuestraMedicion = _fidMuestraMedicion
    AND fidIndicador = _fidIndicador;
    
    update IndicadorXMuestra
    set promedio=_promedio, porcentaje=_porcentaje, totalesCumplidos=_totalesCumplidos, totalResultados=_promedio*numeroAlumnos
    where idIndicadorXMuestraMedicion = _idIndicadorXMuestraMedicion;

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReporteAlumnosNotas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ReporteAlumnosNotas`(
    in _idMuestra int,
	in _idIndicador int
)
begin
	select a.codigo, a.nombre, am.resultados, im.posicionResultado
    from AlumnosMuestra am
    inner join Alumno a on a.idAlumno = am.fidAlumno
    left join IndicadorXMuestra im on im.fidMuestraMedicion = am.fidMuestraMedicion
    where am.fidMuestraMedicion=_idMuestra and im.fidIndicador=_idIndicador and am.activo
    ORDER BY a.codigo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReporteHistoricoMediciones` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ReporteHistoricoMediciones`(
    IN _periodo varchar(6),
    IN _nivel INT,
    IN _codCurso varchar(6),
    IN _idEspecialidad INT
)
BEGIN
	declare _codigo varchar(6);
    if _codCurso = 'TODOS' then set _codigo = ''; end if;
    if _codCurso != 'TODOS' then set _codigo = _codCurso; end if;
    
	IF _nivel = 1 then 
	SELECT e.nombreEspecialidad,c.codigoCompetencia, i.idIndicador,
    i.codigo, i.descripcion as descripcionI, ifnull(sum(ind.totalResultados),0) as tRsultado,ifnull(sum(ind.totalesCumplidos),0) as tCumplidos, ifnull(sum(ind.numeroAlumnos),0) as cantAlumnos,
    cic.nombre as ciclo, es.nombreCurso,es.idEspacioMedicion, es.codigo as codCurso, ifnull(p.niveles,0) as niveles, ifnull(p.minimoAprobatorio,0) as minimoAprobatorio , ifnull(p.porcentajeMinimo,0) as porcentajeMinimo
    FROM IndicadorXMuestra ind 
    inner join MuestraMedicion m
    on m.idMuestraMedicion = ind.fidMuestraMedicion
    inner join EspacioMedicion es
	on es.idEspacioMedicion= m.fidEspacioMedicion
	inner join Medicion mm
    on mm.idMedicion=es.fidMedicion
    inner join cicloAcademico cic
	on cic.idcicloAcademico = es.fidCicloAcademico
    inner join Indicador i 
    on i.idIndicador=ind.fidIndicador
	inner join Competencia c
    on c.idCompetencia=i.fidCompetencia
    inner join Especialidad e
    on e.idEspecialidad=c.fidEspecialidad
    left join Parametros p
    on p.idParametro=mm.fidParametro
    where cic.nombre = _periodo
    and c.fidEspecialidad = _idEspecialidad
    and (es.codigo LIKE CONCAT('%',_codigo,'%'))
    and m.enviado=1 and m.activo=1
    group by c.idCompetencia, i.idIndicador, cic.nombre, es.idEspacioMedicion
    order by es.codigo,c.codigoCompetencia, i.codigo, cic.nombre;
    else 
	SELECT e.nombreEspecialidad,c.codigoCompetencia, i.idIndicador,
    i.codigo, i.descripcion as descripcionI, ifnull(ind.totalResultados,0) as tRsultado, ifnull(ind.totalesCumplidos, 0) as tCumplidos, ifnull(ind.numeroAlumnos, 0) as cantAlumnos,
    cic.nombre as ciclo, es.nombreCurso,es.idEspacioMedicion, es.codigo as codCurso, concat(u.nombres,' ',u.apellidoPaterno,' ',u.apellidoMaterno) as docente, m.codigo as horario,
    ifnull(p.niveles,0) as niveles, ifnull(p.minimoAprobatorio,0) as minimoAprobatorio , ifnull(p.porcentajeMinimo,0) as porcentajeMinimo, m.idMuestraMedicion
    FROM IndicadorXMuestra ind 
    inner join MuestraMedicion m
    on m.idMuestraMedicion = ind.fidMuestraMedicion
    inner join EspacioMedicion es
	on es.idEspacioMedicion= m.fidEspacioMedicion
	inner join Medicion mm
    on mm.idMedicion=es.fidMedicion
    inner join cicloAcademico cic
	on cic.idcicloAcademico = es.fidCicloAcademico
    inner join Indicador i 
    on i.idIndicador=ind.fidIndicador
	inner join Competencia c
    on c.idCompetencia=i.fidCompetencia
    inner join Especialidad e
    on e.idEspecialidad=c.fidEspecialidad
    left join Parametros p
    on p.idParametro=mm.fidParametro
	inner join Perfil per
    on per.fidMuestra=m.idMuestraMedicion
    inner join Usuario u
    on u.idUsuario=per.fidUsuario
    where cic.nombre = _periodo
    and c.fidEspecialidad = _idEspecialidad
    and m.enviado=1 and m.activo=1
    and (es.codigo LIKE CONCAT('%',_codigo,'%'))
    order by es.codigo,m.codigo,c.codigoCompetencia, i.codigo, cic.nombre;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReporteIndicadores` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ReporteIndicadores`(
    IN _estado VARCHAR(10),
    IN _fechaD DATETIME,
    IN _fechaH DATETIME,
    IN _competencia2 VARCHAR(10),
    IN _idEspecialidad INT
)
BEGIN
	declare _activo INT;
	declare _cantComp INT;
    declare _competencia VARCHAR(10);
    if _competencia2 = 'TODOS' then set _competencia='';
    else set _competencia=_competencia2; end if;
    if _estado='INACTIVOS' then set _activo=1; end if;
    if _estado='ACTIVOS' then set _activo=0; end if;
    if _estado='TODOS' then set _activo=2; end if;
	SELECT c.idCompetencia,c.codigoCompetencia, c.descripcion as descripcionC, c.activo as activoC, c.usuarioCreacion as usuarioCreacionC,
    c.fechaCreacion as fechaCreacionC,  ifnull(c.usuarioAnulacion,'')  as usuarioAnulacionC,  ifnull(c.fechaAnulacion,'') as fechaAnulacionC, 
    i.codigo, i.descripcion as descripcionI, i.usuarioCreacion as usuarioCreacionI, i.fechaCreacion as fechaCreacionI, ifnull(i.usuarioAnulacion,'')   as usuarioAnulacionI, 
	ifnull(i.fechaAnulacion ,'') as fechaAnulacionI, i.activo as activoI, i.niveles, r.nivel, r.descripcion as descripcionR
    FROM Competencia c 
    left join Indicador i 
    on i.fidCompetencia=c.idCompetencia 
    left join Rubrica r
    on r.fidIndicador=i.idIndicador
    left join Especialidad e
    on e.idEspecialidad=c.fidEspecialidad
	where (i.fechaCreacion > _fechaD AND i.fechaCreacion <= DATE_ADD(_fechaH, INTERVAL 2 DAY))
    and (c.codigoCompetencia LIKE CONCAT('%',_competencia,'%'))
    and i.activo<>_activo and c.fidEspecialidad=_idEspecialidad
    order by c.codigoCompetencia, i.codigo, r.nivel;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReporteObjetivoEducacional` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ReporteObjetivoEducacional`(
	#la fecha en formato yyyy-mm-dd
    #si _estado2 es 2 significa que lista todos
    #si estado2 es 1 significa que lista los anulados
    #si estado2 es 0 lista los activos
    in _fidEspecialidad int,
	in _estado2 varchar(10),
    in _fechaInicio datetime,
    in _fechaFin datetime
)
begin
	
	declare _estado int;
    if _estado2='INACTIVOS' then set _estado=1; end if;
    if _estado2='ACTIVOS' then set _estado=0; end if;
    if _estado2='TODOS' then set _estado=2; end if;

	select e.codigoEspecialidad, e.nombreEspecialidad, oe.codigoObjetivo, oe.sumilla, oe.descripcion, 
    CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) AS nombreUsuarioCreacion,
    oe.fechaCreacion,
    CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) AS nombreUsuarioAnulacion,
    oe.fechaAnulacion, oe.activo
    from ObjetivoEducacional oe
    inner join Especialidad e on e.idEspecialidad = oe.fidEspecialidad
    left join Usuario u on u.idUsuario =  oe.usuarioCreacion
    left join Usuario u2 on u2.idUsuario = oe.usuarioAnulacion
    where oe.fechaCreacion >= _fechaInicio and oe.fechaCreacion <= DATE_ADD(_fechaFin, INTERVAL 1 DAY) - INTERVAL 1 SECOND
    and oe.activo <> _estado and oe.fidEspecialidad = _fidEspecialidad;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReportePlanDeMejora` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ReportePlanDeMejora`(
	in _fidEspecialidad int,
	in _estadoTemp varchar(10),
    in _fechaInicio datetime,
    in _fechaFin datetime
)
begin
    declare _estado int;
    declare _activo int;
    if _estadoTemp='INACTIVOS' then set _estado=0; end if;
    if _estadoTemp='ACTIVOS' then set _estado=1; end if;
    if _estadoTemp='TODOS' then set _estado=2; end if;
    if _estado=1 then set _activo=0; end if;
    if _estado=0 then set _activo=1; end if;
    if _estado=2 then set _activo=2; end if;

	select e.codigoEspecialidad, e.nombreEspecialidad, 
    pm.idPlanMejora, pm.descripcion as oportunidadMejora, 
    ep.descripcion as estadoPlan,
    pp.idPropuesta, pp.descripcion as descripcionPropuesta,
    ac.descripcion as descripcionActividad, ac.fechaInicio, ac.fechaFin, ep2.descripcion as estadoActividad, ac.evidencia as evidenciaActividad,
    ac.responsable as responsableActividad,
    pm.activo as activoPlan
    from PlanMejora pm
    inner join Especialidad e on e.idEspecialidad = pm.fidEspecialidad
    inner join EstadoPlan ep on ep.idEstadoPlan = pm.fidEstado
    inner join Propuesta pp on pp.fidPlanMejora = pm.idPlanMejora
    left join Actividad ac on ac.fidPropuesta = pp.idPropuesta
    inner join EstadoPlan ep2 on ep2.idEstadoPlan = ac.fidEstado
    where pm.fechaCreacion >= _fechaInicio and pm.fechaCreacion <= DATE_ADD(_fechaFin, INTERVAL 1 DAY) - INTERVAL 1 SECOND
    and pm.activo <> _activo
    and pm.fidEspecialidad = _fidEspecialidad
    and pp.activo=1 and ac.activo=1
    ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReporteResultadosGeneral` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ReporteResultadosGeneral`(
    IN _periodoI varchar(6),
    IN _periodoF varchar(6),
    IN _codCurso varchar(6),
    IN _idEspecialidad INT
)
BEGIN
	declare _codigo varchar(6);
    
    if _codCurso = 'TODOS' then set _codigo = ''; end if;
    if _codCurso != 'TODOS' then set _codigo = _codCurso; end if;
    
	SELECT e.nombreEspecialidad,c.codigoCompetencia, i.idIndicador,
    i.codigo, i.descripcion as descripcionI, ifnull(sum(ind.totalesCumplidos),'0') as tCumplidos, ifnull(sum(ind.numeroAlumnos),'0')as cantAlumnos,
    cic.nombre as ciclo, es.nombreCurso,es.idEspacioMedicion, es.codigo as codCurso
    FROM IndicadorXMuestra ind 
    inner join MuestraMedicion m
    on m.idMuestraMedicion = ind.fidMuestraMedicion
    inner join EspacioMedicion es
	on es.idEspacioMedicion= m.fidEspacioMedicion
	inner join cicloAcademico cic
	on cic.idcicloAcademico = es.fidCicloAcademico
    inner join Indicador i 
    on i.idIndicador=ind.fidIndicador
	inner join Competencia c
    on c.idCompetencia=i.fidCompetencia
    inner join Especialidad e
    on e.idEspecialidad=c.fidEspecialidad
    where (cic.nombre BETWEEN _periodoI  AND _periodoF)
    and c.fidEspecialidad=_idEspecialidad
    and (es.codigo LIKE CONCAT('%',_codigo,'%'))
    and m.enviado=1
    and m.activo=1
    group by c.idCompetencia, i.idIndicador, cic.nombre, es.idEspacioMedicion
    order by c.codigoCompetencia, i.codigo, cic.nombre;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ReporteSeguimientoDeMuestras` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ReporteSeguimientoDeMuestras`(
	in _fidEspecialidad int,
	in _estadoTemp varchar(10),
    in _fechaInicio datetime,
    in _fechaFin datetime
)
begin
	declare _estado int;
    declare _activo int;
    if _estadoTemp='INACTIVOS' then set _estado=0; end if;
    if _estadoTemp='ACTIVOS' then set _estado=1; end if;
    if _estadoTemp='TODOS' then set _estado=2; end if;
    if _estado=1 then set _activo=0; end if;
    if _estado=0 then set _activo=1; end if;
    if _estado=2 then set _activo=2; end if;
    
    select  e.nombreEspecialidad, ca.nombre as nombreCiclo , em.codigo as codigoEspacio, em.nombreCurso, 
    em.fechaLimite , mm.codigo as codigoMuestra, 
    mm.enviado, mm.activo as estadoMuestra, 
    CONCAT(u.nombres, ' ', u.apellidoPaterno, ' ', u.apellidoMaterno) AS responsableMuestraMedicion
    from MuestraMedicion mm
    inner join EspacioMedicion em on em.idEspacioMedicion = mm.fidEspacioMedicion
    inner join Medicion med on med.idMedicion = em.fidMedicion
    inner join Especialidad e on e.idEspecialidad = med.fidEspecialidad
    inner join cicloAcademico ca on ca.idcicloAcademico = em.fidCicloAcademico
    #perfil el responsable de especialidad
    #inner join Perfil p on p.fidEspecialiad = e.idEspecialidad and activo=1 and esAsistente=0
    inner join Perfil p2 on p2.fidMuestra = mm.idMuestraMedicion and p2.activo=1 and p2.esAsistente=0
    inner join Usuario u on u.idUsuario = p2.fidUsuario

    where mm.fechaCreacion >= _fechaInicio and mm.fechaCreacion <= DATE_ADD(_fechaFin, INTERVAL 1 DAY) - INTERVAL 1 SECOND
    and mm.activo <> _activo and e.idEspecialidad = _fidEspecialidad;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SolicitudModificarContrasenia` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `SolicitudModificarContrasenia`(
	IN _idUsuario INT,
	IN _contrasenia VARCHAR (200),
    IN _codigo VARCHAR (100),
    OUT _exito int
)
BEGIN
	DECLARE _codigo2 VARCHAR (100);
	DECLARE _codigoRecuperacion VARCHAR(100);
    SET _exito = 0;
    SET _codigo2 = MD5(_codigo);
    -- verifico si codigo 2 esta en la bd
    SELECT codigo INTO _codigoRecuperacion FROM CodigosRecuperarContrasenia 
    WHERE fidUsuario = _idUsuario AND codigo = _codigo2 AND activo = 1;
    -- set _exito=0; en proceso
    IF _codigoRecuperacion IS NOT NULL THEN
        CALL ModificarContrasenia(_idUsuario, _contrasenia);
        SET _exito = 1;
        call AnularCodigoRecuparContrasenia(_idUsuario);
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ValidacionEspacioYMedicionMasivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `ValidacionEspacioYMedicionMasivo`(
    in _codDocente varchar(12)
)
begin
    Declare _idDocente int;
    set _idDocente = (SELECT idUsuario from Usuario where codigoPUCP=_codDocente and activo=1);
    if _idDocente!=0 then
		select _idDocente as ID;
	else 
		select 0 as ID;
    end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerificarCorreo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `VerificarCorreo`(
	IN _correo VARCHAR (200),
    -- OUT _existe INT,
    OUT _idUsuario INT
)
BEGIN

	SET _idUsuario = 0;
    
    SELECT idUsuario INTO _idUsuario 
    FROM Usuario 
    WHERE Usuario.activo=1 AND Usuario.correo = _correo;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerificarUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `VerificarUsuario`(
    IN _correo varchar(200),
    IN _contrasenia varchar(20)
)
BEGIN
	declare _contrasenia2 VARCHAR(200);
	declare canti1 int;
    set _contrasenia2 = MD5(_contrasenia);
    SET canti1 = (SELECT IFNULL(count(*),0)  FROM Usuario
    WHERE correo = _correo and activo=1) + (SELECT IFNULL(count(*),0) FROM Usuario 
    WHERE correo = _correo and contrasenia=_contrasenia2 and activo=1);
    SELECT canti1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-29 23:12:27
