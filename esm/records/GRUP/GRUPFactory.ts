import { ESMBuffer } from "../../util";
import GRUP from "../GRUP";
import { ACHR } from "./ACHR";
import { ACRE } from "./ACRE";
import { ACTI } from "./ACTI";
import { ALCH } from "./ALCH";
import { AMMO } from "./AMMO";
import { ANIO } from "./ANIO";
import { APPA } from "./APPA";
import { ARMO } from "./ARMO";
import { BOOK } from "./BOOK";
import { BSGN } from "./BSGN";
import { CELL } from "./CELL";
import { CLAS } from "./CLAS";
import { CLMT } from "./CLMT";
import { CLOT } from "./CLOT";
import { CONT } from "./CONT";
import { CREA } from "./CREA";
import { CSTY } from "./CSTY";
import { DIAL } from "./DIAL";
import { DOOR } from "./DOOR";
import { EFSH } from "./EFSH";
import { ENCH } from "./ENCH";
import { EYES } from "./EYES";
import { FACT } from "./FACT";
import { FLOR } from "./FLOR";
import { FURN } from "./FURN";
import { GLOB } from "./GLOB";
import { GMST } from "./GMST";
import { GRAS } from "./GRAS";
import { HAIR } from "./HAIR";
import { IDLE } from "./IDLE";
import { INFO } from "./INFO";
import { INGR } from "./INGR";
import { KEYM } from "./KEYM";
import { LAND } from "./LAND";
import { LIGH } from "./LIGH";
import { LSCR } from "./LSCR";
import { LTEX } from "./LTEX";
import { LVLC } from "./LVLC";
import { LVLI } from "./LVLI";
import { LVSP } from "./LVSP";
import { MGEF } from "./MGEF";
import { MISC } from "./MISC";
import { NPC_ } from "./NPC_";
import { PACK } from "./PACK";
import { PGRD } from "./PGRD";
import { QUST } from "./QUST";
import { RACE } from "./RACE";
import { REFR } from "./REFR";
import { REGN } from "./REGN";
import { ROAD } from "./ROAD";
import { SBSP } from "./SBSP";
import { SCPT } from "./SCPT";
import { SGST } from "./SGST";
import { SKIL } from "./SKIL";
import { SLGM } from "./SLGM";
import { SOUN } from "./SOUN";
import { SPEL } from "./SPEL";
import { STAT } from "./STAT";
import { TREE } from "./TREE";
import { WATR } from "./WATR";
import { WEAP } from "./WEAP";
import { WRLD } from "./WRLD";
import { WTHR } from "./WTHR";

export type GRUP_Subrecord = 
ACHR|ACRE|ACTI|ALCH|AMMO|ANIO|APPA|ARMO|BOOK|BSGN|CELL|CLAS|CLMT|CLOT|CONT|CREA|
CSTY|DIAL|DOOR|EFSH|ENCH|EYES|FACT|FLOR|FURN|GLOB|GMST|GRAS|HAIR|IDLE|INFO|INGR|
KEYM|LAND|LIGH|LSCR|LTEX|LVLC|LVLI|LVSP|MGEF|MISC|NPC_|PACK|PGRD|QUST|RACE|REFR|
REGN|ROAD|SBSP|SCPT|SGST|SKIL|SLGM|SOUN|SPEL|STAT|/*No TES4*/TREE|WATR|WEAP|WRLD|WTHR|
GRUP;

export default (buf: ESMBuffer): GRUP_Subrecord => {
    const type = buf.readString(4);
    switch(type) {
        case 'ACHR':
            return new ACHR(buf);
        case 'ACRE':
            return new ACRE(buf);
        case 'ACTI':
            return new ACTI(buf);
        case 'ALCH':
            return new ALCH(buf);
        case 'AMMO':
            return new AMMO(buf);
        case 'ANIO':
            return new ANIO(buf);
        case 'APPA':
            return new APPA(buf);
        case 'ARMO':
            return new ARMO(buf);
        case 'BOOK':
            return new BOOK(buf);
        case 'BSGN':
            return new BSGN(buf);
        case 'CELL':
            return new CELL(buf);
        case 'CLAS':
            return new CLAS(buf);
        case 'CLMT':
            return new CLMT(buf);
        case 'CLOT':
            return new CLOT(buf);
        case 'CONT':
            return new CONT(buf);
        case 'CREA':
            return new CREA(buf);
        case 'CSTY':
            return new CSTY(buf);
        case 'DIAL':
            return new DIAL(buf);
        case 'DOOR':
            return new DOOR(buf);
        case 'EFSH':
            return new EFSH(buf);
        case 'ENCH':
            return new ENCH(buf);
        case 'EYES':
            return new EYES(buf);
        case 'FACT':
            return new FACT(buf);
        case 'FLOR':
            return new FLOR(buf);
        case 'FURN':
            return new FURN(buf);
        case 'GLOB':
            return new GLOB(buf);
        case 'GMST':
            return new GMST(buf);
        case 'GRAS':
            return new GRAS(buf);
        case 'HAIR':
            return new HAIR(buf);
        case 'IDLE':
            return new IDLE(buf);
        case 'INFO':
            return new INFO(buf);
        case 'INGR':
            return new INGR(buf);
        case 'KEYM':
            return new KEYM(buf);
        case 'LAND':
            return new LAND(buf);
        case 'LIGH':
            return new LIGH(buf);
        case 'LSCR':
            return new LSCR(buf);
        case 'LTEX':
            return new LTEX(buf);
        case 'LVLC':
            return new LVLC(buf);
        case 'LVLI':
            return new LVLI(buf);
        case 'LVSP':
            return new LVSP(buf);
        case 'MGEF':
            return new MGEF(buf);
        case 'MISC':
            return new MISC(buf);
        case 'NPC_':
            return new NPC_(buf);
        case 'PACK':
            return new PACK(buf);
        case 'PGRD':
            return new PGRD(buf);
        case 'QUST':
            return new QUST(buf);
        case 'RACE':
            return new RACE(buf);
        case 'REFR':
            return new REFR(buf);
        case 'REGN':
            return new REGN(buf);
        case 'ROAD':
            return new ROAD(buf);
        case 'SBSP':
            return new SBSP(buf);
        case 'SCPT':
            return new SCPT(buf);
        case 'SGST':
            return new SGST(buf);
        case 'SKIL':
            return new SKIL(buf);
        case 'SLGM':
            return new SLGM(buf);
        case 'SOUN':
            return new SOUN(buf);
        case 'SPEL':
            return new SPEL(buf);
        case 'STAT':
            return new STAT(buf);
        case 'TREE':
            return new TREE(buf);
        case 'WATR':
            return new WATR(buf);
        case 'WEAP':
            return new WEAP(buf);
        case 'WRLD':
            return new WRLD(buf);
        case 'WTHR':
            return new WTHR(buf);
        case 'GRUP':
            return new GRUP('GRUP', buf);
        default:
            throw new Error(`Invalid GRUP subrecord type: ${type}`);
    }
};