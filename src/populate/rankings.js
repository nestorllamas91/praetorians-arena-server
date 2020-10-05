import moment from 'moment';

import Ranking from '$root/models/ranking';

const start2019Q4 = moment('2019-10-01T00:00:00.000+00:00').valueOf();
const end2019Q4 = moment('2019-12-31T23:59:59.999+00:00').valueOf();
const start2020Q1 = moment('2020-01-01T00:00:00.000+00:00').valueOf();
const end2020Q1 = moment('2020-03-31T23:59:59.999+00:00').valueOf();
const start2020Q2 = moment('2020-04-01T00:00:00.000+00:00').valueOf();
const end2020Q2 = moment('2020-06-30T23:59:59.999+00:00').valueOf();

export const ranking1 = new Ranking({
  rankingID: 1,
  state: 'closed',
  startDate: start2019Q4,
  endDate: end2019Q4,
  year: 2019,
  quarter: 4,
  season: '2019-q4',
  competition: 'dueling-3vs3',
  numPlayersPerGame: 6,
  data: [
    {
      rank: 1,
      team: {
        name: 'Team1',
        players: [
          { steamId: '', steamNickname: 'Player1', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player2', enrollmentState: 'accepted' }
        ]
      },
      points: 1193,
      victories: 15,
      defeats: 4,
      enrollmentState: 'accepted'
    },
    {
      rank: 2,
      team: {
        name: 'Team2',
        players: [
          { steamId: '', steamNickname: 'Player3', enrollmentState: 'accepted' },
          { steamId: '76561199065302814', steamNickname: 'Néstor', enrollmentState: 'accepted' }
        ]
      },
      points: 1002,
      victories: 12,
      defeats: 6,
      enrollmentState: 'accepted'
    },
    {
      rank: 3,
      team: {
        name: 'Team3',
        players: [
          { steamId: '', steamNickname: 'Player5', enrollmentState: 'accepted' },
          { steamId: '76561199018949622', steamNickname: 'playerguest4', enrollmentState: 'accepted' }
        ]
      },
      points: 742,
      victories: 8,
      defeats: 5,
      enrollmentState: 'accepted'
    }
  ]
});
export const ranking2 = new Ranking({
  rankingID: 2,
  state: 'closed',
  startDate: start2019Q4,
  endDate: end2019Q4,
  year: 2019,
  quarter: 4,
  season: '2019-q4',
  competition: 'scoring-xvsx',
  numPlayersPerGame: 0,
  data: [
    {
      rank: 1,
      team: {
        name: 'Player35',
        players: [{ steamId: '', steamNickname: 'Player35', enrollmentState: 'accepted' }]
      },
      points: 1368,
      victories: 13,
      defeats: 5,
      enrollmentState: 'accepted'
    },
    {
      rank: 2,
      team: {
        name: 'Néstor',
        players: [{ steamId: '76561199065302814', steamNickname: 'Néstor', enrollmentState: 'accepted' }]
      },
      points: 993,
      victories: 10,
      defeats: 6,
      enrollmentState: 'accepted'
    },
    {
      rank: 3,
      team: {
        name: 'Player37',
        players: [{ steamId: '', steamNickname: 'Player37', enrollmentState: 'accepted' }]
      },
      points: 515,
      victories: 6,
      defeats: 3,
      enrollmentState: 'accepted'
    },
    {
      rank: 4,
      team: {
        name: 'playerguest4',
        players: [{ steamId: '76561199018949622', steamNickname: 'playerguest4', enrollmentState: 'accepted' }]
      },
      points: 272,
      victories: 4,
      defeats: 3,
      enrollmentState: 'accepted'
    }
  ]
});
export const ranking3 = new Ranking({
  rankingID: 3,
  state: 'closed',
  startDate: start2019Q4,
  endDate: end2019Q4,
  year: 2019,
  quarter: 4,
  season: '2019-q4',
  competition: 'tournament-3vs3',
  numPlayersPerGame: 6,
  data: [
    {
      rank: 1,
      team: {
        name: 'Team8',
        players: [
          { steamId: '', steamNickname: 'Player19', enrollmentState: 'accepted' },
          { steamId: '76561199018949622', steamNickname: 'playerguest4', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player21', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player22', enrollmentState: 'accepted' }
        ]
      },
      points: 1461,
      victories: 13,
      defeats: 4,
      enrollmentState: 'accepted'
    },
    {
      rank: 2,
      team: {
        name: 'Team9',
        players: [
          { steamId: '', steamNickname: 'Player23', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player24', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player25', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player26', enrollmentState: 'accepted' }
        ]
      },
      points: 1392,
      victories: 10,
      defeats: 5,
      enrollmentState: 'accepted'
    },
    {
      rank: 3,
      team: {
        name: 'Team10',
        players: [
          { steamId: '', steamNickname: 'Player27', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player28', enrollmentState: 'accepted' },
          { steamId: '76561199065302814', steamNickname: 'Néstor', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player30', enrollmentState: 'accepted' }
        ]
      },
      points: 1048,
      victories: 8,
      defeats: 4,
      enrollmentState: 'accepted'
    },
    {
      rank: 4,
      team: {
        name: 'Team11',
        players: [
          { steamId: '', steamNickname: 'Player31', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player32', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player33', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player34', enrollmentState: 'accepted' }
        ]
      },
      points: 834,
      victories: 6,
      defeats: 3,
      enrollmentState: 'accepted'
    }
  ]
});
export const ranking4 = new Ranking({
  rankingID: 4,
  state: 'playing',
  startDate: start2020Q1,
  endDate: end2020Q1,
  year: 2020,
  quarter: 1,
  season: '2020-q1',
  competition: 'dueling-1vs1',
  numPlayersPerGame: 2,
  data: [
    {
      rank: 1,
      team: {
        name: 'playerguest4',
        players: [{ steamId: '76561199018949622', steamNickname: 'playerguest4', enrollmentState: 'accepted' }]
      },
      points: 1368,
      victories: 13,
      defeats: 5,
      enrollmentState: 'accepted'
    },
    {
      rank: 2,
      team: {
        name: 'Player40',
        players: [{ steamId: '', steamNickname: 'Player40', enrollmentState: 'accepted' }]
      },
      points: 993,
      victories: 10,
      defeats: 6,
      enrollmentState: 'accepted'
    },
    {
      rank: 3,
      team: {
        name: 'Player41',
        players: [{ steamId: '', steamNickname: 'Player41', enrollmentState: 'accepted' }]
      },
      points: 515,
      victories: 6,
      defeats: 3,
      enrollmentState: 'accepted'
    },
    {
      rank: 4,
      team: {
        name: 'Néstor',
        players: [{ steamId: '76561199065302814', steamNickname: 'Néstor', enrollmentState: 'accepted' }]
      },
      points: 272,
      victories: 4,
      defeats: 3,
      enrollmentState: 'accepted'
    }
  ]
});
export const ranking5 = new Ranking({
  rankingID: 5,
  state: 'playing',
  startDate: start2020Q1,
  endDate: end2020Q1,
  year: 2020,
  quarter: 1,
  season: '2020-q1',
  competition: 'scoring-xvsx',
  numPlayersPerGame: 0,
  data: [
    {
      rank: 1,
      team: {
        name: 'Team28',
        players: [
          { steamId: '', steamNickname: 'Player59', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player60', enrollmentState: 'accepted' },
          { steamId: '76561199018949622', steamNickname: 'playerguest4', enrollmentState: 'accepted' }
        ]
      },
      points: 1227,
      victories: 7,
      defeats: 2,
      enrollmentState: 'accepted'
    },
    {
      rank: 2,
      team: {
        name: 'Team29',
        players: [
          { steamId: '', steamNickname: 'Player62', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player63', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player64', enrollmentState: 'accepted' }
        ]
      },
      points: 1092,
      victories: 6,
      defeats: 3,
      enrollmentState: 'accepted'
    },
    {
      rank: 3,
      team: {
        name: 'Team30',
        players: [
          { steamId: '', steamNickname: 'Player65', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player66', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player67', enrollmentState: 'accepted' }
        ]
      },
      points: 759,
      victories: 5,
      defeats: 4,
      enrollmentState: 'accepted'
    }
  ]
});
export const ranking6 = new Ranking({
  rankingID: 6,
  state: 'playing',
  startDate: start2020Q1,
  endDate: end2020Q1,
  year: 2020,
  quarter: 1,
  season: '2020-q1',
  competition: 'tournament-2vs2',
  numPlayersPerGame: 4,
  data: [
    {
      rank: 1,
      team: {
        name: 'Team23',
        players: [
          { steamId: '', steamNickname: 'Player49', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player50', enrollmentState: 'accepted' }
        ]
      },
      points: 1682,
      victories: 12,
      defeats: 2,
      enrollmentState: 'accepted'
    },
    {
      rank: 2,
      team: {
        name: 'Team24',
        players: [
          { steamId: '', steamNickname: 'Player51', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player52', enrollmentState: 'accepted' }
        ]
      },
      points: 1429,
      victories: 10,
      defeats: 4,
      enrollmentState: 'accepted'
    },
    {
      rank: 3,
      team: {
        name: 'Team25',
        players: [
          { steamId: '76561199018949622', steamNickname: 'playerguest4', enrollmentState: 'accepted' },
          { steamId: '76561199065302814', steamNickname: 'Néstor', enrollmentState: 'accepted' }
        ]
      },
      points: 1107,
      victories: 7,
      defeats: 4,
      enrollmentState: 'accepted'
    },
    {
      rank: 4,
      team: {
        name: 'Team26',
        players: [
          { steamId: '', steamNickname: 'Player55', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player56', enrollmentState: 'accepted' }
        ]
      },
      points: 742,
      victories: 5,
      defeats: 2,
      enrollmentState: 'accepted'
    },
    {
      rank: 5,
      team: {
        name: 'Team27',
        players: [
          { steamId: '', steamNickname: 'Player57', enrollmentState: 'accepted' },
          { steamId: '', steamNickname: 'Player58', enrollmentState: 'accepted' }
        ]
      },
      points: 492,
      victories: 2,
      defeats: 3,
      enrollmentState: 'accepted'
    }
  ]
});
export const ranking7 = new Ranking({
  rankingID: 7,
  state: 'inscription',
  startDate: start2020Q2,
  endDate: end2020Q2,
  year: 2020,
  quarter: 2,
  season: '2020-q2',
  competition: 'dueling-2vs2',
  numPlayersPerGame: 4,
  data: []
});
export const ranking8 = new Ranking({
  rankingID: 8,
  state: 'inscription',
  startDate: start2020Q2,
  endDate: end2020Q2,
  year: 2020,
  quarter: 2,
  season: '2020-q2',
  competition: 'scoring-xvsx',
  numPlayersPerGame: 0,
  data: []
});
export const ranking9 = new Ranking({
  rankingID: 9,
  state: 'inscription',
  startDate: start2020Q2,
  endDate: end2020Q2,
  year: 2020,
  quarter: 2,
  season: '2020-q2',
  competition: 'tournament-1vs1',
  numPlayersPerGame: 2,
  data: []
});
