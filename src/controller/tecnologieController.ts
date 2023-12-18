import { Request, Response } from "express";

import {
  serviceCreateTechnologies,
  serviceUpdateTechnologies,
  serviceDeleteTechnologies,
  serviceGetAllTechnologies,
  serviceGetTechnologies,
} from "../services/technologies";
import { Technologie } from "../@types/Technologies";

const verifyFields = (
  { title, deadline }: { title: string; deadline: string },
  res: Response
) => {
  if (!title || !deadline) {
    return res.status(400).json({ message: "title or deadline are required" });
  }
};

const technologieExist = async (idTech: string, res: Response) => {
  const tech = await serviceGetTechnologies(idTech);
  const isTechExist = Boolean(tech);
  if (!isTechExist) {
    return res.status(404).json({ message: "Technologie not found" });
  }
};

export const createTechnologie = async (req: Request, res: Response) => {
  const { title, deadline } = req.body;
  const userId = req.headers.userid as string;

  verifyFields({ title, deadline }, res);

  const newTech = { title, deadline, userId };
  const tecnologie = await serviceCreateTechnologies(newTech as Technologie);
  return res.status(201).json(tecnologie);
};

export const getTechnologies = async (req: Request, res: Response) => {
  const { userid } = req.headers;
  const tecnologie = await serviceGetAllTechnologies(userid as string);
  return res.status(200).json(tecnologie);
};

export const putTechnologies = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, deadline } = req.body;

  verifyFields({ title, deadline }, res);
  await technologieExist(id, res);

  const newTech: any = { title, deadline };
  const tech = await serviceUpdateTechnologies(id, newTech);
  return res.status(203).json(tech);
};

export const patchTechnologies = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  await technologieExist(id, res);

  const tech = await serviceUpdateTechnologies(id, data);
  return res.status(203).json(tech);
};

export const deleteTechnologies = async (req: Request, res: Response) => {
  const { id } = req.params;

  await technologieExist(id, res);
  await serviceDeleteTechnologies(id);

  return res.status(204).send();
};
