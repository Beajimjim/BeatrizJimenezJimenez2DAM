-- Iniciar una transacción
START TRANSACTION;

-- Crear la tabla si no existe
CREATE TABLE IF NOT EXISTS palabras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    previas TEXT NOT NULL,
    siguiente TEXT NOT NULL
);

-- Insertar datos en la tabla
INSERT INTO palabras (previas, siguiente) VALUES 
('el ingenioso hidalgo', 'don'),
('ingenioso hidalgo don', 'quijote'),
('hidalgo don quijote', 'de'),
('don quijote de', 'la'),
('quijote de la', 'mancha'),
('de la mancha', ''),
('la mancha ', ''),
('mancha  ', 'tasa'),
('  tasa', ''),
(' tasa ', 'yo,'),
('tasa  yo,', 'juan'),
(' yo, juan', 'gallo'),
('yo, juan gallo', 'de'),
('juan gallo de', 'andrada,'),
('gallo de andrada,', 'escribano'),
('de andrada, escribano', 'de'),
('andrada, escribano de', 'cámara'),
('escribano de cámara', 'del'),
('de cámara del', 'rey'),
('cámara del rey', 'nuestro'),
('del rey nuestro', 'señor,'),
('rey nuestro señor,', 'de'),
('nuestro señor, de', 'los'),
('señor, de los', 'que'),
('de los que', 'residen'),
('los que residen', 'en'),
('que residen en', 'su'),
('residen en su', 'consejo,'),
('en su consejo,', 'certifico'),
('su consejo, certifico', 'y'),
('consejo, certifico y', 'doy'),
('certifico y doy', 'fe'),
('y doy fe', 'que,'),
('doy fe que,', 'habiendo'),
('fe que, habiendo', 'visto'),
('que, habiendo visto', 'por'),
('habiendo visto por', 'los'),
('visto por los', 'señores'),
('por los señores', 'dél'),
('los señores dél', 'un'),
('señores dél un', 'libro'),
('dél un libro', 'intitulado'),
('un libro intitulado', 'el'),
('libro intitulado el', 'ingenioso'),
('intitulado el ingenioso', 'hidalgo');

-- Confirmar la transacción
COMMIT;
