import getProps from "./properties";
import Record from "./record";
import { SaveBuffer } from "./util";

class PlayerObject {
    statistics: {
        skillAdvances: number;
        unknown1: number;
        largestBounty: number;
        killedCreatures: number;
        killedPersons: number;
        exploredPlaces: number;
        lockPicked: number;
        picksBroken: number;
        capturedSouls: number;
        usedIngredients: number;
        mixedPotions: number;
        oblivionGatesClosed: number;
        horsesOwned: number;
        housesOwned: number;
        investments: number;
        booksRead: number;
        teachingBooksRead: number;
        artifactsFound: number;
        hoursSlept: number;
        hoursWaited: number;
        unknown2: number;
        unknown3: number;
        unknown4: number;
        jokesTold: number;
        disease: number;
        nirnrootFound: number;
        burglary: number;
        pickpocketing: number;
        unknown5: number;
        attacks: number;
        murder: number;
        stolenHorses: number;
        unknown6: number;
        unknown7: number;
        unknown8: number;
        unknown9: number;
    };
    unknown1?: number;
    unknown2?: number[];
    unknown3?: number[];
    pcBirthsign?: number;
    unknownArray?: number[];
    num2?: number;
    unknown4?: number[];
    unknown5?: number[][];
    unknown6?: number[];
    randODoorsNum?: number;
    randODoors?: {
        door: number;
        flag: number;
    }[];
    unknown7?: number[];
    activeEffectsNum?: number;
    activeEffects?: {
        size: number;
        reference: number;
        index: number;
        effectDetails: number[];
    }[];
    expPoints?: {
        armorer: number;
        athletics: number;
        blade: number;
        block: number;
        blunt: number;
        handToHand: number;
        heavyArmor: number;
        alchemy: number;
        alteration: number;
        conjuration: number;
        destruction: number;
        illusion: number;
        mysticism: number;
        restoration: number;
        acrobatics: number;
        lightArmor: number;
        marksman: number;
        mercantile: number;
        security: number;
        sneak: number;
        speechcraft: number;
    };
    advancement?: number;
    attrSkillCounts?: {
        strength: number;
        intelligence: number;
        willpower: number;
        agility: number;
        speed: number;
        endurance: number;
        personality: number;
        luck: number;
    }[];
    specCounts?: {
        combat: number;
        magic: number;
        stealth: number;
    };
    skillUsage?: {
        armorer: number;
        athletics: number;
        blade: number;
        block: number;
        blunt: number;
        handToHand: number;
        heavyArmor: number;
        alchemy: number;
        alteration: number;
        conjuration: number;
        destruction: number;
        illusion: number;
        mysticism: number;
        restoration: number;
        acrobatics: number;
        lightArmor: number;
        marksman: number;
        mercantile: number;
        security: number;
        sneak: number;
        speechcraft: number;
    };
    majorSkillAdv?: number;
    unknown8?: number;
    activeQuest?: number;
    knownTopicsNum?: number;
    knownTopics?: number[];
    openQuestsNum?: number;
    openQuests?: {
        quest: number;
        questStage: number;
        logEntry: number;
    }[];
    magEffectNum?: number;
    magEffects?: {
        edid: string;
    }[];

    fgGeoSym?: number[];
    fgGeoAsym?: number[];
    fgTexSym?: number[];
    race?: number;
    hair?: number;
    eyes?: number;
    hairLength?: number;
    hairColor?: number[];
    unknown9?: number;
    gender?: number;
    pcName?: string;
    pcClass?: number;
    customClass_favoredAttribute1?: number;
    customClass_favoredAttribute2?: number;
    customClass_specialization?: number;
    customClass_majorSkill1?: number;
    customClass_majorSkill2?: number;
    customClass_majorSkill3?: number;
    customClass_majorSkill4?: number;
    customClass_majorSkill5?: number;
    customClass_majorSkill6?: number;
    customClass_majorSkill7?: number;
    customClass_flags?: number;
    customClass_services?: number;

