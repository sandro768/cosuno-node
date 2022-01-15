import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";

type companyType = {
  name: string;
  specialities: string[];
  city: string;
};

export const companies = (req: Request, res: Response, next: NextFunction) => {
  const companiesString = fs
    .readFileSync(path.resolve(__dirname, "../models/companies.json"))
    .toString();
  const companies = JSON.parse(companiesString).filter(
    ({ name, specialities }: companyType) => {
      // filter by specialities if passed
      const specialitiesString = req.query.specialities;
      if (specialitiesString && typeof specialitiesString === "string") {
        const retrievedSpecialities = specialitiesString.split(",");
        if (
          !retrievedSpecialities.every((spec) =>
            specialities.includes(spec.trim())
          )
        ) {
          return false;
        }
      }
      // filter search
      const re = new RegExp(req.query.search?.toString() || "", "i");
      return name.search(re) !== -1;
    }
  );
  res.status(200).json(companies);
};
