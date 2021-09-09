import CreatedData from "./createddata";
import DeathCount from "./deathcount";
import Global from "./global";
import QuickKey from "./quickkey";
import Record from "./record";
import Region from "./region";
import { bufToString, bufToByte, bufToDate, bufToInt, bufTobzString, bufToShort, bufToFloat, bufToArray, bufTobString } from "./util";

export class SaveFile {
    // File header
    fileId = 'TES4SAVEGAME';
    majorVersion: number;
    minorVersion: number;
    exeTime: Date;

    // Save header
    headerVersion: number;
    saveHeaderSize: number;
    saveNum: number;
    pcName: string
    pcLevel: number;
    pcLocation: string
    gameDays: number;

    gameTicks: number;
    gameTime: Date;
    screenshotSize: number;
    screenshotWidth: number;
    screenshotHeight: number;
    screenshotData: number[];

    // Plugins
    pluginsNum: number;
    plugins: string[];

    // Global
    formIdsOffset: number;

    recordsNum: number;
    nextObjectid: number;
    worldId: number;
    worldX: number;
    worldY: number;

    pcLocationCell: number;
    pcLocationX: number;
    pcLocationY: number;
    pcLocationZ: number;
    
    globalsNum: number;
    globals: Global[];
    
    tesClassSize: number;
    numDeathCounts: number;
    deathCounts: DeathCount[];
    
    gameModeSeconds: number;

    processesSize: number;
    processesData: number[];

    specEventSize: number;
    specEventData: number[];

    weatherSize: number;
    weatherData: number[];

    playerCombatCount: number;

    createdNum: number;
    createdData: CreatedData[];

    quickKeysSize: number;
    quickKeysData: QuickKey[];

    reticuleSize: number;
    reticuleData: number[];

    interfaceSize: number;
    interfaceData: number[];

    regionsSize: number;
    regionsNum: number;
    regions: Region[];

    // Change Records
    records: Record[];

    // Temporary Effects
    tempEffectsSize: number;
    tempEffectsData: number[];

    // Form IDs
    formIdsNum: number;
    formIds: number[];

    // World Spaces
    worldSpacesNum: number;
    worldSpaces: number[];

