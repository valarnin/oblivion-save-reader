import { RecordAI } from "./record_ai";
import { RecordBook } from "./record_book";
import { RecordCell } from "./record_cell";
import { RecordCreature } from "./record_creature";
import { RecordCreatureReference } from "./record_creaturereference";
import { RecordDialog } from "./record_dialog";
import { RecordFaction } from "./record_faction";
import { RecordGeneric } from "./record_generic";
import { RecordInstanceReference } from "./record_instancereference";
import { RecordQuest } from "./record_quest";
import { SaveBuffer } from "./util";

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
    data?: number[];

    parsedSubRecord?: RecordBook | RecordFaction | RecordGeneric | RecordCreature | RecordCell | RecordDialog | RecordAI;

    get subRecord(): RecordBook | RecordFaction | RecordGeneric | RecordCreature | RecordCell | RecordDialog | RecordAI | undefined {
        if (!this.data) return this.parsedSubRecord;

        const tmpBuffer = new ArrayBuffer(this.dataSize);
        const tmpView = new Uint8Array(tmpBuffer);
        for (let i = 0; i < this.dataSize; ++i) tmpView[i] = this.data[i];

        const clone = new SaveBuffer(tmpBuffer, 0);

        switch(this.type) {
            case RecordType.Book:
                this.parsedSubRecord = new RecordBook(this, clone);
                break;
            case RecordType.Faction:
                this.parsedSubRecord = new RecordFaction(this, clone);
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
                this.parsedSubRecord = new RecordGeneric(this, clone);
                break;
            case RecordType.NPC:
            case RecordType.Creature:
                this.parsedSubRecord = new RecordCreature(this, clone);
                break;
            case RecordType.Cell:
                this.parsedSubRecord = new RecordCell(this, clone);
                break;
            case RecordType.InstanceReference:
                this.parsedSubRecord = new RecordInstanceReference(this, clone);
                break;
            case RecordType.CharacterReference:
            case RecordType.CreatureReference:
                this.parsedSubRecord = new RecordCreatureReference(this, clone);
                break;
            case RecordType.Dialog:
                this.parsedSubRecord = new RecordDialog(this, clone);
                break;
            case RecordType.Quest:
                this.parsedSubRecord = new RecordQuest(this, clone);
                break;
            case RecordType.AI:
                this.parsedSubRecord = new RecordAI(this, clone);
                break;
        }
        if (this.parsedSubRecord) delete this.data;
        return this.parsedSubRecord;
    }

    constructor(buf: SaveBuffer) {
        this.formId = buf.readInt();
        this.type = buf.readByte();
        this.flags = buf.readInt();
        this.version = buf.readByte();
        this.dataSize = buf.readShort();
        this.data = buf.readByteArray(this.dataSize);
    }
}