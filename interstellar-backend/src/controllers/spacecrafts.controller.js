import Spacecraft from "../models/Spacecraft";
import "mongoose-pagination";
import fs from 'fs';

export const createSpacecraft = async (req, res) => {
  const { name, pricePerDay, capacity, image } = req.body;

  try {
    const newSpacecraft = new Spacecraft({
      name,
      pricePerDay,
      capacity,
      image,
    });

    const spacecraftSaved = await newSpacecraft.save();

    res.status(201).json(spacecraftSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getSpacecraftById = async (req, res) => {
  const { spacecraftId } = req.params;

  const spacecraft = await Spacecraft.findById(spacecraftId);
  res.status(200).json(spacecraft);
};

export const getSpacecrafts = async (req, res) => {
  const spacecrafts = await Spacecraft.find();
  return res.json(spacecrafts);
};

export const getSpacecraftsByPage = async (req, res) => {
  let page = 1;
  const itemsPerPage = 10;

  if (req.params.page) {
    page = req.params.page;
  }

  Spacecraft.find().paginate(page, itemsPerPage, (err, spacecrafts, total) => {
    if (err) return res.status(500).json({ message: 'Error' });
    return res.status(200).json({
      total: +total,
      pages: Math.ceil(total / itemsPerPage),
      page: +page,
      itemsPerPage: itemsPerPage,
      spacecrafts
    });


  });
};

export const updateSpacecraftById = async (req, res) => {
  const updatedSpacecraft = await Spacecraft.findByIdAndUpdate(
    req.params.spacecraftId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedSpacecraft);
};

export const deleteSpacecraftById = async (req, res) => {
  console.log(spacecraftId);
  const { spacecraftId } = req.params;

  await Spacecraft.findByIdAndDelete(spacecraftId);

  // code 200 is ok too
  res.status(204).json();
};

export const getImageFile = async (req, res) => {
  const imageFile = req.params.spacecraftImage;
  const pathFile = './uploads/users/' + imageFile;

  fs.exists(pathFile, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(pathFile));
    } else {
      res.status(200).send({ message: 'Image not found' });
    }
  });
}
