import { quests, locs, ignoreLocs, skills, gates, horses, investments, books, houses, artifacts, nirnroots, arena, factions, greaterPowers, wayshrines, incompleteQuests } from "./constants";
import CreatedData from "./createddata";
import DeathCount from "./deathcount";
import Global from "./global";
import QuickKey from "./quickkey";
import Record from "./record";
import Region from "./region";
import { SaveBuffer } from "./util";

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

    // Constants used for reading
    static constants = {
        quests: quests,
        locs: locs,
        ignoreLocs: ignoreLocs,
        skills: skills,
        gates: gates,
        horses: horses,
        investments: investments,
        books: books,
        houses: houses,
        artifacts: artifacts,
        nirnroots: nirnroots,
        arena: arena,
        factions: factions,
        greaterPowers: greaterPowers,
        wayshrines: wayshrines,
        incompleteQuests: incompleteQuests,
    };

    constructor(arrayBuf: ArrayBuffer) {
        const buf = new SaveBuffer(arrayBuf, 0);
        // File header
        this.fileId = buf.readString(12);
        this.majorVersion = buf.readByte();
        this.minorVersion = buf.readByte();
        this.exeTime = buf.readDate();

        // Save header
        this.headerVersion = buf.readInt();
        this.saveHeaderSize = buf.readInt();
        this.saveNum = buf.readInt();
        this.pcName = buf.readbzString();
        this.pcLevel = buf.readShort();
        this.pcLocation = buf.readbzString();
        this.gameDays = buf.readFloat();

        this.gameTicks = buf.readInt();
        this.gameTime = buf.readDate();
        this.screenshotSize = buf.readInt();
        this.screenshotWidth = buf.readInt();
        this.screenshotHeight = buf.readInt();
        this.screenshotData = buf.readByteArray(this.screenshotSize - 8);

        // Plugins
        this.pluginsNum = buf.readByte();
        this.plugins = buf.readbStringArray(this.pluginsNum);

        // Global
        this.formIdsOffset = buf.readInt();

        this.recordsNum = buf.readInt();
        this.nextObjectid = buf.readInt();
        this.worldId = buf.readInt();
        this.worldX = buf.readInt();
        this.worldY = buf.readInt();

        this.pcLocationCell = buf.readInt();
        this.pcLocationX = buf.readFloat();
        this.pcLocationY = buf.readFloat();
        this.pcLocationZ = buf.readFloat();
        
        this.globalsNum = buf.readShort();
        this.globals = [];
        for (let i = 0; i < this.globalsNum; ++i) {
            this.globals.push(new Global(buf));
        }
        
        this.tesClassSize = buf.readShort();
        this.numDeathCounts = buf.readInt();
        this.deathCounts = [];
        for (let i = 0; i < this.numDeathCounts; ++i) {
            this.deathCounts.push(new DeathCount(buf));
        }
        this.gameModeSeconds = buf.readFloat();

        this.processesSize = buf.readShort();
        this.processesData = buf.readByteArray(this.processesSize);

        this.specEventSize = buf.readShort();
        this.specEventData = buf.readByteArray(this.specEventSize);

        this.weatherSize = buf.readShort();
        this.weatherData = buf.readByteArray(this.weatherSize);
        this.playerCombatCount = buf.readInt();
        this.createdNum = buf.readInt();
        this.createdData = [];
        for (let i = 0; i < this.createdNum; ++i) {
            this.createdData.push(new CreatedData(buf));
        }
        this.quickKeysSize = buf.readShort();
        let quickKeysEnd = buf.offset + this.quickKeysSize;
        this.quickKeysData = [];
        while (buf.offset < quickKeysEnd) {
            this.quickKeysData.push(new QuickKey(buf));
        }

        this.reticuleSize = buf.readShort();
        this.reticuleData = buf.readByteArray(this.reticuleSize);
        this.interfaceSize = buf.readShort();
        this.interfaceData = buf.readByteArray(this.interfaceSize);
        this.regionsSize = buf.readShort();
        this.regionsNum = buf.readShort();
        this.regions = [];
        for (let i = 0; i < this.regionsNum; ++i) {
            this.regions.push(new Region(buf));
        }

        // Change Records
        // For performance, this works differently
        this.records = [];
        for (let i = 0; i < this.recordsNum; ++i) {
            // Don't pass original SaveBuffer object due to bugs/unknowns in record parsing
            const record = new Record(new SaveBuffer(buf.buffer, buf.offset));
            this.records.push(record);
            buf.advance(12 + record.dataSize);
        }

        // Temporary Effects
        this.tempEffectsSize = buf.readInt();
        this.tempEffectsData = buf.readByteArray(this.tempEffectsSize);

        // Form IDs
        this.formIdsNum = buf.readInt();
        this.formIds = buf.readIntArray(this.formIdsNum);

        // World Spaces
        this.worldSpacesNum = buf.readInt();
        this.worldSpaces = buf.readIntArray(this.worldSpacesNum);
    }

    trim(screenshotData: boolean = false) {
        for (const loc of SaveFile.constants.locs) {
            this.records.find((e) => e.formId === loc.formId)?.subRecord;
        }
        for (const investment of SaveFile.constants.investments) {
            this.records.find((e) => e.formId === investment.formId)?.subRecord;
        }
        for (const book of SaveFile.constants.books) {
            this.records.find((e) => e.formId === book.formId)?.subRecord;
        }
        for (const horse of SaveFile.constants.horses) {
            this.records.find((e) => e.formId === horse.formId)?.subRecord;
        }
        for (const house of SaveFile.constants.houses) {
            this.records.find((e) => e.formId === house.formId)?.subRecord;
        }
        for (const root of SaveFile.constants.nirnroots) {
            this.records.find((e) => e.formId === root.formId)?.subRecord;
        }
        for (const quest of SaveFile.constants.quests) {
            this.records.find((e) => e.formId === quest.formId)?.subRecord;
        }
        for (const gate of SaveFile.constants.gates) {
            this.records.find((e) => e.formId === gate.formId)?.subRecord;
        }
        for (const fight of SaveFile.constants.arena) {
            this.records.find((e) => e.formId === fight.formId)?.subRecord;
        }
        this.records.filter(r=>[0x14,0x7].includes(r.formId)).forEach(r=>r.subRecord);

        if (screenshotData) {
            this.screenshotData = [];
        }
        
    }
}