    constructor(buf: SaveBuffer, maxOffset: number) {
        this.statistics = {
            skillAdvances: buf.readInt(),
            unknown1: buf.readInt(),
            largestBounty: buf.readInt(),
            killedCreatures: buf.readInt(),
            killedPersons: buf.readInt(),
            exploredPlaces: buf.readInt(),
            lockPicked: buf.readInt(),
            picksBroken: buf.readInt(),
            capturedSouls: buf.readInt(),
            usedIngredients: buf.readInt(),
            mixedPotions: buf.readInt(),
            oblivionGatesClosed: buf.readInt(),
            horsesOwned: buf.readInt(),
            housesOwned: buf.readInt(),
            investments: buf.readInt(),
            booksRead: buf.readInt(),
            teachingBooksRead: buf.readInt(),
            artifactsFound: buf.readInt(),
            hoursSlept: buf.readInt(),
            hoursWaited: buf.readInt(),
            unknown2: buf.readInt(),
            unknown3: buf.readInt(),
            unknown4: buf.readInt(),
            jokesTold: buf.readInt(),
            disease: buf.readInt(),
            nirnrootFound: buf.readInt(),
            burglary: buf.readInt(),
            pickpocketing: buf.readInt(),
            unknown5: buf.readInt(),
            attacks: buf.readInt(),
            murder: buf.readInt(),
            stolenHorses: buf.readInt(),
            unknown6: buf.readInt(),
            unknown7: buf.readInt(),
            unknown8: buf.readInt(),
            unknown9: buf.readInt(),
        };
        if (buf.offset > maxOffset) return;
        this.unknown1 = buf.readByte();
        this.unknown2 = buf.readByteArray(95);
        this.unknown3 = buf.readByteArray(22);
        this.pcBirthsign = buf.readInt();
        this.unknownArray = [];
        for (let i = 0; i < 13; ++i) {
            this.unknownArray.push(buf.readInt());
        }
        if (buf.offset > maxOffset) return;
        this.num2 = buf.readShort();
        this.unknown4 = buf.readByteArray(2);
        this.unknown5 = [];
        for (let i = 0; i < this.num2; ++i) {
            this.unknown5.push(buf.readByteArray(4));
        }
        if (buf.offset > maxOffset) return;
        this.unknown6 = buf.readByteArray(2);
        this.randODoorsNum = buf.readShort();
        this.randODoors = [];
        for (let i = 0; i < this.randODoorsNum; ++i) {
            this.randODoors.push({
                door: buf.readInt(),
                flag: buf.readByte(),
            });
        }
        if (buf.offset > maxOffset) return;
        this.unknown7 = buf.readByteArray(2);
        this.activeEffectsNum = buf.readShort();
        this.activeEffects = [];
        for (let i = 0; i < this.activeEffectsNum; ++i) {
            let size = buf.readShort();
            this.activeEffects.push({
                size: size,
                reference: buf.readInt(),
                index: buf.readByte(),
                effectDetails: buf.readByteArray(size),
            });
        }
        if (buf.offset > maxOffset) return;
        this.expPoints = {
            armorer: buf.readFloat(),
            athletics: buf.readFloat(),
            blade: buf.readFloat(),
            block: buf.readFloat(),
            blunt: buf.readFloat(),
            handToHand: buf.readFloat(),
            heavyArmor: buf.readFloat(),
            alchemy: buf.readFloat(),
            alteration: buf.readFloat(),
            conjuration: buf.readFloat(),
            destruction: buf.readFloat(),
            illusion: buf.readFloat(),
            mysticism: buf.readFloat(),
            restoration: buf.readFloat(),
            acrobatics: buf.readFloat(),
            lightArmor: buf.readFloat(),
            marksman: buf.readFloat(),
            mercantile: buf.readFloat(),
            security: buf.readFloat(),
            sneak: buf.readFloat(),
            speechcraft: buf.readFloat(),
        };
        if (buf.offset > maxOffset) return;
        this.advancement = buf.readInt();
        this.attrSkillCounts = [];
        for (let i = 0; i < this.advancement; ++i) {
            this.attrSkillCounts.push({
                strength: buf.readByte(),
                intelligence: buf.readByte(),
                willpower: buf.readByte(),
                agility: buf.readByte(),
                speed: buf.readByte(),
                endurance: buf.readByte(),
                personality: buf.readByte(),
                luck: buf.readByte(),
            });
            if (buf.offset > maxOffset) return;
        }
        this.specCounts = {
            combat: buf.readByte(),
            magic: buf.readByte(),
            stealth: buf.readByte(),
        };
        if (buf.offset > maxOffset) return;
        this.skillUsage = {
            armorer: buf.readInt(),
            athletics: buf.readInt(),
            blade: buf.readInt(),
            block: buf.readInt(),
            blunt: buf.readInt(),
            handToHand: buf.readInt(),
            heavyArmor: buf.readInt(),
            alchemy: buf.readInt(),
            alteration: buf.readInt(),
            conjuration: buf.readInt(),
            destruction: buf.readInt(),
            illusion: buf.readInt(),
            mysticism: buf.readInt(),
            restoration: buf.readInt(),
            acrobatics: buf.readInt(),
            lightArmor: buf.readInt(),
            marksman: buf.readInt(),
            mercantile: buf.readInt(),
            security: buf.readInt(),
            sneak: buf.readInt(),
            speechcraft: buf.readInt(),
        };
        if (buf.offset > maxOffset) return;
        this.majorSkillAdv = buf.readInt();
        this.unknown8 = buf.readByte();
        this.activeQuest = buf.readInt();
        this.knownTopicsNum = buf.readShort();
        this.knownTopics = [];
        for (let i = 0; i < this.knownTopicsNum; ++i) {
            this.knownTopics.push(buf.readInt());
        }
        if (buf.offset > maxOffset) return;
        this.openQuestsNum = buf.readShort();
        this.openQuests = [];
        for (let i = 0; i < this.openQuestsNum; ++i) {
            this.openQuests.push({
                quest: buf.readInt(),
                questStage: buf.readByte(),
                logEntry: buf.readByte(),
            });
        }
        if (buf.offset > maxOffset) return;
        this.magEffectNum = buf.readInt();
        this.magEffects = [];
        for (let i = 0; i < this.magEffectNum; ++i) {
            this.magEffects.push({edid: buf.readString(4)});
            if (buf.offset > maxOffset) return;
        }
    
        this.fgGeoSym = buf.readByteArray(200);
        this.fgGeoAsym = buf.readByteArray(120);
        this.fgTexSym = buf.readByteArray(200);
        this.race = buf.readInt();
        this.hair = buf.readInt();
        this.eyes = buf.readInt();
        this.hairLength = buf.readFloat();
        this.hairColor = buf.readByteArray(3);
        this.unknown9 = buf.readByte();
        this.gender = buf.readByte();
        this.pcName = buf.readbString();
        this.pcClass = buf.readInt();
        this.customClass_favoredAttribute1 = buf.readInt();
        this.customClass_favoredAttribute2 = buf.readInt();
        this.customClass_specialization = buf.readInt();
        this.customClass_majorSkill1 = buf.readInt();
        this.customClass_majorSkill2 = buf.readInt();
        this.customClass_majorSkill3 = buf.readInt();
        this.customClass_majorSkill4 = buf.readInt();
        this.customClass_majorSkill5 = buf.readInt();
        this.customClass_majorSkill6 = buf.readInt();
        this.customClass_majorSkill7 = buf.readInt();
        this.customClass_flags = buf.readInt();
        this.customClass_services = buf.readInt();
    }
};

