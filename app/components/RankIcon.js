import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';

const styles = StyleSheet.create({
    rankContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankIconContainer: {
        width: 64,
        height: 64,
    },
    rankIcon: {
        width: 64,
        height: 64,
        position: 'absolute',
    },
    leaderboardRankText: {
        color: 'white',
        marginTop: -10,
    },
});

export default RankIcon = ({rankTier, leaderboardRank}) =>  {
  console.log('^^^', rankTier, leaderboardRank)
  const rankIcons = {
    '0': require('../assets/rank_icons/rank_icon_0.png'),
    '1': require('../assets/rank_icons/rank_icon_1.png'),
    '2': require('../assets/rank_icons/rank_icon_2.png'),
    '3': require('../assets/rank_icons/rank_icon_3.png'),
    '4': require('../assets/rank_icons/rank_icon_4.png'),
    '5': require('../assets/rank_icons/rank_icon_5.png'),
    '6': require('../assets/rank_icons/rank_icon_6.png'),
    '7a': require('../assets/rank_icons/rank_icon_7a.png'),
    '7b': require('../assets/rank_icons/rank_icon_7b.png'),
    '7c': require('../assets/rank_icons/rank_icon_7c.png'),
  };

  const starIcons = {
    '1': require('../assets/rank_icons/rank_star_1.png'),
    '2': require('../assets/rank_icons/rank_star_2.png'),
    '3': require('../assets/rank_icons/rank_star_3.png'),
    '4': require('../assets/rank_icons/rank_star_4.png'),
    '5': require('../assets/rank_icons/rank_star_5.png'),
  };

  if (!rankTier) return null;
  let rank, star;
  if (rankTier > 9) {
    if (leaderboardRank) {
      if (leaderboardRank <= 10) {
        rank = '7c'; // Divine Top 10
      } else if (leaderboardRank <= 100) {
        rank = '7b'; // Divine Top 100
      }
    }
    if (rankTier === 76 || (rankTier === 75 && leaderboardRank !== null)) {
      rank = rank || '7a'; // Divine Elite
    } else {
      const intRankTier = parseInt(rankTier, 10);
      const intStar = parseInt(intRankTier % 10, 10);
      if (!rank) {
        if (intStar <= 0) {
          star = 0;
        } else if (intStar >= 5) {
          star = 5;
        } else {
          star = intStar;
        }
      }
      console.log('^^^ B4', rank)
      rank = rank || parseInt(intRankTier / 10, 10);
      console.log('^^^ AFTA', rank)
    }
  } else {
    rank = '0';
  }

  return (
    <View style = {styles.rankContainer}>
      <View style={styles.rankIconContainer}>
        {(star > 0) ? <Image style={styles.rankIcon} source={starIcons[star]}/> : null}
        <Image style={styles.rankIcon} source={rankIcons[rank]}/>
      </View>
      {leaderboardRank ? <Text style={styles.leaderboardRankText}>{leaderboardRank1}</Text> : null}
    </View>
  );
}
