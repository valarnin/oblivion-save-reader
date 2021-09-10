import Record from "./record";
import { bufToArray, bufTobString, bufToByte, bufTobzString, bufToDouble, bufToFloat, bufToInt, bufToShort, bufToString } from "./util";

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
    unknown1: number;
    unknown2: number[];
    unknown3: number[];
    pcBirthsign: number;
    unknownArray: number[];
    num2: number;
    unknown4: number[];
    unknown5: number[][];
    unknown6: number[];
    randODoorsNum: number;
    randODoors: {
        door: number;
        flag: number;
    }[];
    unknown7: number[];
    activeEffectsNum: number;
    activeEffects: {
        size: number;
        reference: number;
        index: number;
        effectDetails: number[];
    }[];
    expPoints: {
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
    advancement: number;
    attrSkillCounts: {
        strength: number;
        intelligence: number;
        willpower: number;
        agility: number;
        speed: number;
        endurance: number;
        personality: number;
        luck: number;
    }[];
    specCounts: {
        combat: number;
        magic: number;
        stealth: number;
    };
    skillUsage: {
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
    majorSkillAdv: number;
    unknown8: number;
    activeQuest: number;
    knownTopicsNum: number;
    knownTopics: number[];
    openQuestsNum: number;
    openQuests: {
        quest: number;
        questStage: number;
        logEntry: number;
    }[];
    magEffectNum: number;
    magEffects: {
        edid: string;
    }[];

    fgGeoSym: number[];
    fgGeoAsym: number[];
    fgTexSym: number[];
    race: number;
    hair: number;
    eyes: number;
    hairLength: number;
    hairColor: number[];
    unknown9: number;
    gender: number;
    pcName: string;
    pcClass: number;
    customClass_favoredAttribute1: number;
    customClass_favoredAttribute2: number;
    customClass_specialization: number;
    customClass_majorSkill1: number;
    customClass_majorSkill2: number;
    customClass_majorSkill3: number;
    customClass_majorSkill4: number;
    customClass_majorSkill5: number;
    customClass_majorSkill6: number;
    customClass_majorSkill7: number;
    customClass_flags: number;
    customClass_services: number;

    constructor(buf: ArrayBuffer, offset: number, maxOffset: number) {
        this.statistics = {
            skillAdvances: bufToInt(buf.slice(offset, offset += 4)),
            unknown1: bufToInt(buf.slice(offset, offset += 4)),
            largestBounty: bufToInt(buf.slice(offset, offset += 4)),
            killedCreatures: bufToInt(buf.slice(offset, offset += 4)),
            killedPersons: bufToInt(buf.slice(offset, offset += 4)),
            exploredPlaces: bufToInt(buf.slice(offset, offset += 4)),
            lockPicked: bufToInt(buf.slice(offset, offset += 4)),
            picksBroken: bufToInt(buf.slice(offset, offset += 4)),
            capturedSouls: bufToInt(buf.slice(offset, offset += 4)),
            usedIngredients: bufToInt(buf.slice(offset, offset += 4)),
            mixedPotions: bufToInt(buf.slice(offset, offset += 4)),
            oblivionGatesClosed: bufToInt(buf.slice(offset, offset += 4)),
            horsesOwned: bufToInt(buf.slice(offset, offset += 4)),
            housesOwned: bufToInt(buf.slice(offset, offset += 4)),
            investments: bufToInt(buf.slice(offset, offset += 4)),
            booksRead: bufToInt(buf.slice(offset, offset += 4)),
            teachingBooksRead: bufToInt(buf.slice(offset, offset += 4)),
            artifactsFound: bufToInt(buf.slice(offset, offset += 4)),
            hoursSlept: bufToInt(buf.slice(offset, offset += 4)),
            hoursWaited: bufToInt(buf.slice(offset, offset += 4)),
            unknown2: bufToInt(buf.slice(offset, offset += 4)),
            unknown3: bufToInt(buf.slice(offset, offset += 4)),
            unknown4: bufToInt(buf.slice(offset, offset += 4)),
            jokesTold: bufToInt(buf.slice(offset, offset += 4)),
            disease: bufToInt(buf.slice(offset, offset += 4)),
            nirnrootFound: bufToInt(buf.slice(offset, offset += 4)),
            burglary: bufToInt(buf.slice(offset, offset += 4)),
            pickpocketing: bufToInt(buf.slice(offset, offset += 4)),
            unknown5: bufToInt(buf.slice(offset, offset += 4)),
            attacks: bufToInt(buf.slice(offset, offset += 4)),
            murder: bufToInt(buf.slice(offset, offset += 4)),
            stolenHorses: bufToInt(buf.slice(offset, offset += 4)),
            unknown6: bufToInt(buf.slice(offset, offset += 4)),
            unknown7: bufToInt(buf.slice(offset, offset += 4)),
            unknown8: bufToInt(buf.slice(offset, offset += 4)),
            unknown9: bufToInt(buf.slice(offset, offset += 4)),
        };
        this.unknown1 = bufToByte(buf.slice(offset, offset += 1));
        this.unknown2 = bufToArray(buf.slice(offset, offset += 95));
        this.unknown3 = bufToArray(buf.slice(offset, offset += 22));
        this.pcBirthsign = bufToInt(buf.slice(offset, offset += 4));
        this.unknownArray = [];
        for (let i = 0; i < 13; ++i) {
            this.unknownArray.push(bufToInt(buf.slice(offset, offset += 4)));
        }
        this.num2 = bufToShort(buf.slice(offset, offset += 2));
        this.unknown4 = bufToArray(buf.slice(offset, offset += 2));
        this.unknown5 = [];
        for (let i = 0; i < this.num2; ++i) {
            this.unknown5.push(bufToArray(buf.slice(offset, offset += 4)));
        }
        this.unknown6 = bufToArray(buf.slice(offset, offset += 2));
        this.randODoorsNum = bufToShort(buf.slice(offset, offset += 2));
        this.randODoors = [];
        for (let i = 0; i < this.randODoorsNum; ++i) {
            this.randODoors.push({
                door: bufToInt(buf.slice(offset, offset += 4)),
                flag: bufToByte(buf.slice(offset, offset += 1)),
            });
        }
        this.unknown7 = bufToArray(buf.slice(offset, offset += 2));
        this.activeEffectsNum = bufToShort(buf.slice(offset, offset += 2));
        this.activeEffects = [];
        for (let i = 0; i < this.activeEffectsNum; ++i) {
            let size = bufToShort(buf.slice(offset, offset += 2));
            this.activeEffects.push({
                size: size,
                reference: bufToInt(buf.slice(offset, offset += 4)),
                index: bufToByte(buf.slice(offset, offset += 1)),
                effectDetails: bufToArray(buf.slice(offset, offset += size)),
            });
        }
        this.expPoints = {
            armorer: bufToFloat(buf.slice(offset, offset += 4)),
            athletics: bufToFloat(buf.slice(offset, offset += 4)),
            blade: bufToFloat(buf.slice(offset, offset += 4)),
            block: bufToFloat(buf.slice(offset, offset += 4)),
            blunt: bufToFloat(buf.slice(offset, offset += 4)),
            handToHand: bufToFloat(buf.slice(offset, offset += 4)),
            heavyArmor: bufToFloat(buf.slice(offset, offset += 4)),
            alchemy: bufToFloat(buf.slice(offset, offset += 4)),
            alteration: bufToFloat(buf.slice(offset, offset += 4)),
            conjuration: bufToFloat(buf.slice(offset, offset += 4)),
            destruction: bufToFloat(buf.slice(offset, offset += 4)),
            illusion: bufToFloat(buf.slice(offset, offset += 4)),
            mysticism: bufToFloat(buf.slice(offset, offset += 4)),
            restoration: bufToFloat(buf.slice(offset, offset += 4)),
            acrobatics: bufToFloat(buf.slice(offset, offset += 4)),
            lightArmor: bufToFloat(buf.slice(offset, offset += 4)),
            marksman: bufToFloat(buf.slice(offset, offset += 4)),
            mercantile: bufToFloat(buf.slice(offset, offset += 4)),
            security: bufToFloat(buf.slice(offset, offset += 4)),
            sneak: bufToFloat(buf.slice(offset, offset += 4)),
            speechcraft: bufToFloat(buf.slice(offset, offset += 4)),
        };
        this.advancement = bufToInt(buf.slice(offset, offset += 4));
        this.attrSkillCounts = [];
        for (let i = 0; i < this.advancement; ++i) {
            this.attrSkillCounts.push({
                strength: bufToByte(buf.slice(offset, offset += 1)),
                intelligence: bufToByte(buf.slice(offset, offset += 1)),
                willpower: bufToByte(buf.slice(offset, offset += 1)),
                agility: bufToByte(buf.slice(offset, offset += 1)),
                speed: bufToByte(buf.slice(offset, offset += 1)),
                endurance: bufToByte(buf.slice(offset, offset += 1)),
                personality: bufToByte(buf.slice(offset, offset += 1)),
                luck: bufToByte(buf.slice(offset, offset += 1)),
            });
        }
        this.specCounts = {
            combat: bufToByte(buf.slice(offset, offset += 1)),
            magic: bufToByte(buf.slice(offset, offset += 1)),
            stealth: bufToByte(buf.slice(offset, offset += 1)),
        };
        this.skillUsage = {
            armorer: bufToInt(buf.slice(offset, offset += 4)),
            athletics: bufToInt(buf.slice(offset, offset += 4)),
            blade: bufToInt(buf.slice(offset, offset += 4)),
            block: bufToInt(buf.slice(offset, offset += 4)),
            blunt: bufToInt(buf.slice(offset, offset += 4)),
            handToHand: bufToInt(buf.slice(offset, offset += 4)),
            heavyArmor: bufToInt(buf.slice(offset, offset += 4)),
            alchemy: bufToInt(buf.slice(offset, offset += 4)),
            alteration: bufToInt(buf.slice(offset, offset += 4)),
            conjuration: bufToInt(buf.slice(offset, offset += 4)),
            destruction: bufToInt(buf.slice(offset, offset += 4)),
            illusion: bufToInt(buf.slice(offset, offset += 4)),
            mysticism: bufToInt(buf.slice(offset, offset += 4)),
            restoration: bufToInt(buf.slice(offset, offset += 4)),
            acrobatics: bufToInt(buf.slice(offset, offset += 4)),
            lightArmor: bufToInt(buf.slice(offset, offset += 4)),
            marksman: bufToInt(buf.slice(offset, offset += 4)),
            mercantile: bufToInt(buf.slice(offset, offset += 4)),
            security: bufToInt(buf.slice(offset, offset += 4)),
            sneak: bufToInt(buf.slice(offset, offset += 4)),
            speechcraft: bufToInt(buf.slice(offset, offset += 4)),
        };
        this.majorSkillAdv = bufToInt(buf.slice(offset, offset += 4));
        this.unknown8 = bufToByte(buf.slice(offset, offset += 1));
        this.activeQuest = bufToInt(buf.slice(offset, offset += 4));
        this.knownTopicsNum = bufToShort(buf.slice(offset, offset += 2));
        this.knownTopics = [];
        for (let i = 0; i < this.knownTopicsNum; ++i) {
            this.knownTopics.push(bufToInt(buf.slice(offset, offset += 4)));
        }
        this.openQuestsNum = bufToShort(buf.slice(offset, offset += 2));
        this.openQuests = [];
        for (let i = 0; i < this.openQuestsNum; ++i) {
            this.openQuests.push({
                quest: bufToInt(buf.slice(offset, offset += 4)),
                questStage: bufToByte(buf.slice(offset, offset += 1)),
                logEntry: bufToByte(buf.slice(offset, offset += 1)),
            });
        }
        this.magEffectNum = bufToInt(buf.slice(offset, offset += 4));
        this.magEffects = [];
        for (let i = 0; i < this.magEffectNum; ++i) {
            this.magEffects.push({edid: bufToString(buf.slice(offset, offset += 4))});
        }
    
        this.fgGeoSym = bufToArray(buf.slice(offset, offset += 200));
        this.fgGeoAsym = bufToArray(buf.slice(offset, offset += 120));
        this.fgTexSym = bufToArray(buf.slice(offset, offset += 200));
        this.race = bufToInt(buf.slice(offset, offset += 4));
        this.hair = bufToInt(buf.slice(offset, offset += 4));
        this.eyes = bufToInt(buf.slice(offset, offset += 4));
        this.hairLength = bufToFloat(buf.slice(offset, offset += 4));
        this.hairColor = bufToArray(buf.slice(offset, offset += 3));
        this.unknown9 = bufToByte(buf.slice(offset, offset += 1));
        this.gender = bufToByte(buf.slice(offset, offset += 1));
        let nameLen = bufToByte(buf.slice(offset, offset += 1));
        this.pcName = bufToString(buf.slice(offset, offset += nameLen));
        offset += 1;
        this.pcClass = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_favoredAttribute1 = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_favoredAttribute2 = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_specialization = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_majorSkill1 = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_majorSkill2 = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_majorSkill3 = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_majorSkill4 = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_majorSkill5 = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_majorSkill6 = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_majorSkill7 = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_flags = bufToInt(buf.slice(offset, offset += 4));
        this.customClass_services = bufToInt(buf.slice(offset, offset += 4));
    }
};

export class RecordCreatureReference {
    cellChanged_cell?: number;
    cellChanged_x?: number;

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
    
    constructor(record: Record, buf: ArrayBuffer, offset: number) {
        try {
            const startOffset = offset;
            // Handle player data as a special case before anything else even though it's out-of-order
            if (record.formId === 0x14) {
                let playerOffset = undefined;
                for (let i = record.dataSize - 1; i >= 0; --i) {
                    if (
                        record.data[i] === 0x42 && record.data[i-1] === 0x96
                        && record.data[i-21] === 0x42 && record.data[i-22] === 0xec
                    ) {
                        playerOffset = offset + i + 29;
                        break;
                    }
                }
                if (playerOffset === undefined) {
                    debugger;
                } else {
                    this.player = new PlayerObject(buf, playerOffset, offset + record.dataSize);
                }
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x80000000) {
                this.cellChanged_cell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.cellChanged_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.cellChanged_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.cellChanged_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x2) {
                this.created_flags = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_baseItem = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_cell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_rX = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_rY = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.created_rZ = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x4) {
                this.moved_cell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                if (this.moved_cell === 0) {
                    this.actorFlag = bufToByte(buf.slice(offset, offset + 1));
                    offset += 1;
                    return;
                }
                this.moved_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.moved_y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.moved_z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.moved_rX = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.moved_rY = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.moved_rZ = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8) {
                this.havokMoved_cell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_rX = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_rY = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.havokMoved_rZ = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x800000) {
                this.oblivionCell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.formId === 0x14) {
                for (let i = 0; i < 71; ++i) {
                    this.tempAttributeChanges_activeEffects.push(bufToFloat(buf.slice(offset, offset + 4)));
                    offset += 4;
                }
                for (let i = 0; i < 71; ++i) {
                    this.tempAttributeChanges_unknownEffects.push(bufToFloat(buf.slice(offset, offset + 4)));
                    offset += 4;
                }
                for (let i = 0; i < 71; ++i) {
                    this.tempAttributeChanges_damageEffects.push(bufToFloat(buf.slice(offset, offset + 4)));
                    offset += 4;
                }
                this.tempAttributeChanges_deltaHealth = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.tempAttributeChanges_deltaMagicka = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.tempAttributeChanges_deltaFatigue = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            this.actorFlag = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x1) {
                this.flags = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8000000) {
                this.inventory_itemNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                for (let i = 0; i < this.inventory_itemNum; ++i) {
                    if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                    let iref = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    let stackedItemsNum = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    let changedEntriesNum = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    let changedEntries: {
                        propertiesNum: number;
                        properties: {
                            flag: number;
                            // @TODO: More strict typing here?
                            value: any;
                        }[];
                    }[] = [];
                    for (let j = 0; j < changedEntriesNum; ++j) {
                        if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
                        let [newOffset, properties] = getProps(offset, buf, startOffset + record.dataSize);
                        offset = newOffset;
                        changedEntries.push(properties);
                    }
                    this.inventory_items.push({
                        iref: iref,
                        stackedItemsNum: stackedItemsNum,
                        changedEntriesNum: changedEntriesNum,
                        changedEntries: changedEntries,
                    });
                }
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            let [newOffset, properties] = getProps(offset, buf, startOffset + record.dataSize);
            offset = newOffset;
            this.propertiesNum = properties.propertiesNum;
            this.properties = properties.properties;
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x8) {
                this.havokMoved_dataLen = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                this.havokMoved_data = bufToArray(buf.slice(offset, offset + this.havokMoved_dataLen));
                offset += this.havokMoved_dataLen;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            if (record.flags & 0x10) {
                this.scale = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
            }
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
            this.enabled = (record.flags & 0x40000000) === 0x40000000;
            if (offset - startOffset > record.dataSize) {/* console.log('Invalid object', record, this); */ return;}
        } catch (e) {
            console.log(e);
        }
    }
}

let getProps = (offset: number, buf: ArrayBuffer, endOffset: number): [number, {
    propertiesNum: number,
    properties: {
        flag: number;
        // @TODO: More strict typing here?
        value: any;
    }[],
}] => {
    let propertiesNum = bufToShort(buf.slice(offset, offset + 2));
    offset += 2;
    let properties: {
        flag: number;
        // @TODO: More strict typing here?
        value: any;
    }[] = [];
    if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
    for (let k = 0; k < propertiesNum; ++k) {
        let flag = bufToByte(buf.slice(offset, offset + 1));
        offset += 1;
        if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
        let value: any = undefined;
        // This is ugly
        switch(flag) {
            case 0x11:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x12:
                value = {};
                value.scriptref = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.varNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.variables = [];
                for (let l = 0; l < value.varNum; ++l) {
                    let _var: any = {};
                    _var.varIndex = bufToShort(buf.slice(offset, offset + 2));
                    offset += 2;
                    _var.varType = bufToShort(buf.slice(offset, offset + 2));
                    offset += 2;
                    if (_var.varType === 0xF000) {
                        _var.refVar = bufToInt(buf.slice(offset, offset + 4));
                        offset += 4;
                    }
                    if (_var.varType === 0) {
                        _var.refVar = bufToDouble(buf.slice(offset, offset + 8));
                        offset += 8;
                    }
                    value.variables.push(_var);
                }
                value.unknown = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x1b:
                value = 1;
                break;
            case 0x1c:
                value = 1;
                break;
            case 0x1e:
                value = {};
                value.cell = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.flags = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x1f:
                value = {};
                value.package = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.flags = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.package2 = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.unknown = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                break;
            case 0x20:
                value = {};
                value.formId = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.data = bufToArray(buf.slice(offset, offset + 59));
                offset += 59;
                break;
            case 0x21:
                value = {};
                value.dataNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.data = [];
                for (let l = 0; l < value.dataNum; ++l) {
                    let data: any = {};
                    data.iref = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    data.unknown = bufToByte(buf.slice(offset, offset + 1));
                    offset += 1;
                    value.data.push(data);
                }
                break;
            case 0x22:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x23:
                value = {};
                value.dataNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.data = [];
                for (let l = 0; l < value.dataNum; ++l) {
                    value.data.push(bufToInt(buf.slice(offset, offset + 4)));
                    offset += 4;
                }
                break;
            case 0x25:
                value = 1;
                break;
            case 0x27:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x28:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x29:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x2a:
                value = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                break;
            case 0x2b:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x2c:
                value = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x2d:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x2e:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x2f:
                value = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x31:
                value = {};
                value.lockLevel = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                value.key = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.flag = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x32:
                value = {};
                value.x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.rX = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.rY = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.rZ = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.destDoor = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x33:
                value = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x35:
                // ?????
                //debugger;
                break;
            case 0x36:
                value = bufToArray(buf.slice(offset, offset + 5));
                offset += 5;
                break;
            case 0x37:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x39:
                value = bufToArray(buf.slice(offset, offset + 12));
                offset += 12;
                break;
            case 0x3a:
                value = {};
                value.iref = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.dataNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.data = [];
                for (let i = 0; i < value.dataNum; ++i) {
                    value.data.push(bufToArray(buf.slice(offset, offset + 61)));
                    offset += 61;
                }
                break;
            case 0x3c:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x3d:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x3e:
                value = {};
                value.door = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.x = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.y = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                value.z = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x41:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x47:
                value = 1;
                break;
            case 0x48:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x4a:
                let len = bufToByte(buf.slice(offset, offset + 1));
                value = bufTobString(buf.slice(offset, offset + len));
                offset += len + 1;
                break;
            case 0x4b:
                value = {};
                value.unknown = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                value.dataNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.data = bufToArray(buf.slice(offset, offset + value.dataNum));
                offset += value.dataNum;
                if (k + 1 === propertiesNum) {
                    value.unknown2 = bufToArray(buf.slice(offset, offset + 2));
                    offset += 2;
                } else {
                    value.unknown2 = [];
                }
                break;
            case 0x4e:
                value = {};
                value.dataNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.data = [];
                for (let i = 0; i < value.dataNum; ++i) {
                    value.data.push(bufToArray(buf.slice(offset, offset + 10)));
                    offset += 10;
                }
                break;
            case 0x4f:
                value = bufToArray(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x50:
                value = 1;
                break;
            case 0x52:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x53:
                value = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                break;
            case 0x55:
                value = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x59:
                value = {};
                let convTopicLen = bufToByte(buf.slice(offset, offset + 1));
                value.convTopic = bufTobzString(buf.slice(offset, offset + convTopicLen + 1));
                offset += convTopicLen + 1;
                value.convNum = bufToShort(buf.slice(offset, offset + 2));
                offset += 2;
                value.conv = [];
                for (let l = 0; l < value.convNum; ++l) {
                    let conv: any = {};
                    conv.index = bufToByte(buf.slice(offset, offset + 1));
                    offset += 1;
                    conv.convQuest = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    conv.convDialog = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    conv.convInfo = bufToInt(buf.slice(offset, offset + 4));
                    offset += 4;
                    value.conv.push(conv);
                }
                break;
            case 0x5a:
                value = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                break;
            case 0x5c:
                value = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                break;
        }
        properties.push({
            flag: flag,
            value: value,
        });
        if (offset > endOffset) {/* console.log('Invalid object props', propertiesNum, offset, endOffset); */ return [offset, {propertiesNum, properties}];}
    }

    return [offset, {
        propertiesNum: propertiesNum,
        properties: properties,
    }];
}
