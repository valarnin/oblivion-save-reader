import Record from "./record";
import { bufTobString, bufToByte, bufToFloat, bufToInt, bufToShort } from "./util";

export class RecordCreature {
    flags?: number;

    strength?: number;
    intelligence?: number;
    willpower?: number;
    agility?: number;
    speed?: number;
    endurance?: number;
    personality?: number;
    luck?: number;

    dataFlags?: number;
    baseMagicka?: number;
    baseFatigue?: number;
    barterGold?: number;
    level?: number;
    calcMin?: number;
    calcMax?: number;

    factionsNum?: number;
    factions: {
        faction: number;
        factionRank: number;
    }[] = [];

    spellCount?: number;
    spellIds: number[] = [];

    aiData: number[] = [];

    baseHealth?: number;

    modCount?: number;
    modifiers: {
        valueIndex: number;
        modValue: number;
    }[] = [];

    fullName?: string;

    armorer?: number;
    athletics?: number;
    blade?: number;
    block?: number;
    blunt?: number;
    handToHand?: number;
    heavyArmor?: number;
    alchemy?: number;
    alteration?: number;
    conjuration?: number;
    destruction?: number;
    illusion?: number;
    mysticism?: number;
    restoration?: number;
    acrobatics?: number;
    lightArmor?: number;
    marksman?: number;
    mercantile?: number;
    security?: number;
    sneak?: number;
    speechcraft?: number;

    combatStyle?: number;

    constructor(record: Record, buf: ArrayBuffer, offset: number) {
        if (record.flags & 0x1) {
            this.flags = bufToInt(buf.slice(offset, offset + 4));
            offset += 4;
        }

        if (record.flags & 0x8) {
            this.strength = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.intelligence = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.willpower = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.agility = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.speed = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.endurance = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.personality = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.luck = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
        }

        if (record.flags & 0x10) {
            this.dataFlags = bufToInt(buf.slice(offset, offset + 4));
            offset += 4;
            this.baseMagicka = bufToShort(buf.slice(offset, offset + 2));
            offset += 2;
            this.baseFatigue = bufToShort(buf.slice(offset, offset + 2));
            offset += 2;
            this.barterGold = bufToShort(buf.slice(offset, offset + 2));
            offset += 2;
            this.level = bufToShort(buf.slice(offset, offset + 2));
            offset += 2;
            this.calcMin = bufToShort(buf.slice(offset, offset + 2));
            offset += 2;
            this.calcMax = bufToShort(buf.slice(offset, offset + 2));
            offset += 2;
        }

        if (record.flags & 0x40) {
            this.factionsNum = bufToShort(buf.slice(offset, offset + 2));
            offset += 2;
            for (let i = 0; i < this.factionsNum; ++i) {
                let faction = bufToInt(buf.slice(offset, offset + 4));
                offset += 4;
                let factionRank = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                this.factions.push({
                    faction: faction,
                    factionRank: factionRank,
                });
            }
        }

        if (record.flags & 0x20) {
            this.spellCount = bufToShort(buf.slice(offset, offset + 2));
            for (let i = 0; i < this.spellCount; ++i) {
                this.spellIds.push(bufToInt(buf.slice(offset, offset + 4)));
                offset += 4;
            }
        }

        if (record.flags & 0x100) {
            this.aiData.push(bufToByte(buf.slice(offset, offset + 1)));
            offset += 1;
            this.aiData.push(bufToByte(buf.slice(offset, offset + 1)));
            offset += 1;
            this.aiData.push(bufToByte(buf.slice(offset, offset + 1)));
            offset += 1;
            this.aiData.push(bufToByte(buf.slice(offset, offset + 1)));
            offset += 1;
        }

        if (record.flags & 0x4) {
            this.baseHealth = bufToInt(buf.slice(offset, offset + 4));
            offset += 4;
        }

        if (record.flags & 0x10000000) {
            this.modCount = bufToShort(buf.slice(offset, offset + 2));
            offset += 2;
            for (let i = 0; i < this.modCount; ++i) {
                let index = bufToByte(buf.slice(offset, offset + 1));
                offset += 1;
                let mod = bufToFloat(buf.slice(offset, offset + 4));
                offset += 4;
                this.modifiers.push({
                    valueIndex: index,
                    modValue: mod,
                });
            }
        }

        if (record.flags & 0x80) {
            this.fullName = bufTobString(buf.slice(offset, offset + 64));
            offset += bufToByte(buf.slice(offset, offset + 1)) + 1;
        }

        if (record.flags & 0x200) {
            this.armorer = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.athletics = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.blade = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.block = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.blunt = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.handToHand = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.heavyArmor = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.alchemy = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.alteration = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.conjuration = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.destruction = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.illusion = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.mysticism = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.restoration = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.acrobatics = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.lightArmor = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.marksman = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.mercantile = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.security = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.sneak = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
            this.speechcraft = bufToByte(buf.slice(offset, offset + 1));
            offset += 1;
        }

        if (record.flags & 0x400) {
            this.combatStyle = bufToInt(buf.slice(offset, offset + 4));
            offset += 4;
        }
    }
}