export class RecordCreatureReference {
    cellChanged_cell?: number;
    cellChanged_x?: number;
    cellChanged_y?: number;
    cellChanged_z?: number;

    created_flags?: number;
    created_baseItem?: number;
    created_cell?: number;
    created_x?: number;
    created_y?: number;
    created_z?: number;
    created_rX?: number;
    created_rY?: number;
    created_rZ?: number;

    moved_cell?: number;
    moved_x?: number;
    moved_y?: number;
    moved_z?: number;
    moved_rX?: number;
    moved_rY?: number;
    moved_rZ?: number;

    havokMoved_cell?: number;
    havokMoved_x?: number;
    havokMoved_y?: number;
    havokMoved_z?: number;
    havokMoved_rX?: number;
    havokMoved_rY?: number;
    havokMoved_rZ?: number;

    oblivionCell?: number;

    tempAttributeChanges_activeEffects: number[] = [];
    tempAttributeChanges_unknownEffects: number[] = [];
    tempAttributeChanges_damageEffects: number[] = [];
    tempAttributeChanges_deltaHealth?: number;
    tempAttributeChanges_deltaMagicka?: number;
    tempAttributeChanges_deltaFatigue?: number;

    actorFlag?: number;

    flags?: number;
    inventory_itemNum?: number;
    inventory_items: {
        iref: number,
        stackedItemsNum: number,
        changedEntriesNum: number,
        changedEntries: {
            propertiesNum: number;
            properties: {
                flag: number;
                // @TODO: More strict typing here?
                value: any;
            }[];
        }[];
    }[] = [];
    havokMoved_dataLen?: number;
    havokMoved_data: number[] = [];
    scale?: number;
    enabled?: boolean;
    propertiesNum?: number;
    properties: {
        flag: number;
        // @TODO: More strict typing here?
        value: any;
    }[] = [];

