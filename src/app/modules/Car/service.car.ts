import { TCar } from "./interface.car";
import { Car } from "./model.car";

const createACarIntoDB = async (payload: TCar) => {
  //   default status
  const status = "available";
  const isDeleted = false;
  const result = await Car.create({ ...payload, status, isDeleted });
  return result;
};
const getAllCarFromBD = async () => {
  const result = await Car.find();

  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);

  return result;
};
export const carServices = {
  createACarIntoDB,
  getAllCarFromBD,
  getSingleCarFromDB,
};
