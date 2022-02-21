import { PropertyCollection } from "./properties";
export class InventoryItem{
    iref: number;
    stackedItemsNum: number;
    changedEntriesNum: number;
    changedEntries: PropertyCollection[];

    constructor(iref: number, stackedItemsNum: number, changedEntriesNum: number, changedEntries: PropertyCollection[]){
        this.iref = iref;
        this.stackedItemsNum = stackedItemsNum;
        this.changedEntriesNum = changedEntriesNum;
        this.changedEntries = changedEntries;
    }
}