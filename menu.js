class Item {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    introduce() {
        console.log(`${this.name} is this type of item ${this.position}.`);
    }
}

class Store {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    addItem(item) {
        if (item instanceof Item) {
            this.items.push(item);
        } else {
            throw new Error(`You can only add an instance of Item. Argument is not a item: ${item}`);
        }
    }

    introduce() {
        console.log(`${this.name} has ${this.items.length} items.`);
    }
}


class Menu {
    constructor() {
        this.stores = []; //empty array for user to add into
        this.selectedStore = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) { //switch statement for selections
            switch (selection) {
                case '1':
                    this.createStore();
                    break;
                case '2':
                    this.viewStore();
                    break;
                case '3':
                    this.deleteStore();
                    break;
                case '4':
                    this.displayStores();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('See ya later!'); //if no selection made
    }

     showMainMenuOptions() { //creating main menu prompt
         return prompt(`
            0) exit
            1) create new store
            2) view store
            3) delete store
            4) display all stores
         `);
     }

     showStoreMenuOptions(storeInfo) {
         return prompt(`
            0) back
            1) create item
            2) delete item
            
            ${storeInfo} 
         `);
     }

     displayStores() {
        let storeString = '';
        for (let i = 0; i < this.stores.length; i++) { //iterate through stores and show what was input
            storeString += i + ') ' + this.stores[i].name + '\n';
        }
        alert(storeString); //makes alert of the store string for display
     }

     createStore() {
         let name = prompt('Enter name for new store:');
         this.stores.push(new Store(name)); //push new store onto stores array
         console.log(name); //printing to console so I can view what was input
     }

     viewStore() {
         let index = prompt('Enter the index of the store you wish to view:');
         if (index > -1 && index < this.stores.length) {      //validating user input
            this.selectedStore= this.stores[index];
            let description = 'Store Name is: ' + this.selectedStore.name + '\n';

            for (let i = 0; i < this.selectedStore.items.length; i++) {
                description += i + ') ' + this.selectedStore.items[i].name 
                + ' - ' + this.selectedStore.items[i].position + '\n';           
            }

            let selection = this.showStoreMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem();
            }
         }
     }

     deleteStore() {
         let index = prompt('Enter the index of the store you want to delete:');
         if (index > -1 && index < this.stores.length) {
             this.stores.splice(index, 1); //removes the index user chooses and makes sure to only take off one index
         }
     }

     createItem() {
         let name = prompt('Enter name for new item:');
         let position = prompt('Enter position for new item:');
         this.selectedStore.items.push(new Item(name, position)); //pushing new item to items array
     }

     deleteItem() {
         let index = prompt('Enter the index of the item you wish to delete:');
         if (index > -1 && index < this.selectedStore.items.length) {
             this.selectedStore.items.splice(index, 1); //removing selected index 
         }
     }
}

let menu = new Menu();
menu.start();