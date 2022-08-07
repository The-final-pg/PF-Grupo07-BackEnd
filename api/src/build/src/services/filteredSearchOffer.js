"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerAllFiltersOn = exports.offerFilteredByRemuneration = exports.offerFilteredByRating = exports.offerFilteredByProfession = void 0;
const sequelize_1 = require("sequelize");
const { Offer, UserClient } = require("../db");
const offerFilteredByProfession = (input, profession) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredByProfession = yield Offer.findAll({
        where: {
            [sequelize_1.Op.or]: [
                {
                    title: {
                        [sequelize_1.Op.iLike]: `%${input}%`,
                    },
                },
                {
                    offer_description: {
                        [sequelize_1.Op.iLike]: `%${input}%`,
                    },
                },
            ],
            profession: {
                [sequelize_1.Op.contains]: [profession],
            },
        },
        include: UserClient,
    });
    return filteredByProfession;
});
exports.offerFilteredByProfession = offerFilteredByProfession;
const offerFilteredByRating = (input, rating) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredByRating = yield Offer.findAll({
        where: {
            [sequelize_1.Op.or]: [
                {
                    title: {
                        [sequelize_1.Op.iLike]: `%${input}%`,
                    },
                },
                {
                    offer_description: {
                        [sequelize_1.Op.iLike]: `%${input}%`,
                    },
                },
            ],
        },
        include: {
            model: UserClient,
            where: {
                rating: {
                    [sequelize_1.Op.gte]: parseInt(rating),
                },
            },
        },
    });
    return filteredByRating;
});
exports.offerFilteredByRating = offerFilteredByRating;
const offerFilteredByRemuneration = (input, remMax, remMin) => __awaiter(void 0, void 0, void 0, function* () {
    const findedByName = yield Offer.findAll({
        where: {
            [sequelize_1.Op.or]: [
                {
                    title: {
                        [sequelize_1.Op.iLike]: `%${input}%`,
                    },
                },
                {
                    offer_description: {
                        [sequelize_1.Op.iLike]: `%${input}%`,
                    },
                },
            ],
        },
        include: UserClient,
    });
    const filteredByRemuneration = findedByName.filter((offer) => offer.dataValues.remuneration[0] >= remMin &&
        offer.dataValues.remuneration[1] <= remMax);
    return filteredByRemuneration;
});
exports.offerFilteredByRemuneration = offerFilteredByRemuneration;
const offerAllFiltersOn = (input, profession, rating, remMax, remMin) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(input, profession, rating, remMax, remMin);
    if (input && profession && rating && remMax && remMin) {
        const allFiltersOn = yield Offer.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        title: {
                            [sequelize_1.Op.iLike]: `%${input}%`,
                        },
                    },
                    {
                        offer_description: {
                            [sequelize_1.Op.iLike]: `%${input}%`,
                        },
                    },
                ],
                profession: {
                    [sequelize_1.Op.contains]: [profession],
                },
            },
            include: {
                model: UserClient,
                where: {
                    rating: {
                        [sequelize_1.Op.gte]: parseInt(rating),
                    },
                },
            },
        });
        console.log('allFiltersOn ', allFiltersOn);
        const filteredByRemuneration = allFiltersOn.filter((offer) => offer.dataValues.remuneration[0] >= remMin &&
            offer.dataValues.remuneration[1] <= remMax);
        return filteredByRemuneration;
    }
    if (input && !profession && rating && remMax && remMin) {
        const allFiltersOn = yield Offer.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        title: {
                            [sequelize_1.Op.iLike]: `%${input}%`,
                        },
                    },
                    {
                        offer_description: {
                            [sequelize_1.Op.iLike]: `%${input}%`,
                        },
                    },
                ],
            },
            include: {
                model: UserClient,
                where: {
                    rating: {
                        [sequelize_1.Op.gte]: parseInt(rating),
                    },
                },
            },
        });
        console.log("profession ", allFiltersOn);
        const filteredByRemuneration = allFiltersOn.filter((offer) => offer.dataValues.remuneration[0] >= remMin &&
            offer.dataValues.remuneration[1] <= remMax);
        return filteredByRemuneration;
    }
    if (input && profession && !rating && remMax && remMin) {
        const allFiltersOn = yield Offer.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        title: {
                            [sequelize_1.Op.iLike]: `%${input}%`,
                        },
                    },
                    {
                        offer_description: {
                            [sequelize_1.Op.iLike]: `%${input}%`,
                        },
                    },
                ],
                profession: {
                    [sequelize_1.Op.contains]: [profession],
                },
            },
            include: {
                model: UserClient,
            },
        });
        console.log("rating ", allFiltersOn);
        const filteredByRemuneration = allFiltersOn.filter((offer) => offer.dataValues.remuneration[0] >= remMin &&
            offer.dataValues.remuneration[1] <= remMax);
        return filteredByRemuneration;
    }
    if (input && profession && rating && !remMax && !remMin) {
        const allFiltersOn = yield Offer.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        title: {
                            [sequelize_1.Op.iLike]: `%${input}%`,
                        },
                    },
                    {
                        offer_description: {
                            [sequelize_1.Op.iLike]: `%${input}%`,
                        },
                    },
                ],
                profession: {
                    [sequelize_1.Op.contains]: [profession],
                },
            },
            include: {
                model: UserClient,
                where: {
                    rating: {
                        [sequelize_1.Op.gte]: parseInt(rating),
                    },
                },
            },
        });
        console.log('remuneration ', allFiltersOn);
        return allFiltersOn;
    }
});
exports.offerAllFiltersOn = offerAllFiltersOn;
