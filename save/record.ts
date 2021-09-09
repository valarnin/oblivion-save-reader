import { RecordAI } from "./record_ai";
import { RecordBook } from "./record_book";
import { RecordCell } from "./record_cell";
import { RecordCreature } from "./record_creature";
import { RecordDialog } from "./record_dialog";
import { RecordFaction } from "./record_faction";
import { RecordGeneric } from "./record_generic";
import { RecordQuest } from "./record_quest";
import { bufToInt, bufToByte, bufToShort, bufToArray } from "./util";

export enum RecordType {
    Faction = 6,
    AlchemicalApparatus = 19,
    Armor = 20,
    Book = 21,
    Clothing = 22,
    Ingredient = 25,
    Light = 26,
    Miscellaneous = 27,
    Weapon = 33,
    Ammo = 34,
    NPC = 35,
    Creature = 36,
    SoulGem = 38,
    Key = 39,
    Potion = 40,
    Cell = 48,
    InstanceReference = 49,
    CharacterReference = 50,
    CreatureReference = 51,
    Dialog = 58,
    Quest = 59,
    AI = 61,
};

export default class Record {
    formId = 0;
    type = 0;
    flags = 0;
    version = 0;
    dataSize = 0;
    data: number[] = [];
    subRecord?: RecordBook | RecordFaction | RecordGeneric | RecordCreature | RecordCell | RecordDialog | RecordAI;

    constructor(buf: ArrayBuffer, offset: number) {
        this.formId = bufToInt(buf.slice(offset, offset + 4));             offset += 4;
        this.type = bufToByte(buf.slice(offset, offset + 1));              offset += 1;
        this.flags = bufToInt(buf.slice(offset, offset + 4));              offset += 4;
        this.version = bufToByte(buf.slice(offset, offset + 1));           offset += 1;
        this.dataSize = bufToShort(buf.slice(offset, offset + 2));         offset += 2;
        this.data = bufToArray(buf.slice(offset, offset + this.dataSize));
        switch(this.type) {
            case RecordType.Book:
                this.subRecord = new RecordBook(this, buf, offset);
                break;
            case RecordType.Faction:
                this.subRecord = new RecordFaction(this, buf, offset);
                break;
            case RecordType.AlchemicalApparatus:
            case RecordType.Armor:
            case RecordType.Clothing:
            case RecordType.Ingredient:
            case RecordType.Light:
            case RecordType.Miscellaneous:
            case RecordType.Ammo:
            case RecordType.SoulGem:
            case RecordType.Potion:
            case RecordType.Weapon:
            case RecordType.Key:
                this.subRecord = new RecordGeneric(this, buf, offset);
                break;
            case RecordType.NPC:
            case RecordType.Creature:
                this.subRecord = new RecordCreature(this, buf, offset);
                break;
            case RecordType.Cell:
                this.subRecord = new RecordCell(this, buf, offset);
                break;
            case RecordType.InstanceReference:
                // @TODO
                // this.subRecord = new RecordInstanceReference(this, buf, offset);
                break;
            case RecordType.CharacterReference:
            case RecordType.CreatureReference:
                // @TODO
                // this.subRecord = new RecordCreatureReference(this, buf, offset);
                break;
            case RecordType.Dialog:
                this.subRecord = new RecordDialog(this, buf, offset);
                break;
            case RecordType.Quest:
                this.subRecord = new RecordQuest(this, buf, offset);
                break;
            case RecordType.AI:
                this.subRecord = new RecordAI(this, buf, offset);
                break;
        }
        offset += this.dataSize;
    }
}