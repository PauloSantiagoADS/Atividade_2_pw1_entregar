import { db } from "../db";
import { Technologie } from "../@types/Technologies";

const dbTech = db.technology;

export const serviceCreateTechnologies = ({
  title,
  userId,
  deadline,
}: Technologie) => {
  const data: Technologie = {
    title,
    userId,
    deadline: new Date(deadline),
    studied: false,
  };
  const tech = dbTech.create({ data });
  return tech;
};

export const serviceGetTechnologies = (id: string) => {
  return dbTech.findUnique({
    where: { id },
  });
};

export const serviceGetAllTechnologies = (userId: string) => {
  return dbTech.findMany({
    where: { userId },
  });
};

export const serviceUpdateTechnologies = (id: string, data: Technologie) => {
  if (data.deadline) {
    data.deadline = new Date(data.deadline);
  }
  return dbTech.update({
    where: { id },
    data,
  });
};

export const serviceDeleteTechnologies = (id: string) => {
  return dbTech.delete({
    where: { id },
  });
};
