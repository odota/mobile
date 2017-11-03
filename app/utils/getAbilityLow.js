export function getAbilityLow(id) {
    var staticImage;
    if (id == 5001) {
		staticImage = require('../assets/abilities/default_attack_lg.png');
	} else if (id == 5003) {
		staticImage = require('../assets/abilities/antimage_mana_break_lg.png');
	} else if (id == 5004) {
		staticImage = require('../assets/abilities/antimage_blink_lg.png');
	} else if (id == 5005) {
		staticImage = require('../assets/abilities/antimage_spell_shield_lg.png');
	} else if (id == 5006) {
		staticImage = require('../assets/abilities/antimage_mana_void_lg.png');
	} else if (id == 5007) {
		staticImage = require('../assets/abilities/axe_berserkers_call_lg.png');
	} else if (id == 5008) {
		staticImage = require('../assets/abilities/axe_battle_hunger_lg.png');
	} else if (id == 5009) {
		staticImage = require('../assets/abilities/axe_counter_helix_lg.png');
	} else if (id == 5010) {
		staticImage = require('../assets/abilities/axe_culling_blade_lg.png');
	} else if (id == 5011) {
		staticImage = require('../assets/abilities/bane_brain_sap_lg.png');
	} else if (id == 5012) {
		staticImage = require('../assets/abilities/bane_enfeeble_lg.png');
	} else if (id == 5013) {
		staticImage = require('../assets/abilities/bane_fiends_grip_lg.png');
	} else if (id == 5014) {
		staticImage = require('../assets/abilities/bane_nightmare_lg.png');
	} else if (id == 5015) {
		staticImage = require('../assets/abilities/bloodseeker_bloodrage_lg.png');
	} else if (id == 5016) {
		staticImage = require('../assets/abilities/bloodseeker_blood_bath_lg.png');
	} else if (id == 5017) {
		staticImage = require('../assets/abilities/bloodseeker_thirst_lg.png');
	} else if (id == 5018) {
		staticImage = require('../assets/abilities/bloodseeker_rupture_lg.png');
	} else if (id == 5019) {
		staticImage = require('../assets/abilities/drow_ranger_frost_arrows_lg.png');
	} else if (id == 5020) {
		staticImage = require('../assets/abilities/drow_ranger_silence_lg.png');
	} else if (id == 5021) {
		staticImage = require('../assets/abilities/drow_ranger_trueshot_lg.png');
	} else if (id == 5022) {
		staticImage = require('../assets/abilities/drow_ranger_marksmanship_lg.png');
	} else if (id == 5023) {
		staticImage = require('../assets/abilities/earthshaker_fissure_lg.png');
	} else if (id == 5024) {
		staticImage = require('../assets/abilities/earthshaker_enchant_totem_lg.png');
	} else if (id == 5025) {
		staticImage = require('../assets/abilities/earthshaker_aftershock_lg.png');
	} else if (id == 5026) {
		staticImage = require('../assets/abilities/earthshaker_echo_slam_lg.png');
	} else if (id == 5027) {
		staticImage = require('../assets/abilities/juggernaut_blade_dance_lg.png');
	} else if (id == 5028) {
		staticImage = require('../assets/abilities/juggernaut_blade_fury_lg.png');
	} else if (id == 5029) {
		staticImage = require('../assets/abilities/juggernaut_healing_ward_lg.png');
	} else if (id == 5030) {
		staticImage = require('../assets/abilities/juggernaut_omni_slash_lg.png');
	} else if (id == 5031) {
		staticImage = require('../assets/abilities/kunkka_torrent_lg.png');
	} else if (id == 5032) {
		staticImage = require('../assets/abilities/kunkka_tidebringer_lg.png');
	} else if (id == 5033) {
		staticImage = require('../assets/abilities/kunkka_x_marks_the_spot_lg.png');
	} else if (id == 5034) {
		staticImage = require('../assets/abilities/kunkka_return_lg.png');
	} else if (id == 5035) {
		staticImage = require('../assets/abilities/kunkka_ghostship_lg.png');
	} else if (id == 5040) {
		staticImage = require('../assets/abilities/lina_dragon_slave_lg.png');
	} else if (id == 5041) {
		staticImage = require('../assets/abilities/lina_light_strike_array_lg.png');
	} else if (id == 5042) {
		staticImage = require('../assets/abilities/lina_fiery_soul_lg.png');
	} else if (id == 5043) {
		staticImage = require('../assets/abilities/lina_laguna_blade_lg.png');
	} else if (id == 5044) {
		staticImage = require('../assets/abilities/lion_impale_lg.png');
	} else if (id == 5045) {
		staticImage = require('../assets/abilities/lion_voodoo_lg.png');
	} else if (id == 5046) {
		staticImage = require('../assets/abilities/lion_mana_drain_lg.png');
	} else if (id == 5047) {
		staticImage = require('../assets/abilities/lion_finger_of_death_lg.png');
	} else if (id == 5048) {
		staticImage = require('../assets/abilities/mirana_arrow_lg.png');
	} else if (id == 5049) {
		staticImage = require('../assets/abilities/mirana_invis_lg.png');
	} else if (id == 5050) {
		staticImage = require('../assets/abilities/mirana_leap_lg.png');
	} else if (id == 5051) {
		staticImage = require('../assets/abilities/mirana_starfall_lg.png');
	} else if (id == 5052) {
		staticImage = require('../assets/abilities/morphling_waveform_lg.png');
	} else if (id == 5053) {
		staticImage = require('../assets/abilities/morphling_adaptive_strike_lg.png');
	} else if (id == 5055) {
		staticImage = require('../assets/abilities/morphling_morph_agi_lg.png');
	} else if (id == 5056) {
		staticImage = require('../assets/abilities/morphling_morph_str_lg.png');
	} else if (id == 5057) {
		staticImage = require('../assets/abilities/morphling_replicate_lg.png');
	} else if (id == 5058) {
		staticImage = require('../assets/abilities/morphling_morph_replicate_lg.png');
	} else if (id == 5059) {
		staticImage = require('../assets/abilities/nevermore_shadowraze1_lg.png');
	} else if (id == 5060) {
		staticImage = require('../assets/abilities/nevermore_shadowraze2_lg.png');
	} else if (id == 5061) {
		staticImage = require('../assets/abilities/nevermore_shadowraze3_lg.png');
	} else if (id == 5062) {
		staticImage = require('../assets/abilities/nevermore_necromastery_lg.png');
	} else if (id == 5063) {
		staticImage = require('../assets/abilities/nevermore_dark_lord_lg.png');
	} else if (id == 5064) {
		staticImage = require('../assets/abilities/nevermore_requiem_lg.png');
	} else if (id == 5065) {
		staticImage = require('../assets/abilities/phantom_lancer_spirit_lance_lg.png');
	} else if (id == 5066) {
		staticImage = require('../assets/abilities/phantom_lancer_doppelwalk_lg.png');
	} else if (id == 5067) {
		staticImage = require('../assets/abilities/phantom_lancer_juxtapose_lg.png');
	} else if (id == 5068) {
		staticImage = require('../assets/abilities/phantom_lancer_phantom_edge_lg.png');
	} else if (id == 5069) {
		staticImage = require('../assets/abilities/puck_illusory_orb_lg.png');
	} else if (id == 5070) {
		staticImage = require('../assets/abilities/puck_ethereal_jaunt_lg.png');
	} else if (id == 5071) {
		staticImage = require('../assets/abilities/puck_waning_rift_lg.png');
	} else if (id == 5072) {
		staticImage = require('../assets/abilities/puck_phase_shift_lg.png');
	} else if (id == 5073) {
		staticImage = require('../assets/abilities/puck_dream_coil_lg.png');
	} else if (id == 5074) {
		staticImage = require('../assets/abilities/pudge_flesh_heap_lg.png');
	} else if (id == 5075) {
		staticImage = require('../assets/abilities/pudge_meat_hook_lg.png');
	} else if (id == 5076) {
		staticImage = require('../assets/abilities/pudge_rot_lg.png');
	} else if (id == 5077) {
		staticImage = require('../assets/abilities/pudge_dismember_lg.png');
	} else if (id == 5078) {
		staticImage = require('../assets/abilities/shadow_shaman_ether_shock_lg.png');
	} else if (id == 5079) {
		staticImage = require('../assets/abilities/shadow_shaman_voodoo_lg.png');
	} else if (id == 5080) {
		staticImage = require('../assets/abilities/shadow_shaman_shackles_lg.png');
	} else if (id == 5081) {
		staticImage = require('../assets/abilities/shadow_shaman_mass_serpent_ward_lg.png');
	} else if (id == 5082) {
		staticImage = require('../assets/abilities/razor_plasma_field_lg.png');
	} else if (id == 5083) {
		staticImage = require('../assets/abilities/razor_static_link_lg.png');
	} else if (id == 5084) {
		staticImage = require('../assets/abilities/razor_unstable_current_lg.png');
	} else if (id == 5085) {
		staticImage = require('../assets/abilities/razor_eye_of_the_storm_lg.png');
	} else if (id == 5086) {
		staticImage = require('../assets/abilities/skeleton_king_hellfire_blast_lg.png');
	} else if (id == 5087) {
		staticImage = require('../assets/abilities/skeleton_king_vampiric_aura_lg.png');
	} else if (id == 5088) {
		staticImage = require('../assets/abilities/skeleton_king_mortal_strike_lg.png');
	} else if (id == 5089) {
		staticImage = require('../assets/abilities/skeleton_king_reincarnation_lg.png');
	} else if (id == 5090) {
		staticImage = require('../assets/abilities/death_prophet_carrion_swarm_lg.png');
	} else if (id == 5091) {
		staticImage = require('../assets/abilities/death_prophet_silence_lg.png');
	} else if (id == 5092) {
		staticImage = require('../assets/abilities/death_prophet_witchcraft_lg.png');
	} else if (id == 5093) {
		staticImage = require('../assets/abilities/death_prophet_exorcism_lg.png');
	} else if (id == 5094) {
		staticImage = require('../assets/abilities/sven_storm_bolt_lg.png');
	} else if (id == 5095) {
		staticImage = require('../assets/abilities/sven_great_cleave_lg.png');
	} else if (id == 5096) {
		staticImage = require('../assets/abilities/sven_warcry_lg.png');
	} else if (id == 5097) {
		staticImage = require('../assets/abilities/sven_gods_strength_lg.png');
	} else if (id == 5098) {
		staticImage = require('../assets/abilities/storm_spirit_static_remnant_lg.png');
	} else if (id == 5099) {
		staticImage = require('../assets/abilities/storm_spirit_electric_vortex_lg.png');
	} else if (id == 5100) {
		staticImage = require('../assets/abilities/storm_spirit_overload_lg.png');
	} else if (id == 5101) {
		staticImage = require('../assets/abilities/storm_spirit_ball_lightning_lg.png');
	} else if (id == 5102) {
		staticImage = require('../assets/abilities/sandking_burrowstrike_lg.png');
	} else if (id == 5103) {
		staticImage = require('../assets/abilities/sandking_sand_storm_lg.png');
	} else if (id == 5104) {
		staticImage = require('../assets/abilities/sandking_caustic_finale_lg.png');
	} else if (id == 5105) {
		staticImage = require('../assets/abilities/sandking_epicenter_lg.png');
	} else if (id == 5106) {
		staticImage = require('../assets/abilities/tiny_avalanche_lg.png');
	} else if (id == 5107) {
		staticImage = require('../assets/abilities/tiny_toss_lg.png');
	} else if (id == 5108) {
		staticImage = require('../assets/abilities/tiny_craggy_exterior_lg.png');
	} else if (id == 5109) {
		staticImage = require('../assets/abilities/tiny_grow_lg.png');
	} else if (id == 5110) {
		staticImage = require('../assets/abilities/zuus_arc_lightning_lg.png');
	} else if (id == 5111) {
		staticImage = require('../assets/abilities/zuus_lightning_bolt_lg.png');
	} else if (id == 5112) {
		staticImage = require('../assets/abilities/zuus_static_field_lg.png');
	} else if (id == 5113) {
		staticImage = require('../assets/abilities/zuus_thundergods_wrath_lg.png');
	} else if (id == 5114) {
		staticImage = require('../assets/abilities/slardar_sprint_lg.png');
	} else if (id == 5115) {
		staticImage = require('../assets/abilities/slardar_slithereen_crush_lg.png');
	} else if (id == 5116) {
		staticImage = require('../assets/abilities/slardar_bash_lg.png');
	} else if (id == 5117) {
		staticImage = require('../assets/abilities/slardar_amplify_damage_lg.png');
	} else if (id == 5118) {
		staticImage = require('../assets/abilities/tidehunter_gush_lg.png');
	} else if (id == 5119) {
		staticImage = require('../assets/abilities/tidehunter_kraken_shell_lg.png');
	} else if (id == 5120) {
		staticImage = require('../assets/abilities/tidehunter_anchor_smash_lg.png');
	} else if (id == 5121) {
		staticImage = require('../assets/abilities/tidehunter_ravage_lg.png');
	} else if (id == 5122) {
		staticImage = require('../assets/abilities/vengefulspirit_magic_missile_lg.png');
	} else if (id == 5123) {
		staticImage = require('../assets/abilities/vengefulspirit_command_aura_lg.png');
	} else if (id == 5124) {
		staticImage = require('../assets/abilities/vengefulspirit_wave_of_terror_lg.png');
	} else if (id == 5125) {
		staticImage = require('../assets/abilities/vengefulspirit_nether_swap_lg.png');
	} else if (id == 5126) {
		staticImage = require('../assets/abilities/crystal_maiden_crystal_nova_lg.png');
	} else if (id == 5127) {
		staticImage = require('../assets/abilities/crystal_maiden_frostbite_lg.png');
	} else if (id == 5128) {
		staticImage = require('../assets/abilities/crystal_maiden_brilliance_aura_lg.png');
	} else if (id == 5129) {
		staticImage = require('../assets/abilities/crystal_maiden_freezing_field_lg.png');
	} else if (id == 5130) {
		staticImage = require('../assets/abilities/windrunner_shackleshot_lg.png');
	} else if (id == 5131) {
		staticImage = require('../assets/abilities/windrunner_powershot_lg.png');
	} else if (id == 5132) {
		staticImage = require('../assets/abilities/windrunner_windrun_lg.png');
	} else if (id == 5133) {
		staticImage = require('../assets/abilities/windrunner_focusfire_lg.png');
	} else if (id == 5134) {
		staticImage = require('../assets/abilities/lich_frost_nova_lg.png');
	} else if (id == 5135) {
		staticImage = require('../assets/abilities/lich_frost_armor_lg.png');
	} else if (id == 5136) {
		staticImage = require('../assets/abilities/lich_dark_ritual_lg.png');
	} else if (id == 5137) {
		staticImage = require('../assets/abilities/lich_chain_frost_lg.png');
	} else if (id == 5138) {
		staticImage = require('../assets/abilities/witch_doctor_paralyzing_cask_lg.png');
	} else if (id == 5139) {
		staticImage = require('../assets/abilities/witch_doctor_voodoo_restoration_lg.png');
	} else if (id == 5140) {
		staticImage = require('../assets/abilities/witch_doctor_maledict_lg.png');
	} else if (id == 5141) {
		staticImage = require('../assets/abilities/witch_doctor_death_ward_lg.png');
	} else if (id == 5142) {
		staticImage = require('../assets/abilities/riki_smoke_screen_lg.png');
	} else if (id == 5143) {
		staticImage = require('../assets/abilities/riki_blink_strike_lg.png');
	} else if (id == 5144) {
		staticImage = require('../assets/abilities/riki_permanent_invisibility_lg.png');
	} else if (id == 5145) {
		staticImage = require('../assets/abilities/riki_tricks_of_the_trade_lg.png');
	} else if (id == 5146) {
		staticImage = require('../assets/abilities/enigma_malefice_lg.png');
	} else if (id == 5147) {
		staticImage = require('../assets/abilities/enigma_demonic_conversion_lg.png');
	} else if (id == 5148) {
		staticImage = require('../assets/abilities/enigma_midnight_pulse_lg.png');
	} else if (id == 5149) {
		staticImage = require('../assets/abilities/enigma_black_hole_lg.png');
	} else if (id == 5150) {
		staticImage = require('../assets/abilities/tinker_laser_lg.png');
	} else if (id == 5151) {
		staticImage = require('../assets/abilities/tinker_heat_seeking_missile_lg.png');
	} else if (id == 5152) {
		staticImage = require('../assets/abilities/tinker_march_of_the_machines_lg.png');
	} else if (id == 5153) {
		staticImage = require('../assets/abilities/tinker_rearm_lg.png');
	} else if (id == 5154) {
		staticImage = require('../assets/abilities/sniper_shrapnel_lg.png');
	} else if (id == 5155) {
		staticImage = require('../assets/abilities/sniper_headshot_lg.png');
	} else if (id == 5156) {
		staticImage = require('../assets/abilities/sniper_take_aim_lg.png');
	} else if (id == 5157) {
		staticImage = require('../assets/abilities/sniper_assassinate_lg.png');
	} else if (id == 5158) {
		staticImage = require('../assets/abilities/necrolyte_death_pulse_lg.png');
	} else if (id == 5159) {
		staticImage = require('../assets/abilities/necrolyte_heartstopper_aura_lg.png');
	} else if (id == 5160) {
		staticImage = require('../assets/abilities/necrolyte_sadist_lg.png');
	} else if (id == 5161) {
		staticImage = require('../assets/abilities/necrolyte_reapers_scythe_lg.png');
	} else if (id == 5162) {
		staticImage = require('../assets/abilities/warlock_fatal_bonds_lg.png');
	} else if (id == 5163) {
		staticImage = require('../assets/abilities/warlock_shadow_word_lg.png');
	} else if (id == 5164) {
		staticImage = require('../assets/abilities/warlock_upheaval_lg.png');
	} else if (id == 5165) {
		staticImage = require('../assets/abilities/warlock_rain_of_chaos_lg.png');
	} else if (id == 5166) {
		staticImage = require('../assets/abilities/warlock_golem_flaming_fists_lg.png');
	} else if (id == 5167) {
		staticImage = require('../assets/abilities/warlock_golem_permanent_immolation_lg.png');
	} else if (id == 5168) {
		staticImage = require('../assets/abilities/beastmaster_wild_axes_lg.png');
	} else if (id == 5169) {
		staticImage = require('../assets/abilities/beastmaster_call_of_the_wild_lg.png');
	} else if (id == 5170) {
		staticImage = require('../assets/abilities/beastmaster_hawk_invisibility_lg.png');
	} else if (id == 5171) {
		staticImage = require('../assets/abilities/beastmaster_boar_poison_lg.png');
	} else if (id == 5172) {
		staticImage = require('../assets/abilities/beastmaster_inner_beast_lg.png');
	} else if (id == 5173) {
		staticImage = require('../assets/abilities/queenofpain_shadow_strike_lg.png');
	} else if (id == 5174) {
		staticImage = require('../assets/abilities/queenofpain_blink_lg.png');
	} else if (id == 5175) {
		staticImage = require('../assets/abilities/queenofpain_scream_of_pain_lg.png');
	} else if (id == 5176) {
		staticImage = require('../assets/abilities/queenofpain_sonic_wave_lg.png');
	} else if (id == 5177) {
		staticImage = require('../assets/abilities/beastmaster_primal_roar_lg.png');
	} else if (id == 5178) {
		staticImage = require('../assets/abilities/venomancer_venomous_gale_lg.png');
	} else if (id == 5179) {
		staticImage = require('../assets/abilities/venomancer_poison_sting_lg.png');
	} else if (id == 5180) {
		staticImage = require('../assets/abilities/venomancer_plague_ward_lg.png');
	} else if (id == 5181) {
		staticImage = require('../assets/abilities/venomancer_poison_nova_lg.png');
	} else if (id == 5182) {
		staticImage = require('../assets/abilities/faceless_void_time_walk_lg.png');
	} else if (id == 5183) {
		staticImage = require('../assets/abilities/faceless_void_backtrack_lg.png');
	} else if (id == 5184) {
		staticImage = require('../assets/abilities/faceless_void_time_lock_lg.png');
	} else if (id == 5185) {
		staticImage = require('../assets/abilities/faceless_void_chronosphere_lg.png');
	} else if (id == 5186) {
		staticImage = require('../assets/abilities/pugna_nether_blast_lg.png');
	} else if (id == 5187) {
		staticImage = require('../assets/abilities/pugna_decrepify_lg.png');
	} else if (id == 5188) {
		staticImage = require('../assets/abilities/pugna_nether_ward_lg.png');
	} else if (id == 5189) {
		staticImage = require('../assets/abilities/pugna_life_drain_lg.png');
	} else if (id == 5190) {
		staticImage = require('../assets/abilities/phantom_assassin_stifling_dagger_lg.png');
	} else if (id == 5191) {
		staticImage = require('../assets/abilities/phantom_assassin_phantom_strike_lg.png');
	} else if (id == 5192) {
		staticImage = require('../assets/abilities/phantom_assassin_blur_lg.png');
	} else if (id == 5193) {
		staticImage = require('../assets/abilities/phantom_assassin_coup_de_grace_lg.png');
	} else if (id == 5194) {
		staticImage = require('../assets/abilities/templar_assassin_refraction_lg.png');
	} else if (id == 5195) {
		staticImage = require('../assets/abilities/templar_assassin_meld_lg.png');
	} else if (id == 5196) {
		staticImage = require('../assets/abilities/templar_assassin_psi_blades_lg.png');
	} else if (id == 5197) {
		staticImage = require('../assets/abilities/templar_assassin_psionic_trap_lg.png');
	} else if (id == 5198) {
		staticImage = require('../assets/abilities/templar_assassin_trap_lg.png');
	} else if (id == 5200) {
		staticImage = require('../assets/abilities/necronomicon_warrior_last_will_lg.png');
	} else if (id == 5201) {
		staticImage = require('../assets/abilities/necronomicon_warrior_true_sight_lg.png');
	} else if (id == 5203) {
		staticImage = require('../assets/abilities/necronomicon_archer_mana_burn_lg.png');
	} else if (id == 5218) {
		staticImage = require('../assets/abilities/viper_poison_attack_lg.png');
	} else if (id == 5219) {
		staticImage = require('../assets/abilities/viper_nethertoxin_lg.png');
	} else if (id == 5220) {
		staticImage = require('../assets/abilities/viper_corrosive_skin_lg.png');
	} else if (id == 5221) {
		staticImage = require('../assets/abilities/viper_viper_strike_lg.png');
	} else if (id == 5222) {
		staticImage = require('../assets/abilities/luna_lucent_beam_lg.png');
	} else if (id == 5223) {
		staticImage = require('../assets/abilities/luna_moon_glaive_lg.png');
	} else if (id == 5224) {
		staticImage = require('../assets/abilities/luna_lunar_blessing_lg.png');
	} else if (id == 5225) {
		staticImage = require('../assets/abilities/luna_eclipse_lg.png');
	} else if (id == 5226) {
		staticImage = require('../assets/abilities/dragon_knight_breathe_fire_lg.png');
	} else if (id == 5227) {
		staticImage = require('../assets/abilities/dragon_knight_dragon_tail_lg.png');
	} else if (id == 5228) {
		staticImage = require('../assets/abilities/dragon_knight_dragon_blood_lg.png');
	} else if (id == 5229) {
		staticImage = require('../assets/abilities/dragon_knight_elder_dragon_form_lg.png');
	} else if (id == 5233) {
		staticImage = require('../assets/abilities/dazzle_poison_touch_lg.png');
	} else if (id == 5234) {
		staticImage = require('../assets/abilities/dazzle_shallow_grave_lg.png');
	} else if (id == 5235) {
		staticImage = require('../assets/abilities/dazzle_shadow_wave_lg.png');
	} else if (id == 5236) {
		staticImage = require('../assets/abilities/dazzle_weave_lg.png');
	} else if (id == 5237) {
		staticImage = require('../assets/abilities/rattletrap_battery_assault_lg.png');
	} else if (id == 5238) {
		staticImage = require('../assets/abilities/rattletrap_power_cogs_lg.png');
	} else if (id == 5239) {
		staticImage = require('../assets/abilities/rattletrap_rocket_flare_lg.png');
	} else if (id == 5240) {
		staticImage = require('../assets/abilities/rattletrap_hookshot_lg.png');
	} else if (id == 5241) {
		staticImage = require('../assets/abilities/leshrac_split_earth_lg.png');
	} else if (id == 5242) {
		staticImage = require('../assets/abilities/leshrac_diabolic_edict_lg.png');
	} else if (id == 5243) {
		staticImage = require('../assets/abilities/leshrac_lightning_storm_lg.png');
	} else if (id == 5244) {
		staticImage = require('../assets/abilities/leshrac_pulse_nova_lg.png');
	} else if (id == 5245) {
		staticImage = require('../assets/abilities/furion_sprout_lg.png');
	} else if (id == 5246) {
		staticImage = require('../assets/abilities/furion_teleportation_lg.png');
	} else if (id == 5247) {
		staticImage = require('../assets/abilities/furion_force_of_nature_lg.png');
	} else if (id == 5248) {
		staticImage = require('../assets/abilities/furion_wrath_of_nature_lg.png');
	} else if (id == 5249) {
		staticImage = require('../assets/abilities/life_stealer_rage_lg.png');
	} else if (id == 5250) {
		staticImage = require('../assets/abilities/life_stealer_feast_lg.png');
	} else if (id == 5251) {
		staticImage = require('../assets/abilities/life_stealer_open_wounds_lg.png');
	} else if (id == 5252) {
		staticImage = require('../assets/abilities/life_stealer_infest_lg.png');
	} else if (id == 5253) {
		staticImage = require('../assets/abilities/life_stealer_consume_lg.png');
	} else if (id == 5255) {
		staticImage = require('../assets/abilities/dark_seer_vacuum_lg.png');
	} else if (id == 5256) {
		staticImage = require('../assets/abilities/dark_seer_ion_shell_lg.png');
	} else if (id == 5257) {
		staticImage = require('../assets/abilities/dark_seer_surge_lg.png');
	} else if (id == 5258) {
		staticImage = require('../assets/abilities/dark_seer_wall_of_replica_lg.png');
	} else if (id == 5259) {
		staticImage = require('../assets/abilities/clinkz_strafe_lg.png');
	} else if (id == 5260) {
		staticImage = require('../assets/abilities/clinkz_searing_arrows_lg.png');
	} else if (id == 5261) {
		staticImage = require('../assets/abilities/clinkz_wind_walk_lg.png');
	} else if (id == 5262) {
		staticImage = require('../assets/abilities/clinkz_death_pact_lg.png');
	} else if (id == 5263) {
		staticImage = require('../assets/abilities/omniknight_purification_lg.png');
	} else if (id == 5264) {
		staticImage = require('../assets/abilities/omniknight_repel_lg.png');
	} else if (id == 5265) {
		staticImage = require('../assets/abilities/omniknight_degen_aura_lg.png');
	} else if (id == 5266) {
		staticImage = require('../assets/abilities/omniknight_guardian_angel_lg.png');
	} else if (id == 5267) {
		staticImage = require('../assets/abilities/enchantress_untouchable_lg.png');
	} else if (id == 5268) {
		staticImage = require('../assets/abilities/enchantress_enchant_lg.png');
	} else if (id == 5269) {
		staticImage = require('../assets/abilities/enchantress_natures_attendants_lg.png');
	} else if (id == 5270) {
		staticImage = require('../assets/abilities/enchantress_impetus_lg.png');
	} else if (id == 5271) {
		staticImage = require('../assets/abilities/huskar_inner_vitality_lg.png');
	} else if (id == 5272) {
		staticImage = require('../assets/abilities/huskar_burning_spear_lg.png');
	} else if (id == 5273) {
		staticImage = require('../assets/abilities/huskar_berserkers_blood_lg.png');
	} else if (id == 5274) {
		staticImage = require('../assets/abilities/huskar_life_break_lg.png');
	} else if (id == 5275) {
		staticImage = require('../assets/abilities/night_stalker_void_lg.png');
	} else if (id == 5276) {
		staticImage = require('../assets/abilities/night_stalker_crippling_fear_lg.png');
	} else if (id == 5277) {
		staticImage = require('../assets/abilities/night_stalker_hunter_in_the_night_lg.png');
	} else if (id == 5278) {
		staticImage = require('../assets/abilities/night_stalker_darkness_lg.png');
	} else if (id == 5279) {
		staticImage = require('../assets/abilities/broodmother_spawn_spiderlings_lg.png');
	} else if (id == 5280) {
		staticImage = require('../assets/abilities/broodmother_spin_web_lg.png');
	} else if (id == 5281) {
		staticImage = require('../assets/abilities/broodmother_incapacitating_bite_lg.png');
	} else if (id == 5282) {
		staticImage = require('../assets/abilities/broodmother_insatiable_hunger_lg.png');
	} else if (id == 5285) {
		staticImage = require('../assets/abilities/bounty_hunter_shuriken_toss_lg.png');
	} else if (id == 5286) {
		staticImage = require('../assets/abilities/bounty_hunter_jinada_lg.png');
	} else if (id == 5287) {
		staticImage = require('../assets/abilities/bounty_hunter_wind_walk_lg.png');
	} else if (id == 5288) {
		staticImage = require('../assets/abilities/bounty_hunter_track_lg.png');
	} else if (id == 5289) {
		staticImage = require('../assets/abilities/weaver_the_swarm_lg.png');
	} else if (id == 5290) {
		staticImage = require('../assets/abilities/weaver_shukuchi_lg.png');
	} else if (id == 5291) {
		staticImage = require('../assets/abilities/weaver_geminate_attack_lg.png');
	} else if (id == 5292) {
		staticImage = require('../assets/abilities/weaver_time_lapse_lg.png');
	} else if (id == 5295) {
		staticImage = require('../assets/abilities/centaur_khan_war_stomp_lg.png');
	} else if (id == 5297) {
		staticImage = require('../assets/abilities/jakiro_dual_breath_lg.png');
	} else if (id == 5298) {
		staticImage = require('../assets/abilities/jakiro_ice_path_lg.png');
	} else if (id == 5299) {
		staticImage = require('../assets/abilities/jakiro_liquid_fire_lg.png');
	} else if (id == 5300) {
		staticImage = require('../assets/abilities/jakiro_macropyre_lg.png');
	} else if (id == 5302) {
		staticImage = require('../assets/abilities/polar_furbolg_ursa_warrior_thunder_clap_lg.png');
	} else if (id == 5304) {
		staticImage = require('../assets/abilities/ogre_magi_frost_armor_lg.png');
	} else if (id == 5305) {
		staticImage = require('../assets/abilities/dark_troll_warlord_ensnare_lg.png');
	} else if (id == 5306) {
		staticImage = require('../assets/abilities/dark_troll_warlord_raise_dead_lg.png');
	} else if (id == 5312) {
		staticImage = require('../assets/abilities/enraged_wildkin_tornado_lg.png');
	} else if (id == 5314) {
		staticImage = require('../assets/abilities/satyr_trickster_purge_lg.png');
	} else if (id == 5315) {
		staticImage = require('../assets/abilities/satyr_soulstealer_mana_burn_lg.png');
	} else if (id == 5316) {
		staticImage = require('../assets/abilities/satyr_hellcaller_shockwave_lg.png');
	} else if (id == 5319) {
		staticImage = require('../assets/abilities/harpy_storm_chain_lightning_lg.png');
	} else if (id == 5320) {
		staticImage = require('../assets/abilities/batrider_sticky_napalm_lg.png');
	} else if (id == 5321) {
		staticImage = require('../assets/abilities/batrider_flamebreak_lg.png');
	} else if (id == 5322) {
		staticImage = require('../assets/abilities/batrider_firefly_lg.png');
	} else if (id == 5323) {
		staticImage = require('../assets/abilities/batrider_flaming_lasso_lg.png');
	} else if (id == 5328) {
		staticImage = require('../assets/abilities/chen_penitence_lg.png');
	} else if (id == 5329) {
		staticImage = require('../assets/abilities/chen_test_of_faith_lg.png');
	} else if (id == 5330) {
		staticImage = require('../assets/abilities/chen_holy_persuasion_lg.png');
	} else if (id == 5331) {
		staticImage = require('../assets/abilities/chen_hand_of_god_lg.png');
	} else if (id == 5334) {
		staticImage = require('../assets/abilities/spectre_spectral_dagger_lg.png');
	} else if (id == 5335) {
		staticImage = require('../assets/abilities/spectre_desolate_lg.png');
	} else if (id == 5336) {
		staticImage = require('../assets/abilities/spectre_dispersion_lg.png');
	} else if (id == 5337) {
		staticImage = require('../assets/abilities/spectre_haunt_lg.png');
	} else if (id == 5338) {
		staticImage = require('../assets/abilities/spectre_reality_lg.png');
	} else if (id == 5339) {
		staticImage = require('../assets/abilities/doom_bringer_devour_lg.png');
	} else if (id == 5340) {
		staticImage = require('../assets/abilities/doom_bringer_scorched_earth_lg.png');
	} else if (id == 5341) {
		staticImage = require('../assets/abilities/doom_bringer_infernal_blade_lg.png');
	} else if (id == 5342) {
		staticImage = require('../assets/abilities/doom_bringer_doom_lg.png');
	} else if (id == 5343) {
		staticImage = require('../assets/abilities/doom_bringer_empty1_lg.png');
	} else if (id == 5344) {
		staticImage = require('../assets/abilities/doom_bringer_empty2_lg.png');
	} else if (id == 5345) {
		staticImage = require('../assets/abilities/ancient_apparition_cold_feet_lg.png');
	} else if (id == 5346) {
		staticImage = require('../assets/abilities/ancient_apparition_ice_vortex_lg.png');
	} else if (id == 5347) {
		staticImage = require('../assets/abilities/ancient_apparition_chilling_touch_lg.png');
	} else if (id == 5348) {
		staticImage = require('../assets/abilities/ancient_apparition_ice_blast_lg.png');
	} else if (id == 5349) {
		staticImage = require('../assets/abilities/ancient_apparition_ice_blast_release_lg.png');
	} else if (id == 5352) {
		staticImage = require('../assets/abilities/beastmaster_greater_boar_poison_lg.png');
	} else if (id == 5353) {
		staticImage = require('../assets/abilities/spirit_breaker_charge_of_darkness_lg.png');
	} else if (id == 5354) {
		staticImage = require('../assets/abilities/spirit_breaker_empowering_haste_lg.png');
	} else if (id == 5355) {
		staticImage = require('../assets/abilities/spirit_breaker_greater_bash_lg.png');
	} else if (id == 5356) {
		staticImage = require('../assets/abilities/spirit_breaker_nether_strike_lg.png');
	} else if (id == 5357) {
		staticImage = require('../assets/abilities/ursa_earthshock_lg.png');
	} else if (id == 5358) {
		staticImage = require('../assets/abilities/ursa_overpower_lg.png');
	} else if (id == 5359) {
		staticImage = require('../assets/abilities/ursa_fury_swipes_lg.png');
	} else if (id == 5360) {
		staticImage = require('../assets/abilities/ursa_enrage_lg.png');
	} else if (id == 5361) {
		staticImage = require('../assets/abilities/gyrocopter_rocket_barrage_lg.png');
	} else if (id == 5362) {
		staticImage = require('../assets/abilities/gyrocopter_homing_missile_lg.png');
	} else if (id == 5363) {
		staticImage = require('../assets/abilities/gyrocopter_flak_cannon_lg.png');
	} else if (id == 5364) {
		staticImage = require('../assets/abilities/gyrocopter_call_down_lg.png');
	} else if (id == 5365) {
		staticImage = require('../assets/abilities/alchemist_acid_spray_lg.png');
	} else if (id == 5366) {
		staticImage = require('../assets/abilities/alchemist_unstable_concoction_lg.png');
	} else if (id == 5367) {
		staticImage = require('../assets/abilities/alchemist_unstable_concoction_throw_lg.png');
	} else if (id == 5368) {
		staticImage = require('../assets/abilities/alchemist_goblins_greed_lg.png');
	} else if (id == 5369) {
		staticImage = require('../assets/abilities/alchemist_chemical_rage_lg.png');
	} else if (id == 5370) {
		staticImage = require('../assets/abilities/invoker_quas_lg.png');
	} else if (id == 5371) {
		staticImage = require('../assets/abilities/invoker_wex_lg.png');
	} else if (id == 5372) {
		staticImage = require('../assets/abilities/invoker_exort_lg.png');
	} else if (id == 5373) {
		staticImage = require('../assets/abilities/invoker_empty1_lg.png');
	} else if (id == 5374) {
		staticImage = require('../assets/abilities/invoker_empty2_lg.png');
	} else if (id == 5375) {
		staticImage = require('../assets/abilities/invoker_invoke_lg.png');
	} else if (id == 5376) {
		staticImage = require('../assets/abilities/invoker_cold_snap_lg.png');
	} else if (id == 5377) {
		staticImage = require('../assets/abilities/silencer_curse_of_the_silent_lg.png');
	} else if (id == 5378) {
		staticImage = require('../assets/abilities/silencer_glaives_of_wisdom_lg.png');
	} else if (id == 5379) {
		staticImage = require('../assets/abilities/silencer_last_word_lg.png');
	} else if (id == 5380) {
		staticImage = require('../assets/abilities/silencer_global_silence_lg.png');
	} else if (id == 5381) {
		staticImage = require('../assets/abilities/invoker_ghost_walk_lg.png');
	} else if (id == 5382) {
		staticImage = require('../assets/abilities/invoker_tornado_lg.png');
	} else if (id == 5383) {
		staticImage = require('../assets/abilities/invoker_emp_lg.png');
	} else if (id == 5384) {
		staticImage = require('../assets/abilities/invoker_alacrity_lg.png');
	} else if (id == 5385) {
		staticImage = require('../assets/abilities/invoker_chaos_meteor_lg.png');
	} else if (id == 5386) {
		staticImage = require('../assets/abilities/invoker_sun_strike_lg.png');
	} else if (id == 5387) {
		staticImage = require('../assets/abilities/invoker_forge_spirit_lg.png');
	} else if (id == 5389) {
		staticImage = require('../assets/abilities/invoker_ice_wall_lg.png');
	} else if (id == 5390) {
		staticImage = require('../assets/abilities/invoker_deafening_blast_lg.png');
	} else if (id == 5391) {
		staticImage = require('../assets/abilities/obsidian_destroyer_arcane_orb_lg.png');
	} else if (id == 5392) {
		staticImage = require('../assets/abilities/obsidian_destroyer_astral_imprisonment_lg.png');
	} else if (id == 5393) {
		staticImage = require('../assets/abilities/obsidian_destroyer_essence_aura_lg.png');
	} else if (id == 5394) {
		staticImage = require('../assets/abilities/obsidian_destroyer_sanity_eclipse_lg.png');
	} else if (id == 5395) {
		staticImage = require('../assets/abilities/lycan_summon_wolves_lg.png');
	} else if (id == 5396) {
		staticImage = require('../assets/abilities/lycan_howl_lg.png');
	} else if (id == 5397) {
		staticImage = require('../assets/abilities/lycan_feral_impulse_lg.png');
	} else if (id == 5398) {
		staticImage = require('../assets/abilities/lycan_shapeshift_lg.png');
	} else if (id == 5400) {
		staticImage = require('../assets/abilities/brewmaster_thunder_clap_lg.png');
	} else if (id == 5401) {
		staticImage = require('../assets/abilities/brewmaster_drunken_haze_lg.png');
	} else if (id == 5402) {
		staticImage = require('../assets/abilities/brewmaster_drunken_brawler_lg.png');
	} else if (id == 5403) {
		staticImage = require('../assets/abilities/brewmaster_primal_split_lg.png');
	} else if (id == 5404) {
		staticImage = require('../assets/abilities/brewmaster_earth_hurl_boulder_lg.png');
	} else if (id == 5405) {
		staticImage = require('../assets/abilities/brewmaster_earth_spell_immunity_lg.png');
	} else if (id == 5406) {
		staticImage = require('../assets/abilities/brewmaster_earth_pulverize_lg.png');
	} else if (id == 5408) {
		staticImage = require('../assets/abilities/brewmaster_storm_dispel_magic_lg.png');
	} else if (id == 5409) {
		staticImage = require('../assets/abilities/brewmaster_storm_cyclone_lg.png');
	} else if (id == 5410) {
		staticImage = require('../assets/abilities/brewmaster_storm_wind_walk_lg.png');
	} else if (id == 5411) {
		staticImage = require('../assets/abilities/brewmaster_fire_permanent_immolation_lg.png');
	} else if (id == 5412) {
		staticImage = require('../assets/abilities/lone_druid_spirit_bear_lg.png');
	} else if (id == 5413) {
		staticImage = require('../assets/abilities/lone_druid_rabid_lg.png');
	} else if (id == 5414) {
		staticImage = require('../assets/abilities/lone_druid_savage_roar_lg.png');
	} else if (id == 5415) {
		staticImage = require('../assets/abilities/lone_druid_true_form_lg.png');
	} else if (id == 5416) {
		staticImage = require('../assets/abilities/lone_druid_true_form_druid_lg.png');
	} else if (id == 5417) {
		staticImage = require('../assets/abilities/lone_druid_true_form_battle_cry_lg.png');
	} else if (id == 5418) {
		staticImage = require('../assets/abilities/lone_druid_spirit_bear_return_lg.png');
	} else if (id == 5419) {
		staticImage = require('../assets/abilities/lone_druid_spirit_bear_entangle_lg.png');
	} else if (id == 5420) {
		staticImage = require('../assets/abilities/lone_druid_spirit_bear_demolish_lg.png');
	} else if (id == 5421) {
		staticImage = require('../assets/abilities/shadow_demon_disruption_lg.png');
	} else if (id == 5422) {
		staticImage = require('../assets/abilities/shadow_demon_soul_catcher_lg.png');
	} else if (id == 5423) {
		staticImage = require('../assets/abilities/shadow_demon_shadow_poison_lg.png');
	} else if (id == 5424) {
		staticImage = require('../assets/abilities/shadow_demon_shadow_poison_release_lg.png');
	} else if (id == 5425) {
		staticImage = require('../assets/abilities/shadow_demon_demonic_purge_lg.png');
	} else if (id == 5426) {
		staticImage = require('../assets/abilities/chaos_knight_chaos_bolt_lg.png');
	} else if (id == 5427) {
		staticImage = require('../assets/abilities/chaos_knight_reality_rift_lg.png');
	} else if (id == 5428) {
		staticImage = require('../assets/abilities/chaos_knight_chaos_strike_lg.png');
	} else if (id == 5429) {
		staticImage = require('../assets/abilities/chaos_knight_phantasm_lg.png');
	} else if (id == 5430) {
		staticImage = require('../assets/abilities/meepo_earthbind_lg.png');
	} else if (id == 5431) {
		staticImage = require('../assets/abilities/meepo_poof_lg.png');
	} else if (id == 5432) {
		staticImage = require('../assets/abilities/meepo_geostrike_lg.png');
	} else if (id == 5433) {
		staticImage = require('../assets/abilities/meepo_divided_we_stand_lg.png');
	} else if (id == 5434) {
		staticImage = require('../assets/abilities/treant_natures_guise_lg.png');
	} else if (id == 5435) {
		staticImage = require('../assets/abilities/treant_leech_seed_lg.png');
	} else if (id == 5436) {
		staticImage = require('../assets/abilities/treant_living_armor_lg.png');
	} else if (id == 5437) {
		staticImage = require('../assets/abilities/treant_overgrowth_lg.png');
	} else if (id == 5438) {
		staticImage = require('../assets/abilities/ogre_magi_fireblast_lg.png');
	} else if (id == 5439) {
		staticImage = require('../assets/abilities/ogre_magi_ignite_lg.png');
	} else if (id == 5440) {
		staticImage = require('../assets/abilities/ogre_magi_bloodlust_lg.png');
	} else if (id == 5441) {
		staticImage = require('../assets/abilities/ogre_magi_multicast_lg.png');
	} else if (id == 5442) {
		staticImage = require('../assets/abilities/undying_decay_lg.png');
	} else if (id == 5443) {
		staticImage = require('../assets/abilities/undying_soul_rip_lg.png');
	} else if (id == 5444) {
		staticImage = require('../assets/abilities/undying_tombstone_lg.png');
	} else if (id == 5447) {
		staticImage = require('../assets/abilities/undying_flesh_golem_lg.png');
	} else if (id == 5448) {
		staticImage = require('../assets/abilities/rubick_telekinesis_lg.png');
	} else if (id == 5449) {
		staticImage = require('../assets/abilities/rubick_telekinesis_land_lg.png');
	} else if (id == 5450) {
		staticImage = require('../assets/abilities/rubick_fade_bolt_lg.png');
	} else if (id == 5451) {
		staticImage = require('../assets/abilities/rubick_null_field_lg.png');
	} else if (id == 5452) {
		staticImage = require('../assets/abilities/rubick_spell_steal_lg.png');
	} else if (id == 5453) {
		staticImage = require('../assets/abilities/rubick_empty1_lg.png');
	} else if (id == 5454) {
		staticImage = require('../assets/abilities/rubick_empty2_lg.png');
	} else if (id == 5458) {
		staticImage = require('../assets/abilities/disruptor_thunder_strike_lg.png');
	} else if (id == 5459) {
		staticImage = require('../assets/abilities/disruptor_glimpse_lg.png');
	} else if (id == 5460) {
		staticImage = require('../assets/abilities/disruptor_kinetic_field_lg.png');
	} else if (id == 5461) {
		staticImage = require('../assets/abilities/disruptor_static_storm_lg.png');
	} else if (id == 5462) {
		staticImage = require('../assets/abilities/nyx_assassin_impale_lg.png');
	} else if (id == 5463) {
		staticImage = require('../assets/abilities/nyx_assassin_mana_burn_lg.png');
	} else if (id == 5464) {
		staticImage = require('../assets/abilities/nyx_assassin_spiked_carapace_lg.png');
	} else if (id == 5465) {
		staticImage = require('../assets/abilities/nyx_assassin_vendetta_lg.png');
	} else if (id == 5466) {
		staticImage = require('../assets/abilities/ogre_magi_unrefined_fireblast_lg.png');
	} else if (id == 5467) {
		staticImage = require('../assets/abilities/naga_siren_mirror_image_lg.png');
	} else if (id == 5468) {
		staticImage = require('../assets/abilities/naga_siren_ensnare_lg.png');
	} else if (id == 5469) {
		staticImage = require('../assets/abilities/naga_siren_rip_tide_lg.png');
	} else if (id == 5470) {
		staticImage = require('../assets/abilities/naga_siren_song_of_the_siren_lg.png');
	} else if (id == 5471) {
		staticImage = require('../assets/abilities/keeper_of_the_light_illuminate_lg.png');
	} else if (id == 5472) {
		staticImage = require('../assets/abilities/keeper_of_the_light_mana_leak_lg.png');
	} else if (id == 5473) {
		staticImage = require('../assets/abilities/keeper_of_the_light_chakra_magic_lg.png');
	} else if (id == 5474) {
		staticImage = require('../assets/abilities/keeper_of_the_light_spirit_form_lg.png');
	} else if (id == 5475) {
		staticImage = require('../assets/abilities/keeper_of_the_light_recall_lg.png');
	} else if (id == 5476) {
		staticImage = require('../assets/abilities/keeper_of_the_light_blinding_light_lg.png');
	} else if (id == 5477) {
		staticImage = require('../assets/abilities/keeper_of_the_light_illuminate_end_lg.png');
	} else if (id == 5478) {
		staticImage = require('../assets/abilities/naga_siren_song_of_the_siren_cancel_lg.png');
	} else if (id == 5479) {
		staticImage = require('../assets/abilities/keeper_of_the_light_spirit_form_illuminate_lg.png');
	} else if (id == 5480) {
		staticImage = require('../assets/abilities/visage_grave_chill_lg.png');
	} else if (id == 5481) {
		staticImage = require('../assets/abilities/visage_soul_assumption_lg.png');
	} else if (id == 5482) {
		staticImage = require('../assets/abilities/visage_gravekeepers_cloak_lg.png');
	} else if (id == 5483) {
		staticImage = require('../assets/abilities/visage_summon_familiars_lg.png');
	} else if (id == 5484) {
		staticImage = require('../assets/abilities/visage_summon_familiars_stone_form_lg.png');
	} else if (id == 5485) {
		staticImage = require('../assets/abilities/wisp_tether_lg.png');
	} else if (id == 5486) {
		staticImage = require('../assets/abilities/wisp_spirits_lg.png');
	} else if (id == 5487) {
		staticImage = require('../assets/abilities/wisp_overcharge_lg.png');
	} else if (id == 5488) {
		staticImage = require('../assets/abilities/wisp_relocate_lg.png');
	} else if (id == 5489) {
		staticImage = require('../assets/abilities/wisp_tether_break_lg.png');
	} else if (id == 5490) {
		staticImage = require('../assets/abilities/wisp_spirits_in_lg.png');
	} else if (id == 5493) {
		staticImage = require('../assets/abilities/wisp_spirits_out_lg.png');
	} else if (id == 5494) {
		staticImage = require('../assets/abilities/slark_dark_pact_lg.png');
	} else if (id == 5495) {
		staticImage = require('../assets/abilities/slark_pounce_lg.png');
	} else if (id == 5496) {
		staticImage = require('../assets/abilities/slark_essence_shift_lg.png');
	} else if (id == 5497) {
		staticImage = require('../assets/abilities/slark_shadow_dance_lg.png');
	} else if (id == 5503) {
		staticImage = require('../assets/abilities/keeper_of_the_light_spirit_form_illuminate_end_lg.png');
	} else if (id == 5504) {
		staticImage = require('../assets/abilities/medusa_split_shot_lg.png');
	} else if (id == 5505) {
		staticImage = require('../assets/abilities/medusa_mystic_snake_lg.png');
	} else if (id == 5506) {
		staticImage = require('../assets/abilities/medusa_mana_shield_lg.png');
	} else if (id == 5507) {
		staticImage = require('../assets/abilities/medusa_stone_gaze_lg.png');
	} else if (id == 5508) {
		staticImage = require('../assets/abilities/troll_warlord_berserkers_rage_lg.png');
	} else if (id == 5509) {
		staticImage = require('../assets/abilities/troll_warlord_whirling_axes_ranged_lg.png');
	} else if (id == 5510) {
		staticImage = require('../assets/abilities/troll_warlord_whirling_axes_melee_lg.png');
	} else if (id == 5511) {
		staticImage = require('../assets/abilities/troll_warlord_fervor_lg.png');
	} else if (id == 5512) {
		staticImage = require('../assets/abilities/troll_warlord_battle_trance_lg.png');
	} else if (id == 5514) {
		staticImage = require('../assets/abilities/centaur_hoof_stomp_lg.png');
	} else if (id == 5515) {
		staticImage = require('../assets/abilities/centaur_double_edge_lg.png');
	} else if (id == 5516) {
		staticImage = require('../assets/abilities/centaur_return_lg.png');
	} else if (id == 5517) {
		staticImage = require('../assets/abilities/centaur_stampede_lg.png');
	} else if (id == 5518) {
		staticImage = require('../assets/abilities/magnataur_shockwave_lg.png');
	} else if (id == 5519) {
		staticImage = require('../assets/abilities/magnataur_empower_lg.png');
	} else if (id == 5520) {
		staticImage = require('../assets/abilities/magnataur_skewer_lg.png');
	} else if (id == 5521) {
		staticImage = require('../assets/abilities/magnataur_reverse_polarity_lg.png');
	} else if (id == 5522) {
		staticImage = require('../assets/abilities/chen_test_of_faith_teleport_lg.png');
	} else if (id == 5523) {
		staticImage = require('../assets/abilities/bane_nightmare_end_lg.png');
	} else if (id == 5524) {
		staticImage = require('../assets/abilities/shredder_whirling_death_lg.png');
	} else if (id == 5525) {
		staticImage = require('../assets/abilities/shredder_timber_chain_lg.png');
	} else if (id == 5526) {
		staticImage = require('../assets/abilities/shredder_reactive_armor_lg.png');
	} else if (id == 5527) {
		staticImage = require('../assets/abilities/shredder_chakram_lg.png');
	} else if (id == 5528) {
		staticImage = require('../assets/abilities/shredder_return_chakram_lg.png');
	} else if (id == 5548) {
		staticImage = require('../assets/abilities/bristleback_viscous_nasal_goo_lg.png');
	} else if (id == 5549) {
		staticImage = require('../assets/abilities/bristleback_quill_spray_lg.png');
	} else if (id == 5550) {
		staticImage = require('../assets/abilities/bristleback_bristleback_lg.png');
	} else if (id == 5551) {
		staticImage = require('../assets/abilities/bristleback_warpath_lg.png');
    } else if (id == 5565) {
		staticImage = require('../assets/abilities/tusk_ice_shards_lg.png');
	} else if (id == 5566) {
		staticImage = require('../assets/abilities/tusk_snowball_lg.png');
	} else if (id == 5567) {
		staticImage = require('../assets/abilities/tusk_frozen_sigil_lg.png');
	} else if (id == 5568) {
		staticImage = require('../assets/abilities/tusk_walrus_punch_lg.png');
	} else if (id == 5580) {
		staticImage = require('../assets/abilities/beastmaster_call_of_the_wild_boar_lg.png');
	} else if (id == 5581) {
		staticImage = require('../assets/abilities/skywrath_mage_arcane_bolt_lg.png');
	} else if (id == 5582) {
		staticImage = require('../assets/abilities/skywrath_mage_concussive_shot_lg.png');
	} else if (id == 5583) {
		staticImage = require('../assets/abilities/skywrath_mage_ancient_seal_lg.png');
	} else if (id == 5584) {
		staticImage = require('../assets/abilities/skywrath_mage_mystic_flare_lg.png');
	} else if (id == 5585) {
		staticImage = require('../assets/abilities/abaddon_death_coil_lg.png');
	} else if (id == 5586) {
		staticImage = require('../assets/abilities/abaddon_aphotic_shield_lg.png');
	} else if (id == 5587) {
		staticImage = require('../assets/abilities/abaddon_frostmourne_lg.png');
	} else if (id == 5588) {
		staticImage = require('../assets/abilities/abaddon_borrowed_time_lg.png');
	} else if (id == 5589) {
		staticImage = require('../assets/abilities/elder_titan_echo_stomp_lg.png');
	} else if (id == 5591) {
		staticImage = require('../assets/abilities/elder_titan_ancestral_spirit_lg.png');
	} else if (id == 5592) {
		staticImage = require('../assets/abilities/elder_titan_return_spirit_lg.png');
	} else if (id == 5593) {
		staticImage = require('../assets/abilities/elder_titan_natural_order_lg.png');
	} else if (id == 5594) {
		staticImage = require('../assets/abilities/elder_titan_earth_splitter_lg.png');
	} else if (id == 5595) {
		staticImage = require('../assets/abilities/legion_commander_overwhelming_odds_lg.png');
	} else if (id == 5596) {
		staticImage = require('../assets/abilities/legion_commander_press_the_attack_lg.png');
	} else if (id == 5597) {
		staticImage = require('../assets/abilities/legion_commander_moment_of_courage_lg.png');
	} else if (id == 5598) {
		staticImage = require('../assets/abilities/legion_commander_duel_lg.png');
	} else if (id == 5599) {
		staticImage = require('../assets/abilities/techies_land_mines_lg.png');
	} else if (id == 5600) {
		staticImage = require('../assets/abilities/techies_stasis_trap_lg.png');
	} else if (id == 5601) {
		staticImage = require('../assets/abilities/techies_suicide_lg.png');
	} else if (id == 5602) {
		staticImage = require('../assets/abilities/techies_remote_mines_lg.png');
	} else if (id == 5603) {
		staticImage = require('../assets/abilities/ember_spirit_searing_chains_lg.png');
	} else if (id == 5604) {
		staticImage = require('../assets/abilities/ember_spirit_sleight_of_fist_lg.png');
	} else if (id == 5605) {
		staticImage = require('../assets/abilities/ember_spirit_flame_guard_lg.png');
	} else if (id == 5606) {
		staticImage = require('../assets/abilities/ember_spirit_fire_remnant_lg.png');
	} else if (id == 5607) {
		staticImage = require('../assets/abilities/ember_spirit_activate_fire_remnant_lg.png');
	} else if (id == 5608) {
		staticImage = require('../assets/abilities/earth_spirit_boulder_smash_lg.png');
	} else if (id == 5609) {
		staticImage = require('../assets/abilities/earth_spirit_rolling_boulder_lg.png');
	} else if (id == 5610) {
		staticImage = require('../assets/abilities/earth_spirit_geomagnetic_grip_lg.png');
	} else if (id == 5611) {
		staticImage = require('../assets/abilities/earth_spirit_stone_caller_lg.png');
	} else if (id == 5612) {
		staticImage = require('../assets/abilities/earth_spirit_magnetize_lg.png');
	} else if (id == 5613) {
		staticImage = require('../assets/abilities/abyssal_underlord_firestorm_lg.png');
	} else if (id == 5614) {
		staticImage = require('../assets/abilities/abyssal_underlord_pit_of_malice_lg.png');
	} else if (id == 5615) {
		staticImage = require('../assets/abilities/abyssal_underlord_atrophy_aura_lg.png');
	} else if (id == 5616) {
		staticImage = require('../assets/abilities/abyssal_underlord_dark_rift_lg.png');
	} else if (id == 5617) {
		staticImage = require('../assets/abilities/abyssal_underlord_cancel_dark_rift_lg.png');
	} else if (id == 5619) {
		staticImage = require('../assets/abilities/terrorblade_reflection_lg.png');
	} else if (id == 5620) {
		staticImage = require('../assets/abilities/terrorblade_conjure_image_lg.png');
	} else if (id == 5621) {
		staticImage = require('../assets/abilities/terrorblade_metamorphosis_lg.png');
	} else if (id == 5622) {
		staticImage = require('../assets/abilities/terrorblade_sunder_lg.png');
	} else if (id == 5623) {
		staticImage = require('../assets/abilities/phoenix_icarus_dive_lg.png');
	} else if (id == 5624) {
		staticImage = require('../assets/abilities/phoenix_icarus_dive_stop_lg.png');
	} else if (id == 5625) {
		staticImage = require('../assets/abilities/phoenix_fire_spirits_lg.png');
	} else if (id == 5626) {
		staticImage = require('../assets/abilities/phoenix_sun_ray_lg.png');
	} else if (id == 5627) {
		staticImage = require('../assets/abilities/phoenix_sun_ray_stop_lg.png');
	} else if (id == 5628) {
		staticImage = require('../assets/abilities/phoenix_sun_ray_toggle_move_lg.png');
	} else if (id == 5630) {
		staticImage = require('../assets/abilities/phoenix_supernova_lg.png');
	} else if (id == 5631) {
		staticImage = require('../assets/abilities/phoenix_launch_fire_spirit_lg.png');
	} else if (id == 5632) {
		staticImage = require('../assets/abilities/drow_ranger_wave_of_silence_lg.png');
	} else if (id == 5635) {
		staticImage = require('../assets/abilities/techies_focused_detonate_lg.png');
	} else if (id == 5637) {
		staticImage = require('../assets/abilities/oracle_fortunes_end_lg.png');
	} else if (id == 5638) {
		staticImage = require('../assets/abilities/oracle_fates_edict_lg.png');
	} else if (id == 5639) {
		staticImage = require('../assets/abilities/oracle_purifying_flames_lg.png');
	} else if (id == 5640) {
		staticImage = require('../assets/abilities/oracle_false_promise_lg.png');
	} else if (id == 5641) {
		staticImage = require('../assets/abilities/tusk_launch_snowball_lg.png');
	} else if (id == 5644) {
		staticImage = require('../assets/abilities/techies_minefield_sign_lg.png');
	} else if (id == 5645) {
		staticImage = require('../assets/abilities/shredder_chakram_2_lg.png');
	} else if (id == 5646) {
		staticImage = require('../assets/abilities/shredder_return_chakram_2_lg.png');
	} else if (id == 5648) {
		staticImage = require('../assets/abilities/earth_spirit_petrify_lg.png');
	} else if (id == 5649) {
		staticImage = require('../assets/abilities/treant_eyes_in_the_forest_lg.png');
	} else if (id == 5651) {
		staticImage = require('../assets/abilities/winter_wyvern_arctic_burn_lg.png');
	} else if (id == 5652) {
		staticImage = require('../assets/abilities/winter_wyvern_splinter_blast_lg.png');
	} else if (id == 5653) {
		staticImage = require('../assets/abilities/winter_wyvern_cold_embrace_lg.png');
	} else if (id == 5654) {
		staticImage = require('../assets/abilities/winter_wyvern_winters_curse_lg.png');
	} else if (id == 5655) {
		staticImage = require('../assets/abilities/life_stealer_control_lg.png');
	} else if (id == 5666) {
		staticImage = require('../assets/abilities/nyx_assassin_burrow_lg.png');
	} else if (id == 5670) {
		staticImage = require('../assets/abilities/mud_golem_hurl_boulder_lg.png');
	} else if (id == 5671) {
		staticImage = require('../assets/abilities/life_stealer_assimilate_lg.png');
	} else if (id == 5672) {
		staticImage = require('../assets/abilities/tusk_walrus_kick_lg.png');
	} else if (id == 5673) {
		staticImage = require('../assets/abilities/nyx_assassin_unburrow_lg.png');
	} else if (id == 5674) {
		staticImage = require('../assets/abilities/morphling_hybrid_lg.png');
	} else if (id == 5675) {
		staticImage = require('../assets/abilities/life_stealer_assimilate_eject_lg.png');
	} else if (id == 5677) {
		staticImage = require('../assets/abilities/arc_warden_flux_lg.png');
	} else if (id == 5678) {
		staticImage = require('../assets/abilities/arc_warden_magnetic_field_lg.png');
	} else if (id == 5679) {
		staticImage = require('../assets/abilities/arc_warden_spark_wraith_lg.png');
	} else if (id == 5683) {
		staticImage = require('../assets/abilities/arc_warden_tempest_double_lg.png');
	} else if (id == 5685) {
		staticImage = require('../assets/abilities/death_prophet_spirit_siphon_lg.png');
	} else if (id == 5687) {
		staticImage = require('../assets/abilities/lone_druid_savage_roar_lg.png');
	} else if (id == 5689) {
		staticImage = require('../assets/abilities/black_dragon_fireball_lg.png');
	} else if (id == 5691) {
		staticImage = require('../assets/abilities/faceless_void_time_dilation_lg.png');
	} else if (id == 5716) {
		staticImage = require('../assets/abilities/monkey_king_boundless_strike_lg.png');
	} else if (id == 5719) {
		staticImage = require('../assets/abilities/monkey_king_mischief_lg.png');
	} else if (id == 5721) {
		staticImage = require('../assets/abilities/monkey_king_tree_dance_lg.png');
	} else if (id == 5722) {
		staticImage = require('../assets/abilities/monkey_king_untransform_lg.png');
	} else if (id == 5723) {
		staticImage = require('../assets/abilities/monkey_king_jingu_mastery_lg.png');
	} else if (id == 5724) {
		staticImage = require('../assets/abilities/monkey_king_primal_spring_lg.png');
	} else if (id == 5725) {
		staticImage = require('../assets/abilities/monkey_king_wukongs_command_lg.png');
	} else if (id == 5900) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5901) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5902) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5903) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5904) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5905) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5906) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5907) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5908) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5909) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5910) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5911) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5912) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5913) {
		staticImage = require('../assets/talent_tree.png');
	} else if (id == 5914) {
		staticImage = require('../assets/talent_tree.png');
	} else {
        staticImage = require('../assets/no-item.png');
    }
    return staticImage;
}
