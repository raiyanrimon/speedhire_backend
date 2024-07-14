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

const updateSingleCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload);
  return result;
};
const DeleteSingleCarFromDB = async (id: string) => {
  const deletedCar = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return deletedCar;
};

export const carServices = {
  createACarIntoDB,
  getAllCarFromBD,
  getSingleCarFromDB,
  updateSingleCarIntoDB,
  DeleteSingleCarFromDB,
};
