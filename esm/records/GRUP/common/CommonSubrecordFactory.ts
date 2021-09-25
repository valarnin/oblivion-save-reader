import { ESMBuffer } from "../../../util";
import { Subrecord } from "./Subrecord";
import { ACBS } from "./ACBS";
import { AIDT } from "./AIDT";
import { ANAM } from "./ANAM";
import { ATXT } from "./ATXT";
import { BMDT } from "./BMDT";
import { BTXT } from "./BTXT";
import { CNTO } from "./CNTO";
import { CSCR } from "./CSCR";
import { CSDC } from "./CSDC";
import { CSDI } from "./CSDI";
import { CSDT } from "./CSDT";
import { CSTD } from "./CSTD";
import { CTDA } from "./CTDA";
import { CTDT } from "./CTDT";
import { DESC } from "./DESC";
import { EDID } from "./EDID";
import { EFID } from "./EFID";
import { EFIT } from "./EFIT";
import { ENAM } from "./ENAM";
import { ESCE } from "./ESCE";
import { FGGA } from "./FGGA";
import { FGGS } from "./FGGS";
import { FGTS } from "./FGTS";
import { FLTV } from "./FLTV";
import { FULL } from "./FULL";
import { GNAM } from "./GNAM";
import { HCLR } from "./HCLR";
import { ICO2 } from "./ICO2";
import { ICON } from "./ICON";
import { KFFZ } from "./KFFZ";
import { LVLD } from "./LVLD";
import { LVLF } from "./LVLF";
import { LVLO } from "./LVLO";
import { MO2B } from "./MO2B";
import { MO2T } from "./MO2T";
import { MO3B } from "./MO3B";
import { MO3T } from "./MO3T";
import { MO4B } from "./MO4B";
import { MO4T } from "./MO4T";
import { MOD2 } from "./MOD2";
import { MOD3 } from "./MOD3";
import { MOD4 } from "./MOD4";
import { MODB } from "./MODB";
import { MODL } from "./MODL";
import { MODT } from "./MODT";
import { NAME } from "./NAME";
import { NIFZ } from "./NIFZ";
import { PFIG } from "./PFIG";
import { PFPC } from "./PFPC";
import { PGAG } from "./PGAG";
import { PGRI } from "./PGRI";
import { PGRL } from "./PGRL";
import { PGRP } from "./PGRP";
import { PGRR } from "./PGRR";
import { PKDT } from "./PKDT";
import { PKID } from "./PKID";
import { PLDT } from "./PLDT";
import { PSDT } from "./PSDT";
import { PTDT } from "./PTDT";
import { QNAM } from "./QNAM";
import { QSDT } from "./QSDT";
import { QSTA } from "./QSTA";
import { QSTI } from "./QSTI";
import { QSTR } from "./QSTR";
import { RCLR } from "./RCLR";
import { RDAT } from "./RDAT";
import { RDGS } from "./RDGS";
import { RDMD } from "./RDMD";
import { RDMP } from "./RDMP";
import { RDOT } from "./RDOT";
import { RDSD } from "./RDSD";
import { RDWT } from "./RDWT";
import { RPLD } from "./RPLD";
import { RPLI } from "./RPLI";
import { SCDA } from "./SCDA";
import { SCHR } from "./SCHR";
import { SCIT } from "./SCIT";
import { SCRI } from "./SCRI";
import { SCRO } from "./SCRO";
import { SCRV } from "./SCRV";
import { SCTX } from "./SCTX";
import { SCVR } from "./SCVR";
import { SLCP } from "./SLCP";
import { SLSD } from "./SLSD";
import { SNDD } from "./SNDD";
import { SNDX } from "./SNDX";
import { SOUL } from "./SOUL";
import { SPIT } from "./SPIT";
import { SPLO } from "./SPLO";
import { TCLT } from "./TCLT";
import { TNAM } from "./TNAM";
import { TRDT } from "./TRDT";
import { VCLR } from "./VCLR";
import { VHGT } from "./VHGT";
import { VNML } from "./VNML";
import { VTEX } from "./VTEX";
import { VTXT } from "./VTXT";
import { WLST } from "./WLST";
import { WNAM } from "./WNAM";
import { XACT } from "./XACT";
import { XCCM } from "./XCCM";
import { XCLC } from "./XCLC";
import { XCLL } from "./XCLL";
import { XCLR } from "./XCLR";
import { XCLW } from "./XCLW";
import { XCMT } from "./XCMT";
import { XCNT } from "./XCNT";
import { XCWT } from "./XCWT";
import { XESP } from "./XESP";
import { XGLB } from "./XGLB";
import { XHRS } from "./XHRS";
import { XLCM } from "./XLCM";
import { XLOC } from "./XLOC";
import { XLOD } from "./XLOD";
import { XMRC } from "./XMRC";
import { XMRK } from "./XMRK";
import { XOWN } from "./XOWN";
import { XPCI } from "./XPCI";
import { XRGD } from "./XRGD";
import { XRNK } from "./XRNK";
import { XRTM } from "./XRTM";
import { XSCL } from "./XSCL";
import { XSED } from "./XSED";
import { XTEL } from "./XTEL";
import { XTRG } from "./XTRG";
import { ZNAM } from "./ZNAM";
import { SCHD } from "./SCHD";
import { NIFT } from "./NIFT";

