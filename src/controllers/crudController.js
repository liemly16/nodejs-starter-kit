export default class CrudControler {
    constructor(Model) {
      this.Model = Model
    }
  
    async create(params) {
        return await this.Model.create(params);
    }
  
    async delete(params) {
    }
    
    async getItem(params,scopes,fields) {
    }
  
    async getList(params) {
        return await this.Model.findAll({
            where: {

            }
        });
    }
  
    async update(params,scopes) {
    }
  
    async deleteAll(){
    }
  
  }
  