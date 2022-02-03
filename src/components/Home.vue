<template>
  <div class="wrapper_home">
      <div class="home">
          <Button class="btn" label="Добавить" @click="modal = !modal"/>
          <TreeTable :value="nodes" sortMode="multiple" removableSort>
                <Column field="name" header="Имя" :sortable="true" :expander="true" ></Column>
                <Column field="tel" header="Телефон" :sortable="true"></Column>

          </TreeTable>

          <Dialog :visible.sync="modal"  :style="{width: '30vw'}">
            <template #header>
                <h3>Добавление пользователя</h3>
            </template>

            <div class="cont">
                <div class="container_input">
                    <label for="username">Имя</label>
                    <InputText v-model="newEmployee.name" class="input_text" id="username" type="text"  />
                </div>
                <div class="container_input">
                    <label for="username">Телефон</label>
                    <InputText v-model="newEmployee.tel" class="input_text" id="username" type="text"  />
                </div>
                <div class="container_input">
                    <label for="username">Начальник</label>
                    <Dropdown class="input_text" v-model="newEmployee.сhief" :options="allEmployees" optionLabel="name" />
                </div>
                

            </div>    
            <template #footer>
                <Button label="Сохранить" icon="pi pi-check" autofocus  @click="addEmployee" />
            </template>
          </Dialog>
  </div>
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import TreeTable from 'primevue/treetable'
import Button from 'primevue/button'
import Column from 'primevue/column'
export default {    
    name:'Home',
    components:{
        TreeTable,
        Button,
        Column,
        Dialog,
        InputText,
        Dropdown
    },
    data() {
        return {
            modal:false,
            nodes: [
                {   
                    key:'0',
                    data:{id:1,name:'Alex',tel:8657},
                    children:[
                        {
                    "key": "0-0",
                    "data":{
                        "name":"Vue",
                        "tel":"984093",
                    },
                    children:[]
                    
                        }  
                    ]
                },
                {   
                    key:'1',
                    data:{id:2,name:'Vlad',tel:8798},
                    children:[]
                },
                {   
                    key:'2',
                    data:{id:3,name:'Bob',tel:8456},
                    children:[]
                }
                
            ], 
            allEmployees:[
                {   
                    key:'0',
                    name:'Alex',
                },
                {
                    "key": "0-0",
                    "name":"Vue",
                },
                {   
                    key:'1',
                    name:'Vlad'
                },
                {   
                    key:'2',
                    name:'Bob'
                }
            ],
            key_arr:['0','0-0','1','2'],
            newEmployee:{
                name:'',
                tel:'',
                сhief:''                 
            }
        }
    },
    mounted(){
        if(localStorage.key_arr){
            this.key_arr = JSON.parse(localStorage.key_arr)
            this.allEmployees = JSON.parse(localStorage.allEmployees)
            this.nodes =JSON.parse(localStorage.nodes) 
            console.log(JSON.parse(localStorage.nodes) )
        }
        
    },
    methods:{
        saveLocalStorage(){
            localStorage.key_arr = JSON.stringify(this.key_arr)
            localStorage.allEmployees = JSON.stringify(this.allEmployees)
            localStorage.nodes =JSON.stringify(this.nodes) 
             console.log(JSON.parse(localStorage.nodes) )
        },

        addEmployee(){
            if(!this.newEmployee.сhief.key){
            
                this.key_arr.push(String(this.nodes.length))
                this.allEmployees.push({key: String(this.nodes.length),name:this.newEmployee.name})
                this.nodes.push({ key: String(this.nodes.length),
                    data:{
                        name:this.newEmployee.name,
                        tel:this.newEmployee.tel,
                    },
                    children:[]
                })
                this.saveAndClose()
                return
            }

            const chiefKey = this.newEmployee.сhief.key
            let employeeKey = ''

              this.key_arr.forEach((key) => {//просматриваем все ключи присваеваем ключ новому сотруднику
                 const matchedPartOfKey = key.substr(0,chiefKey.length)
                 if (matchedPartOfKey == chiefKey) {
 
                    if(key.length > chiefKey.length){
                        
                        let childrenNumber = key.substr(chiefKey.length);
                        childrenNumber =  childrenNumber.replace('-', '')
                        employeeKey = chiefKey + '-' + ( Number(childrenNumber) + 1)
                        console.log(employeeKey)
                        return
                    }else if(key == chiefKey){
                        employeeKey = key + '-' + 0
                    }
                }
         })
         
        this.key_arr.push(employeeKey)
        this.allEmployees.push({key:employeeKey,name:this.newEmployee.name})

        let newEmployee = {
             key:employeeKey,
             data:{
                name:this.newEmployee.name,
                tel:this.newEmployee.tel,
             },
             children:[]
        }

     //key_arr - массив всех ключей \ child объект который хотим добавить 
        const addChild = (nodes, key_arr, child) => {
            const [currentKey, ...otherKeys] = key_arr
            const currentWorker = nodes.find(( worker ) => worker.key === currentKey)

                if(!currentWorker && otherKeys.length){
                    addChild(nodes,otherKeys,child)
                    return
                }else if(!currentWorker){
                    return
                }
                
                if(chiefKey >= currentWorker.key && chiefKey.substr(0,currentWorker.key.length) === currentWorker.key ){
                    if(currentWorker.key === chiefKey){
                    currentWorker.children.push(child)
                    }else if(otherKeys.length) {
                    addChild(currentWorker.children, otherKeys, child)
                    return
                    }
                    return
                }else{
                    addChild(nodes,otherKeys,child)
                    return
                }
            
            }

            addChild(this.nodes,this.key_arr ,newEmployee)

            this.saveAndClose()

        },
        saveAndClose(){
            this.saveLocalStorage()

            this.newEmployee.name = ''
            this.newEmployee.tel = ''
            this.newEmployee.chief = {}
            this.modal = false
        }

            
    }
}
</script>

<style>

.input_text{
    position: absolute !important;
    right: 0;
    width: 230px ;
}
.container_input{
    position: relative;
    height: 40px;
    width: 100%;
    margin: 10px;
    display: flex;
    align-items: center;

}
.cont{
    padding: 10px;
    max-width: 600px;
    margin: 0 auto;
}
.p-float-label{
    margin-top: 10px;
    margin-bottom: 10px;
}
.btn{
    margin-bottom: 5px;
}
.home{
    max-width: 1000px;
}
.wrapper_home{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 10px;
}
</style>