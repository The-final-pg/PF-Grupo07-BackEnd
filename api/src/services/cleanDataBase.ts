const { Offer } = require("../db");
import { Op } from "sequelize";

export function time() {
  const currentTime = new Date();
  let scheduledTime = new Date();
  scheduledTime.setHours(6);
  scheduledTime.setMinutes(33);
  scheduledTime.setSeconds(0);
  return scheduledTime.getTime() - currentTime.getTime();
}

export async function scheduledFunction() {

  await Offer.update(
    { isActive: false },
    { where: {
      [Op.and]: [
        { isActive: true },
        { state: "active" },
        {
          post_date: {
            [Op.lte]: new Date(new Date().getTime() - 240 * 60 * 60 * 1000),
          },
        },
      ],
    }}
    );
}

export function cleanDataBase() {
  setTimeout(scheduledFunction, time());
}
