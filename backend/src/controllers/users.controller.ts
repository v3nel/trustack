import type { Request, Response, NextFunction } from "express";
import * as usersService from "@/services/users.service";
import { AppError } from "@/middlewares/errorHandler";

type Params = { id: string };

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await usersService.getAllUsers();
    res.json({ status: "success", data: users });
  } catch (error) {
    next(error);
  }
}

export async function getById(
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await usersService.getUserById(Number(req.params.id));
    if (!user) {
      throw new AppError(404, "User not found");
    }
    res.json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
}

export async function update(
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await usersService.updateUser(Number(req.params.id), req.body);
    if (!user) {
      throw new AppError(404, "User not found");
    }
    res.json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
}

export async function remove(
  req: Request<Params>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await usersService.deleteUser(Number(req.params.id));
    if (!user) {
      throw new AppError(404, "User not found");
    }
    res.json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
}
