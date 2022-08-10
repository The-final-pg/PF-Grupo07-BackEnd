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
function offerFilteredByProfession(input, profession) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input && profession) {
            console.log("Estoy aca 1");
            const filteredByProfession = yield Offer.findAll({
                where: {
                    profession: {
                        [sequelize_1.Op.contains]: [profession],
                    },
                },
                include: UserClient,
            });
            return filteredByProfession;
        }
        else {
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
        }
    });
}
exports.offerFilteredByProfession = offerFilteredByProfession;
function offerFilteredByRating(input, rating) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input && rating) {
            const filteredByRating = yield Offer.findAll({
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
        }
        else {
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
        }
    });
}
exports.offerFilteredByRating = offerFilteredByRating;
function offerFilteredByRemuneration(input, remMax, remMin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input && remMax && remMin) {
            const findedByName = yield Offer.findAll({
                where: {
                    max_remuneration: {
                        [sequelize_1.Op.lte]: parseInt(remMax),
                    },
                    min_remuneration: {
                        [sequelize_1.Op.gte]: parseInt(remMin),
                    },
                },
                include: UserClient,
            });
            return findedByName;
        }
        else {
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
                    max_remuneration: {
                        [sequelize_1.Op.lte]: parseInt(remMax),
                    },
                    min_remuneration: {
                        [sequelize_1.Op.gte]: parseInt(remMin),
                    },
                },
                include: UserClient,
            });
            return findedByName;
        }
    });
}
exports.offerFilteredByRemuneration = offerFilteredByRemuneration;
function offerAllFiltersOn(input, profession, rating, remMax, remMin) {
    return __awaiter(this, void 0, void 0, function* () {
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
                    max_remuneration: {
                        [sequelize_1.Op.lte]: parseInt(remMax),
                    },
                    min_remuneration: {
                        [sequelize_1.Op.gte]: parseInt(remMin),
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
            return allFiltersOn;
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
                    max_remuneration: {
                        [sequelize_1.Op.lte]: parseInt(remMax),
                    },
                    min_remuneration: {
                        [sequelize_1.Op.gte]: parseInt(remMin),
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
            return allFiltersOn;
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
                    max_remuneration: {
                        [sequelize_1.Op.lte]: parseInt(remMax),
                    },
                    min_remuneration: {
                        [sequelize_1.Op.gte]: parseInt(remMin),
                    },
                },
                include: {
                    model: UserClient,
                },
            });
            return allFiltersOn;
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
            return allFiltersOn;
        }
        if (!input && profession && rating && remMax && remMin) {
            const allFiltersOn = yield Offer.findAll({
                where: {
                    profession: {
                        [sequelize_1.Op.contains]: [profession],
                    },
                    max_remuneration: {
                        [sequelize_1.Op.lte]: parseInt(remMax),
                    },
                    min_remuneration: {
                        [sequelize_1.Op.gte]: parseInt(remMin),
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
            return allFiltersOn;
        }
        if (!input && !profession && rating && remMax && remMin) {
            const allFiltersOn = yield Offer.findAll({
                where: {
                    max_remuneration: {
                        [sequelize_1.Op.lte]: parseInt(remMax),
                    },
                    min_remuneration: {
                        [sequelize_1.Op.gte]: parseInt(remMin),
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
            return allFiltersOn;
        }
        if (!input && profession && !rating && remMax && remMin) {
            const allFiltersOn = yield Offer.findAll({
                where: {
                    profession: {
                        [sequelize_1.Op.contains]: [profession],
                    },
                    max_remuneration: {
                        [sequelize_1.Op.lte]: parseInt(remMax),
                    },
                    min_remuneration: {
                        [sequelize_1.Op.gte]: parseInt(remMin),
                    },
                },
                include: {
                    model: UserClient,
                },
            });
            return allFiltersOn;
        }
        if (!input && profession && rating && !remMax && !remMin) {
            const allFiltersOn = yield Offer.findAll({
                where: {
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
            return allFiltersOn;
        }
    });
}
exports.offerAllFiltersOn = offerAllFiltersOn;
