import { errorService } from '../services'
import {
    sequelize,
    Sequelize
} from '../models'

export default class CrudControler {
    constructor(Model) {
        this.Model = Model;
    }

    async exec(promise) {
        try {
            let result = await promise;
            if (result === null)
                throw errorService.error("Record not found");
            return result;
        } catch (err) {
            if (err.errors) {
                console.log("@@@@@@@@@@@@@@@@@@@");
                if (err.errors && err.errors[0]) {
                    throw errorService.error(err.errors[0].message)
                } else {
                    throw errorService.error(err.message)
                }
            } else {
                throw errorService.somethingWentWrong()
            }
        }
    }

    async create(params) {
        return await this.exec(this.Model.create(params));
    }

    async delete(params) {
        const item = await this.exec(this.getItem(params));
        return await this.exec(item.destroy(params, {
            returning: true
        }))
    }

    async getItem(params) {
        return await this.exec(this.Model.findOne({
            where: params
        }));
    }

    async getList(params) {
        return await this.exec(this.Model.findAll({
            where: params
        }));
    }

    async update(params, filter) {
        const item = await this.exec(this.getItem(filter));
        return await this.exec(item.update(params));
    }

    async deleteAll(params) {
        const transaction = await sequelize.transaction();

        try {
            let result = await this.exec(this.Model.destroy({
                where: {
                    id: {
                        $in: params.ids
                    }
                }
            }, {
                    transaction,
                    returning: true
                }));

            transaction.commit();
            return result;
        }
        catch (e) {
            transaction.rollback();
            throw e;
        }
    }

}