    constructor(buf: ArrayBuffer) {
        let offset = 0;
        // File header
        this.fileId = bufToString(buf.slice(offset, offset + 12));                          offset += 12;
        this.majorVersion = bufToByte(buf.slice(offset, offset + 1));                       offset += 1;
        this.minorVersion = bufToByte(buf.slice(offset, offset + 1));                       offset += 1;
        this.exeTime = bufToDate(buf.slice(offset, offset + 16));                           offset += 16;

        // Save header
        this.headerVersion = bufToInt(buf.slice(offset, offset + 4));                       offset += 4;
        this.saveHeaderSize = bufToInt(buf.slice(offset, offset + 4));                      offset += 4;
        this.saveNum = bufToInt(buf.slice(offset, offset + 4));                             offset += 4;
        this.pcName = bufTobzString(buf.slice(offset, offset + 64));                        offset += bufToByte(buf.slice(offset, offset + 1)) + 1;
        this.pcLevel = bufToShort(buf.slice(offset, offset + 2));                           offset += 2;
        this.pcLocation = bufTobzString(buf.slice(offset, offset + 64));                    offset += bufToByte(buf.slice(offset, offset + 1)) + 1;
        this.gameDays = bufToFloat(buf.slice(offset, offset + 4));                          offset += 4;

        this.gameTicks = bufToInt(buf.slice(offset, offset + 4));                           offset += 4;
        this.gameTime = bufToDate(buf.slice(offset, offset + 16));                          offset += 16;
        this.screenshotSize = bufToInt(buf.slice(offset, offset + 4));                      offset += 4;
        this.screenshotWidth = bufToInt(buf.slice(offset, offset + 4));                     offset += 4;
        this.screenshotHeight = bufToInt(buf.slice(offset, offset + 4));                    offset += 4;
        this.screenshotData = 
            bufToArray(buf.slice(offset, offset + this.screenshotSize - 8));                offset += this.screenshotSize - 8;

        // Plugins
        this.pluginsNum = bufToByte(buf.slice(offset, offset + 1));                         offset += 1;
        this.plugins = [];
        for (let i = 0; i < this.pluginsNum; ++i) {
            this.plugins.push(bufTobString(buf.slice(offset, offset + 64)));
            offset += bufToByte(buf.slice(offset, offset + 1)) + 1;
        }

        // Global
        this.formIdsOffset = bufToInt(buf.slice(offset, offset + 4));                       offset += 4;

        this.recordsNum = bufToInt(buf.slice(offset, offset + 4));                          offset += 4;
        this.nextObjectid = bufToInt(buf.slice(offset, offset + 4));                        offset += 4;
        this.worldId = bufToInt(buf.slice(offset, offset + 4));                             offset += 4;
        this.worldX = bufToInt(buf.slice(offset, offset + 4));                              offset += 4;
        this.worldY = bufToInt(buf.slice(offset, offset + 4));                              offset += 4;

        this.pcLocationCell = bufToInt(buf.slice(offset, offset + 4));                      offset += 4;
        this.pcLocationX = bufToFloat(buf.slice(offset, offset + 4));                       offset += 4;
        this.pcLocationY = bufToFloat(buf.slice(offset, offset + 4));                       offset += 4;
        this.pcLocationZ = bufToFloat(buf.slice(offset, offset + 4));                       offset += 4;
        
        this.globalsNum = bufToShort(buf.slice(offset, offset + 2));                        offset += 2;
        this.globals = [];
        for (let i = 0; i < this.globalsNum; ++i) {
            this.globals.push(new Global(buf, offset));                                     offset += 8;
        }
        
        this.tesClassSize = bufToShort(buf.slice(offset, offset + 2));                      offset += 2;
        this.numDeathCounts = bufToInt(buf.slice(offset, offset + 4));                      offset += 4;
        this.deathCounts = [];
        for (let i = 0; i < this.numDeathCounts; ++i) {
            this.deathCounts.push(new DeathCount(buf, offset));                             offset += 6;
        }
        this.gameModeSeconds = bufToFloat(buf.slice(offset, offset + 4));                   offset += 4;

        this.processesSize = bufToShort(buf.slice(offset, offset + 2));                     offset += 2;
        this.processesData = bufToArray(buf.slice(offset, offset + this.processesSize));    offset += this.processesSize;

        this.specEventSize = bufToShort(buf.slice(offset, offset + 2));                     offset += 2;
        this.specEventData = bufToArray(buf.slice(offset, offset + this.specEventSize));    offset += this.specEventSize;

        this.weatherSize = bufToShort(buf.slice(offset, offset + 2));                       offset += 2;
        this.weatherData = bufToArray(buf.slice(offset, offset + this.weatherSize));        offset += this.weatherSize;
        this.playerCombatCount = bufToInt(buf.slice(offset, offset + 4));                   offset += 4;
        this.createdNum = bufToInt(buf.slice(offset, offset + 4));                          offset += 4;
        this.createdData = [];
        for (let i = 0; i < this.createdNum; ++i) {
            const created = new CreatedData(buf, offset);
            this.createdData.push(created);
            offset += 20 + created.dataSize;
        }
        this.quickKeysSize = bufToShort(buf.slice(offset, offset + 2));                     offset += 2;
        let quickKeysEnd = offset + this.quickKeysSize;
        this.quickKeysData = [];
        while (offset < quickKeysEnd) {
            const qk = new QuickKey(buf, offset);
            this.quickKeysData.push(qk);
            offset++;
            if (qk.flag & 1) offset += 4;
        }

        this.reticuleSize = bufToShort(buf.slice(offset, offset + 2));                      offset += 2;
        this.reticuleData = bufToArray(buf.slice(offset, offset + this.reticuleSize));      offset += this.reticuleSize;
        this.interfaceSize = bufToShort(buf.slice(offset, offset + 2));                     offset += 2;
        this.interfaceData = bufToArray(buf.slice(offset, offset + this.interfaceSize));    offset += this.interfaceSize;
        this.regionsSize = bufToShort(buf.slice(offset, offset + 2));                       offset += 2;
        this.regionsNum = bufToShort(buf.slice(offset, offset + 2));                        offset += 2;
        this.regions = [];
        for (let i = 0; i < this.regionsNum; ++i) {
            this.regions.push(new Region(buf, offset));                                     offset += 8;
        }

        // Change Records
        // For performance, this works differently
        this.records = [];
        for (let i = 0; i < this.recordsNum; ++i) {
            const record = new Record(buf, offset);
            this.records.push(record);
            offset += 12 + record.dataSize;
        }

        // Temporary Effects
        this.tempEffectsSize = bufToInt(buf.slice(offset, offset + 4));                     offset += 4;
        this.tempEffectsData = bufToArray(buf.slice(offset, offset + this.tempEffectsSize));offset += this.tempEffectsSize;

        // Form IDs
        this.formIdsNum = bufToInt(buf.slice(offset, offset + 4));                          offset += 4;
        this.formIds = [];
        for (let i = 0; i < this.formIdsNum; ++i) {
            this.formIds.push(bufToInt(buf.slice(offset, offset + 4)));                     offset += 4;
        }

        // World Spaces
        this.worldSpacesNum = bufToInt(buf.slice(offset, offset + 4));                      offset += 4;
        this.worldSpaces = [];
        for (let i = 0; i < this.worldSpacesNum; ++i) {
            this.worldSpaces.push(bufToInt(buf.slice(offset, offset + 4)));                 offset += 4;
        }
    }
}
