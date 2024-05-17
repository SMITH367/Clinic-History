
CREATE DATABASE IF NOT EXISTS HistoryClinic;
use HistoryClinic;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  email varchar(20) NOT NULL UNIQUE,
  password varchar(60) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE classes (
  class_id int AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY (class_id)
);

CREATE TABLE patients (
  identification int NOT NULL,
  name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  identificationType varchar(20) NOT NULL,
  class_patient int NOT NULL,
  birthday DATE NOT NULL,
  phone_number VARCHAR(40),
  PRIMARY KEY (identification)
);

CREATE TABLE consultations (
  id_consultation int NOT NULL AUTO_INCREMENT,
  description VARCHAR(500) NOT NULL,
  patient int NOT NULL,
  date_consultation DATE,
  PRIMARY KEY (id_consultation)
)

CREATE TABLE prescriptions (
  id_prescription int NOT NULL AUTO_INCREMENT,
  prescription VARCHAR(500) NOT NULL,
  patient int NOT NULL,
  date_prescription DATE,
  PRIMARY KEY (id_prescription)
)

ALTER TABLE patients
ADD FOREIGN KEY (class_patient) REFERENCES classes(class_id)

ALTER TABLE consultations
ADD FOREIGN KEY (patient) REFERENCES patients(identification)

ALTER TABLE prescriptions
ADD FOREIGN KEY (patient) REFERENCES patients(identification)
