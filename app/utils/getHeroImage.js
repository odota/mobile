export function getHeroImage(id) {
    var staticImage;
    if(id == 1) {
        staticImage = require('../assets/heroes/antimage_full.png');
    } else if (id == 2) {
        staticImage = require('../assets/heroes/axe_full.png');
    } else if (id == 3) {
        staticImage = require('../assets/heroes/bane_full.png');
    } else if (id == 4) {
        staticImage = require('../assets/heroes/bloodseeker_full.png');
    } else if (id == 5) {
        staticImage = require('../assets/heroes/crystal_maiden_full.png');
    } else if (id == 6) {
        staticImage = require('../assets/heroes/drow_ranger_full.png');
    } else if (id == 7) {
        staticImage = require('../assets/heroes/earthshaker_full.png');
    } else if (id == 8) {
        staticImage = require('../assets/heroes/juggernaut_full.png');
    } else if (id == 9) {
        staticImage = require('../assets/heroes/mirana_full.png');
    } else if (id == 10) {
        staticImage = require('../assets/heroes/morphling_full.png');
    } else if (id == 11) {
        staticImage = require('../assets/heroes/nevermore_full.png');
    } else if (id == 12) {
        staticImage = require('../assets/heroes/phantom_lancer_full.png');
    } else if (id == 13) {
        staticImage = require('../assets/heroes/puck_full.png');
    } else if (id == 14) {
        staticImage = require('../assets/heroes/pudge_full.png');
    } else if (id == 15) {
        staticImage = require('../assets/heroes/razor_full.png');
    } else if (id == 16) {
        staticImage = require('../assets/heroes/sand_king_full.png');
    } else if (id == 17) {
        staticImage = require('../assets/heroes/storm_spirit_full.png');
    } else if (id == 18) {
        staticImage = require('../assets/heroes/sven_full.png');
    } else if (id == 19) {
        staticImage = require('../assets/heroes/tiny_full.png');
    } else if (id == 20) {
        staticImage = require('../assets/heroes/vengefulspirit_full.png');
    } else if (id == 21) {
        staticImage = require('../assets/heroes/windrunner_full.png');
    } else if (id == 22) {
        staticImage = require('../assets/heroes/zuus_full.png');
    } else if (id == 23) {
        staticImage = require('../assets/heroes/kunkka_full.png');
    } else if (id == 25) {
        staticImage = require('../assets/heroes/lina_full.png');
    } else if (id == 26) {
        staticImage = require('../assets/heroes/lion_full.png');
    } else if (id == 27) {
        staticImage = require('../assets/heroes/shadow_shaman_full.png');
    } else if (id == 28) {
        staticImage = require('../assets/heroes/slardar_full.png');
    } else if (id == 29) {
        staticImage = require('../assets/heroes/tidehunter_full.png');
    } else if (id == 30) {
        staticImage = require('../assets/heroes/witch_doctor_full.png');
    } else if (id == 31) {
        staticImage = require('../assets/heroes/lich_full.png');
    } else if (id == 32) {
        staticImage = require('../assets/heroes/riki_full.png');
    } else if (id == 33) {
        staticImage = require('../assets/heroes/enigma_full.png');
    } else if (id == 34) {
        staticImage = require('../assets/heroes/tinker_full.png');
    } else if (id == 35) {
        staticImage = require('../assets/heroes/sniper_full.png');
    } else if (id == 36) {
        staticImage = require('../assets/heroes/necrolyte_full.png');
    } else if (id == 37) {
        staticImage = require('../assets/heroes/warlock_full.png');
    } else if (id == 38) {
        staticImage = require('../assets/heroes/beastmaster_full.png');
    } else if (id == 39) {
        staticImage = require('../assets/heroes/queenofpain_full.png');
    } else if (id == 40) {
        staticImage = require('../assets/heroes/venomancer_full.png');
    } else if (id == 41) {
        staticImage = require('../assets/heroes/faceless_void_full.png');
    } else if (id == 42) {
        staticImage = require('../assets/heroes/skeleton_king_full.png');
    } else if (id == 43) {
        staticImage = require('../assets/heroes/death_prophet_full.png');
    } else if (id == 44) {
        staticImage = require('../assets/heroes/phantom_assassin_full.png');
    } else if (id == 45) {
        staticImage = require('../assets/heroes/pugna_full.png');
    } else if (id == 46) {
        staticImage = require('../assets/heroes/templar_assassin_full.png');
    } else if (id == 47) {
        staticImage = require('../assets/heroes/viper_full.png');
    } else if (id == 48) {
        staticImage = require('../assets/heroes/luna_full.png');
    } else if (id == 49) {
        staticImage = require('../assets/heroes/dragon_knight_full.png');
    } else if (id == 50) {
        staticImage = require('../assets/heroes/dazzle_full.png');
    } else if (id == 51) {
        staticImage = require('../assets/heroes/rattletrap_full.png');
    } else if (id == 52) {
        staticImage = require('../assets/heroes/leshrac_full.png');
    } else if (id == 53) {
        staticImage = require('../assets/heroes/furion_full.png');
    } else if (id == 54) {
        staticImage = require('../assets/heroes/life_stealer_full.png');
    } else if (id == 55) {
        staticImage = require('../assets/heroes/dark_seer_full.png');
    } else if (id == 56) {
        staticImage = require('../assets/heroes/clinkz_full.png');
    } else if (id == 57) {
        staticImage = require('../assets/heroes/omniknight_full.png');
    } else if (id == 58) {
        staticImage = require('../assets/heroes/enchantress_full.png');
    } else if (id == 59) {
        staticImage = require('../assets/heroes/huskar_full.png');
    } else if (id == 60) {
        staticImage = require('../assets/heroes/night_stalker_full.png');
    } else if (id == 61) {
        staticImage = require('../assets/heroes/broodmother_full.png');
    } else if (id == 62) {
        staticImage = require('../assets/heroes/bounty_hunter_full.png');
    } else if (id == 63) {
        staticImage = require('../assets/heroes/weaver_full.png');
    } else if (id == 64) {
        staticImage = require('../assets/heroes/jakiro_full.png');
    } else if (id == 65) {
        staticImage = require('../assets/heroes/batrider_full.png');
    } else if (id == 66) {
        staticImage = require('../assets/heroes/chen_full.png');
    } else if (id == 67) {
        staticImage = require('../assets/heroes/spectre_full.png');
    } else if (id == 68) {
        staticImage = require('../assets/heroes/ancient_apparition_full.png');
    } else if (id == 69) {
        staticImage = require('../assets/heroes/doom_bringer_full.png');
    } else if (id == 70) {
        staticImage = require('../assets/heroes/ursa_full.png');
    } else if (id == 71) {
        staticImage = require('../assets/heroes/spirit_breaker_full.png');
    } else if (id == 72) {
        staticImage = require('../assets/heroes/gyrocopter_full.png');
    } else if (id == 73) {
        staticImage = require('../assets/heroes/alchemist_full.png');
    } else if (id == 74) {
        staticImage = require('../assets/heroes/invoker_full.png');
    } else if (id == 75) {
        staticImage = require('../assets/heroes/silencer_full.png');
    } else if (id == 76) {
        staticImage = require('../assets/heroes/obsidian_destroyer_full.png');
    } else if (id == 77) {
        staticImage = require('../assets/heroes/lycan_full.png');
    } else if (id == 78) {
        staticImage = require('../assets/heroes/brewmaster_full.png');
    } else if (id == 79) {
        staticImage = require('../assets/heroes/shadow_demon_full.png');
    } else if (id == 80) {
        staticImage = require('../assets/heroes/lone_druid_full.png');
    } else if (id == 81) {
        staticImage = require('../assets/heroes/chaos_knight_full.png');
    } else if (id == 82) {
        staticImage = require('../assets/heroes/meepo_full.png');
    } else if (id == 83) {
        staticImage = require('../assets/heroes/treant_full.png');
    } else if (id == 84) {
        staticImage = require('../assets/heroes/ogre_magi_full.png');
    } else if (id == 85) {
        staticImage = require('../assets/heroes/undying_full.png');
    } else if (id == 86) {
        staticImage = require('../assets/heroes/rubick_full.png');
    } else if (id == 87) {
        staticImage = require('../assets/heroes/disruptor_full.png');
    } else if (id == 88) {
        staticImage = require('../assets/heroes/nyx_assassin_full.png');
    } else if (id == 89) {
        staticImage = require('../assets/heroes/naga_siren_full.png');
    } else if (id == 90) {
        staticImage = require('../assets/heroes/keeper_of_the_light_full.png');
    } else if (id == 91) {
        staticImage = require('../assets/heroes/wisp_full.png');
    } else if (id == 92) {
        staticImage = require('../assets/heroes/visage_full.png');
    } else if (id == 93) {
        staticImage = require('../assets/heroes/slark_full.png');
    } else if (id == 94) {
        staticImage = require('../assets/heroes/medusa_full.png');
    } else if (id == 95) {
        staticImage = require('../assets/heroes/troll_warlord_full.png');
    } else if (id == 96) {
        staticImage = require('../assets/heroes/centaur_full.png');
    } else if (id == 97) {
        staticImage = require('../assets/heroes/magnataur_full.png');
    } else if (id == 98) {
        staticImage = require('../assets/heroes/shredder_full.png');
    } else if (id == 99) {
        staticImage = require('../assets/heroes/bristleback_full.png');
    } else if (id == 100) {
        staticImage = require('../assets/heroes/tusk_full.png');
    } else if (id == 101) {
        staticImage = require('../assets/heroes/skywrath_mage_full.png');
    } else if (id == 102) {
        staticImage = require('../assets/heroes/abaddon_full.png');
    } else if (id == 103) {
        staticImage = require('../assets/heroes/elder_titan_full.png');
    } else if (id == 104) {
        staticImage = require('../assets/heroes/legion_commander_full.png');
    } else if (id == 105) {
        staticImage = require('../assets/heroes/techies_full.png');
    } else if (id == 106) {
        staticImage = require('../assets/heroes/ember_spirit_full.png');
    } else if (id == 107) {
        staticImage = require('../assets/heroes/earth_spirit_full.png');
    } else if (id == 108) {
        staticImage = require('../assets/heroes/underlord_full.png');
    } else if (id == 109) {
        staticImage = require('../assets/heroes/terrorblade_full.png');
    } else if (id == 110) {
        staticImage = require('../assets/heroes/phoenix_full.png');
    } else if (id == 111) {
        staticImage = require('../assets/heroes/oracle_full.png');
    } else if (id == 112) {
        staticImage = require('../assets/heroes/winter_wyvern_full.png');
    } else if (id == 113) {
        staticImage = require('../assets/heroes/arc_warden_full.png');
    } else if (id == 114) {
        staticImage = require('../assets/heroes/monkey_king_full.png');
    } else {
        staticImage = require('../assets/heroes/rubick_full.png');
    }
    return staticImage;
}