export default (type: string, buf: ESMBuffer): Subrecord => {
    let ret: Subrecord;
    switch(type) {
        case 'CTDT':
            return new CTDT(buf);
        case 'ACBS':
            return new ACBS(buf);
        case 'AIDT':
            return new AIDT(buf);
        case 'ANAM':
            return new ANAM(buf);
        case 'ATXT':
            return new ATXT(buf);
        case 'BMDT':
            return new BMDT(buf);
        case 'BTXT':
            return new BTXT(buf);
        case 'CNTO':
            return new CNTO(buf);
        case 'CSCR':
            return new CSCR(buf);
        case 'CSDC':
            return new CSDC(buf);
        case 'CSDI':
            return new CSDI(buf);
        case 'CSDT':
            return new CSDT(buf);
        case 'CSTD':
            return new CSTD(buf);
        case 'CTDA':
            return new CTDA(buf);
        case 'CTDT':
            return new CTDT(buf);
        case 'DESC':
            return new DESC(buf);
        case 'EDID':
            return new EDID(buf);
        case 'EFID':
            return new EFID(buf);
        case 'EFIT':
            return new EFIT(buf);
        case 'ENAM':
            return new ENAM(buf);
        case 'ESCE':
            return new ESCE(buf);
        case 'FGGA':
            return new FGGA(buf);
        case 'FGGS':
            return new FGGS(buf);
        case 'FGTS':
            return new FGTS(buf);
        case 'FLTV':
            return new FLTV(buf);
        case 'FULL':
            return new FULL(buf);
        case 'GNAM':
            return new GNAM(buf);
        case 'HCLR':
            return new HCLR(buf);
        case 'ICO2':
            return new ICO2(buf);
        case 'ICON':
            return new ICON(buf);
        case 'KFFZ':
            return new KFFZ(buf);
        case 'LVLD':
            return new LVLD(buf);
        case 'LVLF':
            return new LVLF(buf);
        case 'LVLO':
            return new LVLO(buf);
        case 'MO2B':
            return new MO2B(buf);
        case 'MO2T':
            return new MO2T(buf);
        case 'MO3B':
            return new MO3B(buf);
        case 'MO3T':
            return new MO3T(buf);
        case 'MO4B':
            return new MO4B(buf);
        case 'MO4T':
            return new MO4T(buf);
        case 'MOD2':
            return new MOD2(buf);
        case 'MOD3':
            return new MOD3(buf);
        case 'MOD4':
            return new MOD4(buf);
        case 'MODB':
            return new MODB(buf);
        case 'MODL':
            return new MODL(buf);
        case 'MODT':
            return new MODT(buf);
        case 'NAME':
            return new NAME(buf);
        case 'NIFT':
            return new NIFT(buf);
        case 'NIFZ':
            return new NIFZ(buf);
        case 'PFIG':
            return new PFIG(buf);
        case 'PFPC':
            return new PFPC(buf);
        case 'PGAG':
            return new PGAG(buf);
        case 'PGRI':
            return new PGRI(buf);
        case 'PGRL':
            return new PGRL(buf);
        case 'PGRP':
            return new PGRP(buf);
        case 'PGRR':
            return new PGRR(buf);
        case 'PKDT':
            return new PKDT(buf);
        case 'PKID':
            return new PKID(buf);
        case 'PLDT':
            return new PLDT(buf);
        case 'PSDT':
            return new PSDT(buf);
        case 'PTDT':
            return new PTDT(buf);
        case 'QNAM':
            return new QNAM(buf);
        case 'QSDT':
            return new QSDT(buf);
        case 'QSTA':
            return new QSTA(buf);
        case 'QSTI':
            return new QSTI(buf);
        case 'QSTR':
            return new QSTR(buf);
        case 'RCLR':
            return new RCLR(buf);
        case 'RDAT':
            return new RDAT(buf);
        case 'RDGS':
            return new RDGS(buf);
        case 'RDMD':
            return new RDMD(buf);
        case 'RDMP':
            return new RDMP(buf);
        case 'RDOT':
            return new RDOT(buf);
        case 'RDSD':
            return new RDSD(buf);
        case 'RDWT':
            return new RDWT(buf);
        case 'RPLD':
            return new RPLD(buf);
        case 'RPLI':
            return new RPLI(buf);
        case 'SCDA':
            return new SCDA(buf);
        case 'SCHD':
            return new SCHD(buf);
        case 'SCHR':
            return new SCHR(buf);
        case 'SCIT':
            return new SCIT(buf);
        case 'SCRI':
            return new SCRI(buf);
        case 'SCRO':
            return new SCRO(buf);
        case 'SCRV':
            return new SCRV(buf);
        case 'SCTX':
            return new SCTX(buf);
        case 'SCVR':
            return new SCVR(buf);
        case 'SLCP':
            return new SLCP(buf);
        case 'SLSD':
            return new SLSD(buf);
        case 'SNDD':
            return new SNDD(buf);
        case 'SNDX':
            return new SNDX(buf);
        case 'SOUL':
            return new SOUL(buf);
        case 'SPIT':
            return new SPIT(buf);
        case 'SPLO':
            return new SPLO(buf);
        case 'TCLT':
            return new TCLT(buf);
        case 'TNAM':
            return new TNAM(buf);
        case 'TRDT':
            return new TRDT(buf);
        case 'VCLR':
            return new VCLR(buf);
        case 'VHGT':
            return new VHGT(buf);
        case 'VNML':
            return new VNML(buf);
        case 'VTEX':
            return new VTEX(buf);
        case 'VTXT':
            return new VTXT(buf);
        case 'WLST':
            return new WLST(buf);
        case 'WNAM':
            return new WNAM(buf);
        case 'XACT':
            return new XACT(buf);
        case 'XCCM':
            return new XCCM(buf);
        case 'XCLC':
            return new XCLC(buf);
        case 'XCLL':
            return new XCLL(buf);
        case 'XCLR':
            return new XCLR(buf);
        case 'XCLW':
            return new XCLW(buf);
        case 'XCMT':
            return new XCMT(buf);
        case 'XCNT':
            return new XCNT(buf);
        case 'XCWT':
            return new XCWT(buf);
        case 'XESP':
            return new XESP(buf);
        case 'XGLB':
            return new XGLB(buf);
        case 'XHRS':
            return new XHRS(buf);
        case 'XLCM':
            return new XLCM(buf);
        case 'XLOC':
            return new XLOC(buf);
        case 'XLOD':
            return new XLOD(buf);
        case 'XMRC':
            return new XMRC(buf);
        case 'XMRK':
            return new XMRK(buf);
        case 'XOWN':
            return new XOWN(buf);
        case 'XPCI':
            return new XPCI(buf);
        case 'XRGD':
            return new XRGD(buf);
        case 'XRNK':
            return new XRNK(buf);
        case 'XRTM':
            return new XRTM(buf);
        case 'XSCL':
            return new XSCL(buf);
        case 'XSED':
            return new XSED(buf);
        case 'XTEL':
            return new XTEL(buf);
        case 'XTRG':
            return new XTRG(buf);
        case 'ZNAM':
            return new ZNAM(buf);
        default:
            throw new Error(`Missing subrecord type ${type}`);
    }
};