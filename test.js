// regex replace from google docs sheet, escape `'` first
// find:
// ^([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)$
// replace:
// {id:'$1',formId:0x$2,name:'$3',stages:[$4],fame:$5,url:'$6'},
const quests = [
    {id:'MQ01',formId:0x0001E723,name:'Tutorial',stages:[84, 100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Tutorial'},
    {id:'MQ02',formId:0x0001E724,name:'Deliver the Amulet',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Deliver_the_Amulet'},
    {id:'MQ03',formId:0x0001E725,name:'Find the Heir',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Find_the_Heir'},
    {id:'MS48',formId:0x000224D8,name:'Breaking the Siege of Kvatch',stages:[200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Breaking_the_Siege_of_Kvatch'},
    {id:'MS49',formId:0x00028C72,name:'The Battle for Castle Kvatch',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Battle_for_Castle_Kvatch'},
    {id:'MQ04',formId:0x0001E726,name:'Weynon Priory',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Weynon_Priory_(quest)'},
    {id:'MQ05',formId:0x0001E727,name:'The Path of Dawn',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Path_of_Dawn'},
    {id:'MQ06',formId:0x0001E728,name:'Dagon Shrine',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Dagon_Shrine'},
    {id:'MQ07',formId:0x0001E729,name:'Spies',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Spies'},
    {id:'MQ08',formId:0x0001E72A,name:'Blood of the Daedra',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Blood_of_the_Daedra'},
    {id:'MQ09',formId:0x0001E72B,name:'Blood of the Divines',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Blood_of_the_Divines'},
    {id:'MQ10',formId:0x0001E72C,name:'Bruma Gate',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Bruma_Gate'},
    {id:'MQ11',formId:0x0001E72D,name:'Allies for Bruma',stages:[100],fame:7,url:'https://en.uesp.net/wiki/Oblivion:Allies_for_Bruma'},
    {id:'MQ12',formId:0x0001E72E,name:'Miscarcand',stages:[100],fame:2,url:'https://en.uesp.net/wiki/Oblivion:Miscarcand_(quest)'},
    {id:'MQ13',formId:0x0001E72F,name:'Defense of Bruma',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Defense_of_Bruma'},
    {id:'MQ14',formId:0x0001E730,name:'Great Gate',stages:[100],fame:2,url:'https://en.uesp.net/wiki/Oblivion:Great_Gate'},
    {id:'MQ15',formId:0x0000C20B,name:'Paradise',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Paradise'},
    {id:'MQ16',formId:0x0002A38F,name:'Light the Dragonfires',stages:[100],fame:3,url:'https://en.uesp.net/wiki/Oblivion:Light_the_Dragonfires'},
    {id:'MQDragonArmor',formId:0x000ADE3F,name:'Imperial Dragon Armor',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Imperial_Dragon_Armor'},
    {id:'Dark01Knife',formId:0x000224EB,name:'A Knife in the Dark',stages:[100, 115],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Knife_in_the_Dark'},
    {id:'DarkExile',formId:0x00026DE0,name:'A Dark Exile',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Dark_Exile'},
    {id:'DarkExile2',formId:0x00026DE1,name:'Another Dark Exile',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Dark_Exile'},
    {id:'MSShadowscale',formId:0x00035589,name:'The Renegade Shadowscale',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Renegade_Shadowscale'},
    {id:'DarkVamp',formId:0x0004CE4C,name:'Darkness Eternal',stages:[115, 116],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Darkness_Eternal'},
    {id:'Dark01KnifeFIN',formId:0x00023DD6,name:'Welcome to the Family',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Watery_Grave#Welcome_to_the_Family'},
    {id:'Dark02Watery',formId:0x000232CF,name:'A Watery Grave',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Watery_Grave'},
    {id:'Dark02WateryFIN',formId:0x000232D0,name:'Blood of the Damned',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Accidents_Happen#Blood_of_the_Damned'},
    {id:'Dark03Accidents',formId:0x000232D1,name:'Accidents Happen',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Accidents_Happen'},
    {id:'Dark03AccidentsFIN',formId:0x000232D4,name:'No Rest for the Wicked',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Scheduled_for_Execution#No_Rest_for_the_Wicked'},
    {id:'Dark04Execution',formId:0x000239E1,name:'Scheduled for Execution',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Scheduled_for_Execution'},
    {id:'Dark04ExecutionFIN',formId:0x00023DD7,name:'To Serve Sithis',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Assassinated_Man#To_Serve_Sithis'},
    {id:'Dark05Assassinated',formId:0x000253B9,name:'The Assassinated Man',stages:[100, 110],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Assassinated_Man'},
    {id:'Dark05AssassinatedFIN',formId:0x000253BA,name:'My Brother\'s Keeper',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Lonely_Wanderer#My_Brother.27s_Keeper'},
    {id:'Dark06Wanderer',formId:0x000253BB,name:'The Lonely Wanderer',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Lonely_Wanderer'},
    {id:'Dark06WandererFIN',formId:0x000253BC,name:'Enter the Eliminator',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Bad_Medicine#Enter_the_Eliminator'},
    {id:'Dark07Medicine',formId:0x000253BD,name:'Bad Medicine',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Bad_Medicine'},
    {id:'Dark07MedicineFIN',formId:0x000253BE,name:'The Night Mother\'s Child',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Whodunit%3F#The_Night_Mother.27s_Child'},
    {id:'Dark08Whodunit',formId:0x000253BF,name:'Whodunit?',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Whodunit%3F'},
    {id:'Dark08WhodunitFIN',formId:0x000253C0,name:'The Assassin\'s Gambit',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Permanent_Retirement#The_Assassin.27s_Gambit'},
    {id:'Dark09Retirement',formId:0x000253C1,name:'Permanent Retirement',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Permanent_Retirement'},
    {id:'Dark09RetirementFIN',formId:0x000253C2,name:'Of Secret and Shadow',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Purification#Of_Secret_And_Shadow'},
    {id:'Dark10Sanctuary',formId:0x0002FF1C,name:'The Purification',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Purification'},
    {id:'Dark10SanctuaryFIN',formId:0x00030203,name:'The Dead Drop',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Affairs_of_a_Wizard#The_Dead_Drop'},
    {id:'Dark10SpecialWizard',formId:0x00007BF2,name:'Affairs of a Wizard',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Affairs_of_a_Wizard'},
    {id:'Dark11Kin',formId:0x0003005F,name:'Next of Kin',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Next_of_Kin'},
    {id:'Dark12Harem',formId:0x0002FF1E,name:'Broken Vows',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Broken_Vows'},
    {id:'Dark13Justice',formId:0x0002FF20,name:'Final Justice',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Final_Justice'},
    {id:'Dark14Honor',formId:0x0002FF22,name:'A Matter of Honor',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Matter_of_Honor'},
    {id:'Dark15Coldest',formId:0x0002FF24,name:'The Coldest Sleep',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Coldest_Sleep'},
    {id:'Dark16Kiss',formId:0x0002FF26,name:'A Kiss Before Dying',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Kiss_Before_Dying'},
    {id:'Dark17Following',formId:0x00030060,name:'Following a Lead',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Following_a_Lead'},
    {id:'Dark18Mother',formId:0x00030062,name:'Honor Thy Mother',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Honor_Thy_Mother'},
    {id:'FGD00JoinFG',formId:0x00024298,name:'Join the Fighters Guild',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Fighters_Guild#Joining'},
    {id:'FGC01Rats',formId:0x00035713,name:'A Rat Problem',stages:[100, 110, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:A_Rat_Problem'},
    {id:'FGC02Protect',formId:0x00035714,name:'The Unfortunate Shopkeeper',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Unfortunate_Shopkeeper'},
    {id:'FGC06Courier',formId:0x00027F8E,name:'The Desolate Mine',stages:[100, 110],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Desolate_Mine'},
    {id:'FGD01Default',formId:0x00024297,name:'Unfinished Business',stages:[100, 105],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Unfinished_Business'},
    {id:'FGD02DandD',formId:0x0002429C,name:'Drunk and Disorderly',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Drunk_and_Disorderly'},
    {id:'FGC03Thieves',formId:0x00035715,name:'Den of Thieves',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Den_of_Thieves'},
    {id:'FGC07Heirloom',formId:0x00035718,name:'Amelion\'s Debt',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Amelion%27s_Debt'},
    {id:'FGD03Viranus',formId:0x0002D154,name:'The Master\'s Son',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Master%27s_Son'},
    {id:'FGD04Defector',formId:0x0002D71A,name:'More Unfinished Business',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:More_Unfinished_Business'},
    {id:'FGD05Oreyn',formId:0x0002D71B,name:'Azani Blackheart',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Azani_Blackheart_(quest)'},
    {id:'FGC04Scholar',formId:0x0035716,name:'The Wandering Scholar',stages:[100, 110],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Wandering_Scholar'},
    {id:'FGC08Prison',formId:0x00035719,name:'The Fugitives',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Fugitives'},
    {id:'FGD06DeadViranus',formId:0x0002D71C,name:'Trolls of Forsaken Mine',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Trolls_of_Forsaken_Mine'},
    {id:'FGC05Stone',formId:0x00035717,name:'The Stone of St. Alessia',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Stone_of_St._Alessia'},
    {id:'FGC09Ogres',formId:0x0003571A,name:'The Noble\'s Daughter',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Noble%27s_Daughter'},
    {id:'FGC10Swamp',formId:0x0003571B,name:'Mystery at Harlun\'s Watch',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Mystery_at_Harlun%27s_Watch'},
    {id:'FGD07Kidnap',formId:0x000356C8,name:'Information Gathering',stages:[100, 105],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Information_Gathering'},
    {id:'FGD08Infiltration',formId:0x000356C9,name:'Infiltration',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Infiltration'},
    {id:'FGD09Hist',formId:0x000356CA,name:'The Hist',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Hist'},
    {id:'MG00Join',formId:0x0002CD10,name:'Join the Mages Guild',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Join_the_Mages_Guild'},
    {id:'MG03Illusion',formId:0x0002D936,name:'Bravil Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Bravil_Recommendation'},
    {id:'MG07Leyawiin',formId:0x0002D93C,name:'Leyawiin Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Leyawiin_Recommendation'},
    {id:'MG02Alter',formId:0x0002D410,name:'Cheydinhal Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Cheydinhal_Recommendation'},
    {id:'MG05Fingers',formId:0x000224E1,name:'Fingers of the Mountain',stages:[100, 200],fame:2,url:'https://en.uesp.net/wiki/Oblivion:Fingers_of_the_Mountain'},
    {id:'MG05A',formId:0x00028C05,name:'Fingers of the Mountain, Part II',stages:[200, 255],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Fingers_of_the_Mountain#Fingers_of_the_Mountain.2C_Part_II'},
    {id:'MG06Bruma',formId:0x0002CBC8,name:'Bruma Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Bruma_Recommendation'},
    {id:'MG01Destruct',formId:0x0002D28B,name:'Skingrad Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Skingrad_Recommendation'},
    {id:'MG04Restore',formId:0x0002D32B,name:'Anvil Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Anvil_Recommendation'},
    {id:'MGExpulsion01',formId:0x00022E92,name:'Mages Guild Suspension',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Mages_Guild_Suspension'},
    {id:'MGExpulsion02',formId:0x00025032,name:'Mages Guild Second Suspension',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Mages_Guild_Suspension#Second_Offense'},
    {id:'MG19Alchemy',formId:0x000A78CE,name:'Alchemy Acquisitions',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Alchemy_Acquisitions'},
    {id:'MG08MagesStaff',formId:0x00034E14,name:'A Mage\'s Staff',stages:[100],fame:2,url:'https://en.uesp.net/wiki/Oblivion:A_Mage%27s_Staff'},
    {id:'MG09Motives',formId:0x0003564F,name:'Ulterior Motives',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Ulterior_Motives'},
    {id:'MG10Vahtacen',formId:0x00035F28,name:'Vahtacen\'s Secret',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Vahtacen%27s_Secret'},
    {id:'MG11NecroMoon',formId:0x00036300,name:'Necromancer\'s Moon',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Necromancer%27s_Moon'},
    {id:'MG12Gate',formId:0x0000395F,name:'Liberation or Apprehension?',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Liberation_or_Apprehension%3F'},
    {id:'MG13Information',formId:0x00003960,name:'Information at a Price',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Information_at_a_Price'},
    {id:'MG14Plot',formId:0x00003961,name:'A Plot Revealed',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:A_Plot_Revealed'},
    {id:'MG15Helm',formId:0x0000C039,name:'The Bloodworm Helm',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Bloodworm_Helm'},
    {id:'MG16Amulet',formId:0x0000C03A,name:'The Necromancer\'s Amulet',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Necromancer%27s_Amulet'},
    {id:'MG17Ambush',formId:0x0000C03B,name:'Ambush',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Ambush'},
    {id:'MG18KingofWorms',formId:0x0000C03C,name:'Confront the King',stages:[100],fame:3,url:'https://en.uesp.net/wiki/Oblivion:Confront_the_King'},
    {id:'DAAzura',formId:0x000146A2,name:'Azura',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Azura'},
    {id:'DABoethia',formId:0x000146A3,name:'Boethia',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Boethia'},
    {id:'DAClavicusVile',formId:0x000146A4,name:'Clavicus Vile',stages:[100, 105],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Clavicus_Vile'},
    {id:'DAHermaeusMora',formId:0x000146AF,name:'Hermaeus Mora',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Hermaeus_Mora'},
    {id:'DAHircine',formId:0x000146A5,name:'Hircine',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Hircine'},
    {id:'DAMalacath',formId:0x000146A6,name:'Malacath',stages:[100, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Malacath'},
    {id:'DAMephala',formId:0x000146A7,name:'Mephala',stages:[100, 105, 110, 115],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Mephala'},
    {id:'DAMeridia',formId:0x000146A8,name:'Meridia',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Meridia'},
    {id:'DAMolagBal',formId:0x000146B0,name:'Molag Bal',stages:[100, 105, 110],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Molag_Bal'},
    {id:'DANamira',formId:0x000146A9,name:'Namira',stages:[100, 105, 110],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Namira'},
    {id:'DANocturnal',formId:0x000146AA,name:'Nocturnal',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Nocturnal'},
    {id:'DAPeryite',formId:0x000146AB,name:'Peryite',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Peryite'},
    {id:'DASanguine',formId:0x000146AC,name:'Sanguine',stages:[100, 105],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Sanguine'},
    {id:'DASheogorath',formId:0x000146AD,name:'Sheogorath',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Sheogorath'},
    {id:'DAVaermina',formId:0x000146AE,name:'Vaermina',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Vaermina'},
    {id:'TG00FindThievesGuild',formId:0x000355DF,name:'Finding the Thieves Guild',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Finding_the_Thieves_Guild'},
    {id:'TG01BestThief',formId:0x000355E1,name:'May the Best Thief Win',stages:[50, 90],fame:0,url:'https://en.uesp.net/wiki/Oblivion:May_the_Best_Thief_Win'},
    {id:'TG01BloodPrice',formId:0x000BF021,name:'Blood Price (TG01)',stages:[18],fame:0,url:'https://en.uesp.net/wiki/Oblivion:May_the_Best_Thief_Win#Blood_Price'},
    {id:'TGStolenGoods',formId:0x0001EE46,name:'Independent Thievery',stages:[120],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Independent_Thievery'},
    {id:'TG02taxes',formId:0x0003486D,name:'Untaxing the Poor',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Untaxing_the_Poor'},
    {id:'TG03Elven',formId:0x00034EA2,name:'The Elven Maiden',stages:[80],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Elven_Maiden'},
    {id:'TG03BloodPrice',formId:0x000BF024,name:'Blood Price (TG03)',stages:[35],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Elven_Maiden#Blood_Price'},
    {id:'TG04Mistake',formId:0x00035DE0,name:'Ahdarji\'s Heirloom',stages:[80],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Ahdarji%27s_Heirloom'},
    {id:'TG04BloodPrice',formId:0x000BF01C,name:'Blood Price (TG04)',stages:[45],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Ahdarji%27s_Heirloom#Blood_Price'},
    {id:'TG05Misdirection',formId:0x00036332,name:'Misdirection',stages:[60],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Misdirection'},
    {id:'TG05BloodPrice',formId:0x000BF01D,name:'Blood Price (TG05)',stages:[55],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Misdirection#Blood_Price'},
    {id:'TG06Atonement',formId:0x00036333,name:'Lost Histories',stages:[70],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Lost_Histories'},
    {id:'TG06BloodPrice',formId:0x000BF01E,name:'Blood Price (TG06)',stages:[65],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Lost_Histories#Blood_Price'},
    {id:'TG07Lex',formId:0x00036334,name:'Taking Care of Lex',stages:[90],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Taking_Care_of_Lex'},
    {id:'TG07BloodPrice',formId:0x000BF020,name:'Blood Price (TG07)',stages:[75],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Taking_Care_of_Lex#Blood_Price'},
    {id:'TG08Blind',formId:0x00036335,name:'Turning a Blind Eye',stages:[50, 100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Turning_a_Blind_Eye'},
    {id:'TG08BloodPrice',formId:0x000BF022,name:'Blood Price (TG08)',stages:[85],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Turning_a_Blind_Eye#Blood_Price'},
    {id:'TG09Arrow',formId:0x00036336,name:'Arrow of Extrication',stages:[40, 50],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Arrow_of_Extrication'},
    {id:'TG09BloodPrice',formId:0x000BF023,name:'Blood Price (TG09)',stages:[95],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Arrow_of_Extrication#Blood_Price'},
    {id:'TG10Boots',formId:0x00036337,name:'Boots of Springheel Jak',stages:[50, 60],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Boots_of_Springheel_Jak'},
    {id:'TG10BloodPrice',formId:0x000BF025,name:'Blood Price (TG10)',stages:[105],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Boots_of_Springheel_Jak#Blood_Price'},
    {id:'TG11Heist',formId:0x00036338,name:'The Ultimate Heist',stages:[160, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Ultimate_Heist'},
    {id:'TrainingAcrobatics',formId:0x0018BA2B,name:'Acrobatics Training',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Acrobatics_Training'},
    {id:'TrainingAlchemy',formId:0x0018BA2A,name:'Alchemy Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Alchemy_Training'},
    {id:'TrainingAlteration',formId:0x0018BA2C,name:'Alteration Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Alteration_Training'},
    {id:'TrainingArmorer',formId:0x0018BA2D,name:'Armorer Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Armorer_Training'},
    {id:'TrainingAthletics',formId:0x0018BA2E,name:'Athletics Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Athletics_Training'},
    {id:'TrainingBlade',formId:0x0018BA2F,name:'Blade Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Blade_Training'},
    {id:'TrainingBlock',formId:0x0018BA30,name:'Block Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Block_Training'},
    {id:'TrainingBlunt',formId:0x0018BA31,name:'Blunt Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Blunt_Training'},
    {id:'TrainingConjuration',formId:0x0018BA32,name:'Conjuration Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Conjuration_Training'},
    {id:'TrainingDestruction',formId:0x0018B197,name:'Destruction Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Destruction_Training'},
    {id:'TrainingHandtoHand',formId:0x0018BA33,name:'Hand to Hand Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Hand_to_Hand_Training'},
    {id:'TrainingHeavyArmor',formId:0x0018B2F9,name:'Heavy Armor Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Heavy_Armor_Training'},
    {id:'TrainingIllusion',formId:0x0018BA34,name:'Illusion Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Illusion_Training'},
    {id:'TrainingLightArmor',formId:0x0018BA35,name:'Light Armor Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Light_Armor_Training'},
    {id:'TrainingMarksman',formId:0x0003C168,name:'Marksman Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Marksman_Training'},
    {id:'TrainingMercantile',formId:0x0018BA36,name:'Mercantile Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Mercantile_Training'},
    {id:'TrainingMysticism',formId:0x0018BA37,name:'Mysticism Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Mysticism_Training'},
    {id:'TrainingRestoration',formId:0x0018BA38,name:'Restoration Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Restoration_Training'},
    {id:'TrainingSecurity',formId:0x0018BA39,name:'Security Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Security_Training'},
    {id:'TrainingSneak',formId:0x0018BA3A,name:'Sneak Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Sneak_Training'},
    {id:'TrainingSpeechcraft',formId:0x0018BA3B,name:'Speechcraft Training',stages:[100, 200, 255],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Speechcraft_Training'},
    {id:'SQ08',formId:0x00185FED,name:'A Venerable Vintage',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Venerable_Vintage'},
    {id:'SQ06',formId:0x00185FEB,name:'Bear Season',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Bear_Season'},
    {id:'SQ09',formId:0x00185FEE,name:'Go Fish',stages:[100, 110, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Go_Fish'},
    {id:'MS46',formId:0x00007B2E,name:'Goblin Trouble',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Goblin_Trouble'},
    {id:'SQ04',formId:0x00185FE9,name:'No Stone Unturned',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:No_Stone_Unturned'},
    {id:'SQ03',formId:0x00185FE8,name:'Revenge Served Cold',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Revenge_Served_Cold'},
    {id:'SQ05',formId:0x00185FEA,name:'The Gravefinder\'s Repose',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Gravefinder%27s_Repose'},
    {id:'SQ01',formId:0x00177A31,name:'The Potato Snatcher',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Potato_Snatcher'},
    {id:'SQ07',formId:0x00185FEC,name:'The Sunken One',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Sunken_One_(quest)'},
    {id:'SQ10',formId:0x00185FEF,name:'When the Vow Breaks',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:When_the_Vow_Breaks'},
    {id:'MS47',formId:0x0002F86B,name:'Zero Visibility',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Zero_Visibility'},
    {id:'FGC03Flagon',formId:0x00002E60,name:'Newheim\'s Flagon',stages:[95],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Den_of_Thieves#Newheim.27s_Flagon'},
    {id:'MS02',formId:0x0003636F,name:'Where Spirits Have Lease',stages:[120],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Where_Spirits_Have_Lease'},
    {id:'MS04',formId:0x0003AF05,name:'The Siren\'s Deception',stages:[100, 110, 150],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Siren%27s_Deception'},
    {id:'MS93',formId:0x00095A68,name:'The Ghost Ship of Anvil',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Ghost_Ship_of_Anvil'},
    {id:'MS08',formId:0x0001F426,name:'Caught in the Hunt',stages:[100, 150],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Caught_in_the_Hunt'},
    {id:'MS05',formId:0x0002CA50,name:'Through A Nightmare, Darkly',stages:[90, 100, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Through_A_Nightmare,_Darkly'},
    {id:'MS06',formId:0x00033E93,name:'The Forlorn Watchman',stages:[120],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Forlorn_Watchman_(quest)'},
    {id:'HouseBravil',formId:0x00085480,name:'Buying a house in Bravil',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Bravil_House_for_Sale'},
    {id:'MS09',formId:0x00017837,name:'Two Sides of the Coin',stages:[100, 160, 180, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Two_Sides_of_the_Coin'},
    {id:'MS11',formId:0x00017839,name:'A Brotherhood Betrayed',stages:[120, 170, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:A_Brotherhood_Betrayed'},
    {id:'MS12',formId:0x00017835,name:'Lifting the Vale',stages:[150],fame:2,url:'https://en.uesp.net/wiki/Oblivion:Lifting_the_Vale'},
    {id:'HouseBruma',formId:0x00085481,name:'Buying a house in Bruma',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Bruma_House_for_Sale'},
    {id:'MS14',formId:0x00017606,name:'A Brush with Death',stages:[100, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:A_Brush_with_Death'},
    {id:'HouseCheydinhal',formId:0x00085483,name:'Buying a house in Cheydinhal',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Houses#Cheydinhal'},
    {id:'MS10',formId:0x00017838,name:'Corruption and Conscience',stages:[100, 180, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Corruption_and_Conscience'},
    {id:'MS13',formId:0x00031B77,name:'The Wayward Knight',stages:[100, 105, 110, 115, 150, 200],fame:2,url:'https://en.uesp.net/wiki/Oblivion:The_Wayward_Knight'},
    {id:'MS18',formId:0x000224C7,name:'The Killing Field',stages:[100, 120, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Killing_Field'},
    {id:'MS16',formId:0x00023E85,name:'Separated at Birth',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Separated_at_Birth'},
    {id:'MS16A',formId:0x0002B8DB,name:'Legacy Lost',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Legacy_Lost'},
    {id:'MS16B',formId:0x0002BA46,name:'Sins of the Father',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Sins_of_the_Father'},
    {id:'MS45',formId:0x00027815,name:'A Shadow Over Hackdirt',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:A_Shadow_Over_Hackdirt'},
    {id:'MS51',formId:0x0003151E,name:'Canvas the Castle',stages:[100, 150, 220],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Canvas_the_Castle'},
    {id:'HouseChorrol',formId:0x00085482,name:'Buying a house in Chorrol',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Arborwatch'},
    {id:'HouseImperialCity',formId:0x00085485,name:'Buy a house in the Imperial City',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Shack_for_Sale'},
    {id:'MS29',formId:0x00016718,name:'Unfriendly Competition',stages:[150, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Unfriendly_Competition'},
    {id:'MS21',formId:0x0002AB4A,name:'The Collector',stages:[60, 100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Collector'},
    {id:'MS22',formId:0x0002B19E,name:'Nothing You Can Possess',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Nothing_You_Can_Possess'},
    {id:'MS27',formId:0x0002E5BE,name:'Secrets of the Ayleids',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Secrets_of_the_Ayleids'},
    {id:'MS23',formId:0x0001D21C,name:'Order of the Virtuous Blood',stages:[160, 200, 250],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Order_of_the_Virtuous_Blood_(quest)'},
    {id:'MS26',formId:0x00035CA8,name:'Imperial Corruption',stages:[91, 119],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Imperial_Corruption'},
    {id:'MS31',formId:0x0000C1B8,name:'An Unexpected Voyage',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:An_Unexpected_Voyage'},
    {id:'MS52',formId:0x00038ED6,name:'Origin of the Gray Prince',stages:[100, 115],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Origin_of_the_Gray_Prince'},
    {id:'MS40',formId:0x0003E933,name:'Vampire Cure',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Vampire_Cure'},
    {id:'SQ02',formId:0x00181C6B,name:'Raid on Greyland',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Raid_on_Greyland'},
    {id:'MS37',formId:0x00022E5A,name:'Tears of the Savior',stages:[100, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Tears_of_the_Savior'},
    {id:'MS43',formId:0x00035A95,name:'Whom Gods Annoy',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Whom_Gods_Annoy'},
    {id:'MS91',formId:0x0008596C,name:'Mazoga the Orc',stages:[100, 200, 210],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Mazoga_the_Orc_(quest)'},
    {id:'MS92',formId:0x0008596D,name:'Knights of the White Stallion',stages:[100, 105, 110],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Knights_of_the_White_Stallion_(quest)'},
    {id:'HouseLeyawiin',formId:0x0008547F,name:'Buying a house in Leyawiin',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Houses#Leyawiin'},
    {id:'MS38',formId:0x00028D83,name:'Paranoia',stages:[9, 54, 65, 70, 81, 82, 100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Paranoia'},
    {id:'HouseSkingrad',formId:0x00085484,name:'Buying a house in Skringrad',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Buying_a_house_in_Skingrad'},
    {id:'HouseServant',formId:0x000B97DD,name:'Helping Hands',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Helping_Hands'},
    {id:'HouseSkingradQuest',formId:0x000B6C0C,name:'The Rosethorn Cache',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Rosethorn_Cache'},
    {id:'MS39',formId:0x0004E936,name:'Seeking Your Roots',stages:[100, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Seeking_Your_Roots'},
];
// ✔
// ✖
const rebuildTable = (saveFile = undefined) => {
    let qTable = document.getElementById('quest-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;
    let fame = 0;

    for (const quest of quests) {
        let status = '✖';
        if (saveFile) {
            
            let record = saveFile.records.find((e) => e.formId === quest.formId);
            if (record) {
                for (const stage of record.subRecord.stage) {
                    if (quest.stages.includes(stage.index)) {
                        status = '✔';
                        ++completed;
                        fame += quest.fame;
                        break;
                    }
                }
            } else {
                debugger;
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='id'>${quest.id}</td>
<td class='formId'>${('0000000'+quest.formId.toString(16)).substr(-8)}</td>
<td class='name'>${quest.name}</td>
<td class='stages'>${quest.stages.join('<br>')}</td>
<td class='fame'>${quest.fame}</td>
<td class='url'><a href="${quest.url}">UESP</a></td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
    qFoot.querySelector('.total-fame').innerText = fame;
};
document.addEventListener('DOMContentLoaded', () => {
    rebuildTable();
    const ignoreEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    // Handle drag+drop of files. Have to ignore dragenter/dragover for compatibility reasons.
    document.body.addEventListener('dragenter', ignoreEvent);
    document.body.addEventListener('dragover', ignoreEvent);

    /**
     * @param {DragEvent} e 
     */
    const dropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer;
        if (dt) {
            const files = dt.files;
            for (const file of files)
            void file.arrayBuffer().then((b) => {
                const saveFile = new window.oblivionSaveFile.SaveFile(b);
                console.log(saveFile);
                window.saveFile = saveFile;
                rebuildTable(saveFile);
            });
        }
    };

    document.body.addEventListener('drop', dropHandler);
});