    player?: PlayerObject;
    
    constructor(record: Record, buf: SaveBuffer) {
        // Just a type assertion for TS
        if (!record.data) return;
        try {
            const startOffset = buf.offset;
            // Handle player data as a special case before anything else even though it's out-of-order
            if (record.formId === 0x14) {
                let playerOffset = undefined;
                for (let i = record.dataSize - 1; i >= 0; --i) {
                    if (
                        record.data[i] === 0x42 && record.data[i-1] === 0x96
                        && record.data[i-21] === 0x42 && record.data[i-22] === 0xec
                    ) {
                        playerOffset = buf.offset + i + 29;
                        break;
                    }
                }
                if (playerOffset === undefined) {
                    debugger;
                } else {
                    this.player = new PlayerObject(new SaveBuffer(buf.buffer, playerOffset), startOffset + record.dataSize);
                }
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x80000000) {
                this.cellChanged_cell = buf.readInt();
                this.cellChanged_x = buf.readFloat();
                this.cellChanged_y = buf.readFloat();
                this.cellChanged_z = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x2) {
                this.created_flags = buf.readInt();
                this.created_baseItem = buf.readInt();
                this.created_cell = buf.readInt();
                this.created_x = buf.readFloat();
                this.created_y = buf.readFloat();
                this.created_z = buf.readFloat();
                this.created_rX = buf.readFloat();
                this.created_rY = buf.readFloat();
                this.created_rZ = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x4) {
                this.moved_cell = buf.readInt();
                if (this.moved_cell === 0 && record.dataSize <= 5) {
                    this.actorFlag = buf.readByte();
                    return;
                }
                this.moved_x = buf.readFloat();
                this.moved_y = buf.readFloat();
                this.moved_z = buf.readFloat();
                this.moved_rX = buf.readFloat();
                this.moved_rY = buf.readFloat();
                this.moved_rZ = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8 && !(record.flags & 0x2 || record.flags & 0x4)) {
                this.havokMoved_cell = buf.readInt();
                this.havokMoved_x = buf.readFloat();
                this.havokMoved_y = buf.readFloat();
                this.havokMoved_z = buf.readFloat();
                this.havokMoved_rX = buf.readFloat();
                this.havokMoved_rY = buf.readFloat();
                this.havokMoved_rZ = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x800000) {
                this.oblivionCell = buf.readInt();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.formId === 0x14) {
                for (let i = 0; i < 71; ++i) {
                    this.tempAttributeChanges_activeEffects.push(buf.readFloat());
                }
                for (let i = 0; i < 71; ++i) {
                    this.tempAttributeChanges_unknownEffects.push(buf.readFloat());
                }
                for (let i = 0; i < 71; ++i) {
                    this.tempAttributeChanges_damageEffects.push(buf.readFloat());
                }
                this.tempAttributeChanges_deltaHealth = buf.readFloat();
                this.tempAttributeChanges_deltaMagicka = buf.readFloat();
                this.tempAttributeChanges_deltaFatigue = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            this.actorFlag = buf.readByte();
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x1) {
                this.flags = buf.readInt();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8000000) {
                this.inventory_itemNum = buf.readShort();
                for (let i = 0; i < this.inventory_itemNum; ++i) {
                    if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                    let iref = buf.readInt();
                    let stackedItemsNum = buf.readInt();
                    let changedEntriesNum = buf.readInt();
                    let changedEntries: {
                        propertiesNum: number;
                        properties: {
                            flag: number;
                            // @TODO: More strict typing here?
                            value: any;
                        }[];
                    }[] = [];
                    for (let j = 0; j < changedEntriesNum; ++j) {
                        if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                        let props = getProps(buf, startOffset + record.dataSize);
                        changedEntries.push({
                            propertiesNum: props[0],
                            properties: props[1],
                        });
                    }
                    this.inventory_items.push({
                        iref: iref,
                        stackedItemsNum: stackedItemsNum,
                        changedEntriesNum: changedEntriesNum,
                        changedEntries: changedEntries,
                    });
                }
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            [this.propertiesNum, this.properties] = getProps(buf, startOffset + record.dataSize);
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8) {
                this.havokMoved_dataLen = buf.readShort();
                this.havokMoved_data = buf.readByteArray(this.havokMoved_dataLen);
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x10) {
                this.scale = buf.readFloat();
            }
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            this.enabled = (record.flags & 0x40000000) === 0x40000000;
            if (buf.offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
        } catch (e) {
            console.log(e);
        }
    }
}
