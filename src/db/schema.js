import Realm from 'realm';

class MenuItem extends Realm.Object {}
MenuItem.schema = {
  name: 'MenuItem',
  properties: {
    store_id: 'string', 
    category_id: 'string',
    category: 'string?',
    itemsData: {type: 'list', objectType: 'Item'}, 
  },
};

class Item extends Realm.Object {}
Item.schema = {
  name: 'Item',
  properties: {
    store_id: 'string',
    category_id: 'string', 
    category: 'string',
    item_id: 'string',
    name: 'string?',
    description: 'string?',
    price: 'string?', 
    image: 'string?',
    status: 'bool?',
    subItem: {type: 'list', objectType: 'SubItem'},
    notes: 'string?', 
  },
};

class SubItem extends Realm.Object {}
SubItem.schema = {
  name: 'SubItem',
  properties: {
    id: 'string',
    name: 'string?',
    extra: {type: 'bool', default: false},
    no: {type: 'bool', default: false},
  },
};

class CategoryItem extends Realm.Object {}
CategoryItem.schema = {
  name: 'CategoryItem',
  properties: {
    name: 'string?',
    id: 'string',
  },
};

const realm = new Realm({schema: [MenuItem, Item, SubItem, CategoryItem]});



export default realm;
